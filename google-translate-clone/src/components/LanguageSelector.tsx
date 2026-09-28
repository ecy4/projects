import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGE } from '../constans'
import { type Language, type FromLanguage, SectionTypes } from '../types.d'

// Definicion de tipos discriminados para el selector de origen y de destino
type Props =
  | { type: SectionTypes.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
  | { type: SectionTypes.To, value: Language, onChange: (language: Language) => void }

// Selector de idioma que muestra las opciones disponibles.
// Mantiene el Form.Select de Bootstrap pero el estilo oscuro
// se aplica desde las clases CSS del contenedor .language-bar
export const LanguageSelector = ({ onChange, type, value }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }

  return (
    <Form.Select aria-label='Selecciona el idioma' onChange={handleChange} value={value}>
      {/* Opcion de autodetectar disponible solo para el idioma de origen */}
      {type === SectionTypes.From && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}
      {/* Lista de idiomas soportados */}
      {Object.entries(SUPPORTED_LANGUAGE).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  )
}
