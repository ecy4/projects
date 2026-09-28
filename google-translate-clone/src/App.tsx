import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { useActions } from './hooks/Actions'
import { AUTO_LANGUAGE } from './constans'
import { ArrowIcon, ClipboardIcon, SpeakerIcon, CloseIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionTypes, type HistoryItem } from './types.d'
import { TextArea } from './components/TextArea'
import { History } from './components/History'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'
import { speak } from './services/speak'

function App () {
  // Extraemos el estado y las funciones del hook personalizado
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  } = useActions()

  // Estado para mostrar retroalimentacion visual al copiar
  const [copied, setCopied] = useState(false)

  // Historial de traducciones almacenado en localStorage
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('translate_history')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Aplicamos un retraso de 500ms al texto escrito para evitar peticiones continuas
  const debouncedFromText = useDebounce(fromText, 500)

  // Efecto que dispara la traduccion cuando cambia el texto o los idiomas
  useEffect(() => {
    if (debouncedFromText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then(translated => {
        if (translated == null) return
        setResult(translated)

        // Guarda en el historial si la traduccion es valida
        if (translated !== 'Error') {
          const now = new Date()
          const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

          setHistory(prev => {
            if (prev.length > 0 && prev[0].fromText === debouncedFromText && prev[0].toLanguage === toLanguage) {
              return prev
            }

            const newItem: HistoryItem = {
              id: String(Date.now()),
              fromLanguage,
              toLanguage,
              fromText: debouncedFromText,
              result: translated,
              date: timeStr
            }

            const updated = [newItem, ...prev].slice(0, 10)
            try {
              localStorage.setItem('translate_history', JSON.stringify(updated))
            } catch {
              // Ignora errores si el almacenamiento local no esta disponible
            }
            return updated
          })
        }
      })
      .catch(() => { setResult('Error') })
  }, [debouncedFromText, fromLanguage, toLanguage, setResult])

  // Copia el texto traducido al portapapeles con confirmacion visual
  const handleClipboard = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {})
  }

  // Limpia el texto de entrada
  const handleClear = () => {
    setFromText('')
  }

  // Reproduce por voz el texto de origen si se conoce el idioma
  const handleSpeakFrom = () => {
    if (!fromText || fromLanguage === AUTO_LANGUAGE) return
    speak(fromText, fromLanguage)
  }

  // Reproduce por voz la traduccion en el idioma de destino
  const handleSpeakTo = () => {
    if (!result) return
    speak(result, toLanguage)
  }

  // Restaura una traduccion previa desde el historial
  const handleSelectHistory = (item: HistoryItem) => {
    setFromLanguage(item.fromLanguage)
    setToLanguage(item.toLanguage)
    setFromText(item.fromText)
    setResult(item.result)
  }

  // Vacia la lista del historial tanto en memoria como en localStorage
  const handleClearHistory = () => {
    setHistory([])
    try {
      localStorage.removeItem('translate_history')
    } catch {
      // Ignora errores de almacenamiento
    }
  }

  return (
    <div>
      <h1 className='app-title'>
        Eccy <span>Traductor</span>
      </h1>

      <div className='translator'>
        {/* Panel izquierdo: idioma y texto de origen */}
        <div className='translator-card from-card'>
          <div className='language-bar'>
            <LanguageSelector
              type={SectionTypes.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
          </div>

          <div className='textarea-section'>
            <TextArea
              type={SectionTypes.From}
              value={fromText}
              onChange={setFromText}
            />

            {/* Boton para limpiar texto cuando no esta vacio */}
            {fromText !== '' && (
              <button
                className='clear-btn'
                onClick={handleClear}
                title='Borrar texto'
                type='button'
              >
                <CloseIcon />
              </button>
            )}

            <div className='textarea-footer'>
              <div className='action-buttons'>
                {fromLanguage !== AUTO_LANGUAGE && (
                  <button
                    className='action-btn'
                    disabled={!fromText}
                    onClick={handleSpeakFrom}
                    title='Escuchar texto original'
                    type='button'
                  >
                    <SpeakerIcon />
                  </button>
                )}
              </div>

              {/* Contador de caracteres */}
              <span className='char-counter'>
                {fromText.length} / 5000
              </span>
            </div>
          </div>
        </div>

        {/* Boton central: intercambiar idiomas */}
        <div className='swap-container'>
          <button
            className='swap-btn'
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
            title='Intercambiar idiomas'
            type='button'
          >
            <ArrowIcon />
          </button>
        </div>

        {/* Panel derecho: idioma y resultado de la traduccion */}
        <div className='translator-card to-card'>
          <div className='language-bar'>
            <LanguageSelector
              type={SectionTypes.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
          </div>

          <div className='textarea-section'>
            {/* Animacion de carga con puntos rebotando */}
            {loading && (
              <div className='loading-dots'>
                <span />
                <span />
                <span />
              </div>
            )}

            <TextArea
              type={SectionTypes.To}
              loading={loading}
              value={result}
              onChange={setResult}
            />

            <div className='textarea-footer'>
              <div className='action-buttons'>
                <button
                  className='action-btn'
                  disabled={!result || loading}
                  onClick={handleClipboard}
                  title='Copiar al portapapeles'
                  type='button'
                >
                  <ClipboardIcon />
                </button>
                <button
                  className='action-btn'
                  disabled={!result || loading}
                  onClick={handleSpeakTo}
                  title='Escuchar traduccion'
                  type='button'
                >
                  <SpeakerIcon />
                </button>
              </div>

              {/* Indicador temporal al copiar texto */}
              {copied && (
                <span className='copied-badge'>Copiado</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Historial de traducciones guardadas */}
      <History
        items={history}
        onClear={handleClearHistory}
        onSelect={handleSelectHistory}
      />
    </div>
  )
}

export default App
