// Servicio de texto a voz.
// Primero intenta usar la voz local del navegador (Web Speech API).
// Si el idioma no tiene voz instalada en el sistema,
// usa la API de SoundOfText que genera audio con la voz de Google.

const LANG_CODES: Record<string, string> = {
  en: 'en-US',
  es: 'es-ES',
  de: 'de-DE',
  ru: 'ru-RU',
  ja: 'ja-JP'
}

// Guardamos las voces del navegador para no tener que cargarlas cada vez
let cachedVoices: SpeechSynthesisVoice[] = []

const loadVoices = () => {
  cachedVoices = window.speechSynthesis.getVoices()
}

// Las voces se cargan de forma asincrona en algunos navegadores
loadVoices()
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = loadVoices
}

// Busca si hay una voz local instalada para el idioma indicado
function findLocalVoice (langCode: string): SpeechSynthesisVoice | undefined {
  const fullCode = LANG_CODES[langCode] || langCode
  return cachedVoices.find(v =>
    v.lang.toLowerCase() === fullCode.toLowerCase() ||
    v.lang.toLowerCase().startsWith(langCode.toLowerCase())
  )
}

// Reproduce usando la voz local del sistema operativo
function speakLocal (text: string, langCode: string, voice: SpeechSynthesisVoice) {
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = LANG_CODES[langCode] || langCode
  utterance.voice = voice
  utterance.rate = 0.9
  window.speechSynthesis.speak(utterance)
}

// Genera y reproduce audio usando la API de SoundOfText.
// Esta API crea un mp3 con la voz de Google y devuelve una URL para descargarlo.
async function speakWithSoundOfText (text: string, langCode: string): Promise<void> {
  const voiceCode = LANG_CODES[langCode] || langCode

  // Paso 1: pedimos que se genere el audio
  const createResponse = await fetch('https://api.soundoftext.com/sounds', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      engine: 'Google',
      data: {
        text: text.slice(0, 200),
        voice: voiceCode
      }
    })
  })

  if (!createResponse.ok) {
    throw new Error('No se pudo crear el audio')
  }

  const createData = await createResponse.json()
  const soundId = createData.id

  if (!soundId) {
    throw new Error('La API no devolvio un identificador de audio')
  }

  // Paso 2: esperamos a que el audio este listo y obtenemos la URL.
  // A veces tarda un momento en generarse, asi que reintentamos varias veces.
  let audioUrl = ''
  for (let i = 0; i < 10; i++) {
    const statusResponse = await fetch(`https://api.soundoftext.com/sounds/${soundId}`)
    const statusData = await statusResponse.json()

    if (statusData.status === 'Done' && statusData.location) {
      audioUrl = statusData.location
      break
    }

    // Esperamos medio segundo antes de reintentar
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  if (!audioUrl) {
    throw new Error('El audio no se genero a tiempo')
  }

  // Paso 3: reproducimos el audio
  const audio = new Audio(audioUrl)
  await audio.play()
}

// Funcion principal que intenta reproducir el texto con la mejor opcion disponible
export async function speak (text: string, langCode: string): Promise<void> {
  if (!text) return

  // Si hay una voz local instalada, la usamos directamente
  const localVoice = findLocalVoice(langCode)
  if (localVoice) {
    speakLocal(text, langCode, localVoice)
    return
  }

  // Si no hay voz local, usamos SoundOfText como alternativa
  try {
    await speakWithSoundOfText(text, langCode)
  } catch {
    // Si SoundOfText tambien falla, intentamos Web Speech API como ultimo recurso.
    // En algunos navegadores puede que funcione aunque no encontremos la voz explicitamente.
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = LANG_CODES[langCode] || langCode
    utterance.rate = 0.9
    window.speechSynthesis.speak(utterance)
  }
}
