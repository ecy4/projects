import { useEffect, useState } from 'react'

// Hook para retrasar la actualizacion de un valor hasta que el usuario deje de escribir
export function useDebounce<T> (value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Iniciamos un temporizador que actualizara el valor tras el tiempo indicado
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Si el usuario vuelve a escribir antes de que pase el tiempo, cancelamos el temporizador anterior
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
