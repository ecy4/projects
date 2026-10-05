import { createContext, useState, useEffect } from 'react'
import { supabase, sanitizeInput } from '../services/supabase'

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(Boolean(supabase))

  useEffect(() => {
    if (!supabase) return

    let isMounted = true

    // Obtener la sesion activa actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return
      if (session?.user) {
        const email = session.user.email || ''
        const role = session.user.user_metadata?.role ||
          (email.toLowerCase().startsWith('admin') ? 'admin' : 'customer')

        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name || email.split('@')[0],
          role
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    }).catch(() => {
      if (isMounted) {
        setUser(null)
        setLoading(false)
      }
    })

    // Escuchar cambios de estado de autenticacion en tiempo real
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return
      if (session?.user) {
        const email = session.user.email || ''
        const role = session.user.user_metadata?.role ||
          (email.toLowerCase().startsWith('admin') ? 'admin' : 'customer')

        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name || email.split('@')[0],
          role
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => {
      isMounted = false
      subscription?.unsubscribe()
    }
  }, [])

  const login = async (rawEmail, rawPassword) => {
    const email = sanitizeInput(rawEmail).toLowerCase()
    const password = sanitizeInput(rawPassword)

    if (!email || !password) {
      throw new Error('Debes ingresar tu correo electrónico y tu contraseña')
    }

    if (!supabase) {
      throw new Error('Supabase no está configurado. Verifica las variables de entorno.')
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('Correo o contraseña incorrectos. Verifica tus credenciales.')
      }
      if (error.message.includes('Email not confirmed')) {
        throw new Error('El correo electrónico no ha sido confirmado aún.')
      }
      throw new Error(error.message)
    }

    if (data?.user) {
      const userEmail = data.user.email || ''
      const role = data.user.user_metadata?.role ||
        (userEmail.toLowerCase().startsWith('admin') ? 'admin' : 'customer')

      const userData = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || userEmail.split('@')[0],
        role
      }
      setUser(userData)
      return userData
    }

    throw new Error('No se pudo iniciar sesión. Inténtalo nuevamente.')
  }

  const signup = async (rawEmail, rawPassword, rawName) => {
    const email = sanitizeInput(rawEmail).toLowerCase()
    const password = sanitizeInput(rawPassword)
    const name = sanitizeInput(rawName)

    if (!email || !password || !name) {
      throw new Error('Todos los campos son obligatorios')
    }

    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres')
    }

    if (!supabase) {
      throw new Error('Supabase no está configurado. Verifica las variables de entorno.')
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: email.toLowerCase().startsWith('admin') ? 'admin' : 'customer'
        }
      }
    })

    if (error) {
      if (error.message.includes('User already registered')) {
        throw new Error('Ya existe una cuenta con este correo electrónico.')
      }
      throw new Error(error.message)
    }

    if (data?.user) {
      const role = email.toLowerCase().startsWith('admin') ? 'admin' : 'customer'
      const userData = {
        id: data.user.id,
        email: data.user.email,
        name,
        role
      }
      setUser(userData)
      return userData
    }

    throw new Error('No se pudo registrar la cuenta. Inténtalo de nuevo.')
  }

  const logout = async () => {
    if (supabase) {
      try {
        await supabase.auth.signOut()
      } catch (err) {
        console.error('Error cerrando sesión:', err)
      }
    }
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAdmin: user?.role === 'admin',
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}
