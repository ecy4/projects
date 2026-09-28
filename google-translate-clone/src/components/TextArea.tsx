import { SectionTypes } from '../types.d'
import { type ChangeEvent, type FC } from 'react'

// Propiedades que recibe el componente TextArea
interface Props {
  type: SectionTypes
  loading?: boolean
  onChange: (value: string) => void
  value: string
}

// Genera el texto de ayuda segun la columna
const getPlaceholder = ({ type }: { type: SectionTypes }) => {
  if (type === SectionTypes.From) return 'Escribe algo...'
  return 'Traduccion'
}

// Componente para ingresar texto o mostrar el resultado traducido.
// Usa la clase CSS 'translator-textarea' para el estilo oscuro.
export const TextArea: FC<Props> = ({ type, loading, value, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  // Si esta cargando y es el textarea de destino, no mostramos nada
  // porque el componente padre se encarga de mostrar la animacion de carga
  if (type === SectionTypes.To && loading) {
    return null
  }

  return (
    <textarea
      autoFocus={type === SectionTypes.From}
      className='translator-textarea'
      disabled={type === SectionTypes.To}
      maxLength={type === SectionTypes.From ? 5000 : undefined}
      placeholder={getPlaceholder({ type })}
      value={value}
      onChange={handleChange}
    />
  )
}
