import { useState } from 'react'
import { type HistoryItem } from '../types.d'
import { SUPPORTED_LANGUAGE } from '../constans'
import { HistoryIcon, TrashIcon } from './Icons'

interface Props {
  items: HistoryItem[]
  onSelect: (item: HistoryItem) => void
  onClear: () => void
}

// Obtiene el nombre legible de un idioma a partir de su codigo
const getLanguageName = (code: string) => {
  if (code === 'auto') return 'Detectado'
  return SUPPORTED_LANGUAGE[code as keyof typeof SUPPORTED_LANGUAGE] || code
}

// Componente para visualizar el historial de traducciones recientes
export const History = ({ items, onSelect, onClear }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  if (items.length === 0) return null

  return (
    <div className='history-section'>
      <div className='history-header'>
        {/* Boton para desplegar o plegar el historial */}
        <button
          className='history-title'
          onClick={() => setIsOpen(!isOpen)}
          type='button'
        >
          <HistoryIcon />
          <span>Historial ({items.length})</span>
        </button>

        {/* Boton para vaciar el historial cuando esta abierto */}
        {isOpen && (
          <button
            className='history-clear-btn'
            onClick={onClear}
            title='Borrar todo el historial'
            type='button'
          >
            <TrashIcon />
            <span>Borrar historial</span>
          </button>
        )}
      </div>

      {/* Lista de elementos del historial */}
      {isOpen && (
        <div className='history-list'>
          {items.map(item => (
            <div
              className='history-item'
              key={item.id}
              onClick={() => onSelect(item)}
              title='Haz clic para restaurar esta traduccion'
            >
              <div className='history-item-content'>
                <span className='history-item-languages'>
                  {getLanguageName(item.fromLanguage)} &rarr; {getLanguageName(item.toLanguage)} &bull; {item.date}
                </span>
                <span className='history-item-source'>
                  {item.fromText}
                </span>
                <span className='history-item-result'>
                  {item.result}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
