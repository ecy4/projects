import type { AUTO_LANGUAGE, SUPPORTED_LANGUAGE } from './constans'

export type Language = keyof typeof SUPPORTED_LANGUAGE
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = Language | AutoLanguage

export interface State {
  fromLanguage: FromLanguage
  toLanguage: Language
  fromText: string
  result: string
  loading: boolean
}

export type Action =
  | { type: 'SET_FROM_LANGUAGE', payload: FromLanguage }
  | { type: 'INTERCHANGE_LANGUAGES' }
  | { type: 'SET_TO_LANGUAGE', payload: Language }
  | { type: 'SET_FROM_TEXT', payload: string }
  | { type: 'SET_RESULT', payload: string }

export enum SectionTypes {
  From = 'from',
  To = 'to'
}

// Representa una traduccion guardada en el historial
export interface HistoryItem {
  id: string
  fromLanguage: FromLanguage
  toLanguage: Language
  fromText: string
  result: string
  date: string
}
