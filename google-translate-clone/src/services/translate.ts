import { GoogleGenerativeAI } from '@google/generative-ai'
import { type FromLanguage, type Language } from '../types.d'

// Inicializamos el cliente de Google Generative AI con la API key de las variables de entorno
const apiKey = import.meta.env.VITE_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

// Funcion principal encargada de traducir el texto
export async function translate ({
  fromLanguage,
  toLanguage,
  text
}: {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}) {
  // Si los idiomas son iguales o el texto esta vacio, evitamos llamar a la API
  if (fromLanguage === toLanguage || text.trim() === '') return text

  // Mapa de nombres en ingles para que la IA entienda con total precision el idioma de destino
  const languageNames: Record<string, string> = {
    en: 'English',
    es: 'Spanish',
    de: 'German',
    ru: 'Russian',
    ja: 'Japanese'
  }

  const fromCode = fromLanguage === 'auto' ? 'Auto-detect' : (languageNames[fromLanguage] || fromLanguage)
  const toCode = languageNames[toLanguage] || toLanguage
  const prompt = `Translate the following text from ${fromCode} to ${toCode}:\n\n${text}`

  // 1. Intento principal con el modelo de Gemini
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.5-flash-lite',
      systemInstruction:
        'You are a translation AI. Translate text accurately. Output ONLY the translated text without quotes or explanations.'
    })

    // Limitamos la espera a un maximo de 2.5 segundos para evitar demoras
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 2500)
    )

    const geminiRequest = model.generateContent(prompt).then((res) => {
      return res.response.text().trim()
    })

    // Competencia entre la respuesta de la IA y el temporizador
    const result = await Promise.race([geminiRequest, timeout])
    if (result) return result
  } catch {
    // Si Gemini tiene alta demanda o demora, pasamos al servicio alternativo
  }

  // 2. Servicio alternativo de traduccion rapida (fallback)
  try {
    const source = fromLanguage === 'auto' ? 'autodetect' : fromLanguage
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${toLanguage}`
    const response = await fetch(url)
    const data = await response.json()
    if (data.responseData?.translatedText) {
      return data.responseData.translatedText
    }
  } catch {
    // Error en el servicio alternativo
  }

  throw new Error('No se pudo traducir. Intentalo de nuevo.')
}
