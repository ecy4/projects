import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || ''

// Cliente de Supabase configurado con variables de entorno
export const supabase = (supabaseUrl && supabaseKey)
  ? createClient(supabaseUrl, supabaseKey)
  : null

// Sanitizacion de texto para prevenir inyecciones y caracteres maliciosos
export const sanitizeInput = (text) => {
  if (typeof text !== 'string') return ''
  return text
    .replace(/[<>]/g, '')
    .trim()
}
