import { useReducer } from 'react'
import { type Action, type FromLanguage, type Language, type State } from '../types.d'
import { AUTO_LANGUAGE } from '../constans'

// Estado inicial del traductor
const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

// Reducer que centraliza todas las modificaciones de estado
function reducer (state: State, action: Action) {
  const { type } = action

  switch (type) {
    // Intercambia idioma de origen con destino y tambien mueve los textos.
    // Asi el texto traducido pasa a ser el nuevo texto de origen.
    case 'INTERCHANGE_LANGUAGES':
      // Si el idioma actual es 'auto', no se permite intercambiar
      // porque no se puede traducir hacia 'auto'
      if (state.fromLanguage === AUTO_LANGUAGE) return state
      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
        fromText: state.result,
        result: state.fromText,
        loading: false
      }

    // Actualiza el idioma de origen
    case 'SET_FROM_LANGUAGE':
      return {
        ...state,
        fromLanguage: action.payload
      }

    // Actualiza el idioma de destino
    case 'SET_TO_LANGUAGE':
      return {
        ...state,
        toLanguage: action.payload
      }

    // Actualiza el texto introducido por el usuario
    case 'SET_FROM_TEXT': {
      const loading = action.payload !== ''
      return {
        ...state,
        loading,
        fromText: action.payload,
        result: ''
      }
    }

    // Guarda el resultado final de la traduccion y apaga el estado de carga
    case 'SET_RESULT':
      return {
        ...state,
        loading: false,
        result: action.payload
      }

    default:
      return state
  }
}

// Custom hook para encapsular el estado y exponer funciones comodas a los componentes
export function useActions () {
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }

  const setToLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  }

  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }

  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload })
  }

  return {
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
  }
}
