import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { X, Lock, Mail, User as UserIcon } from 'lucide-react'

export function LoginModal ({ isOpen, onClose }) {
  const { login, signup } = useAuth()
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isRegister) {
        await signup(email, password, name)
      } else {
        await login(email, password)
      }
      onClose()
      setEmail('')
      setPassword('')
      setName('')
    } catch (err) {
      setError(err.message || 'Error en la autenticación')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='modal-backdrop' onClick={onClose}>
      <div className='modal-container' onClick={e => e.stopPropagation()}>
        <div className='modal-header'>
          <div className='modal-title-group'>
            <div className='modal-icon-badge'>
              <Lock size={20} />
            </div>
            <div>
              <h3>{isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}</h3>
              <p className='modal-subtitle'>
                {isRegister
                  ? 'Ingresa tus datos para registrarte en la plataforma'
                  : 'Ingresa tus credenciales para acceder a tu cuenta'}
              </p>
            </div>
          </div>
          <button className='modal-close-btn' onClick={onClose} aria-label='Cerrar modal'>
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className='auth-error-badge'>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className='auth-form'>
          {isRegister && (
            <div className='form-group'>
              <label htmlFor='auth-name'>Nombre completo</label>
              <div className='input-with-icon'>
                <UserIcon size={18} className='input-icon' />
                <input
                  id='auth-name'
                  type='text'
                  required
                  placeholder='Tu nombre completo'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  maxLength={50}
                />
              </div>
            </div>
          )}

          <div className='form-group'>
            <label htmlFor='auth-email'>Correo electrónico</label>
            <div className='input-with-icon'>
              <Mail size={18} className='input-icon' />
              <input
                id='auth-email'
                type='email'
                required
                placeholder='tu@correo.com'
                value={email}
                onChange={e => setEmail(e.target.value)}
                maxLength={80}
              />
            </div>
          </div>

          <div className='form-group'>
            <label htmlFor='auth-password'>Contraseña</label>
            <div className='input-with-icon'>
              <Lock size={18} className='input-icon' />
              <input
                id='auth-password'
                type='password'
                required
                placeholder='••••••••'
                value={password}
                onChange={e => setPassword(e.target.value)}
                maxLength={40}
              />
            </div>
          </div>

          <button type='submit' className='btn-primary-action' disabled={loading}>
            {loading ? 'Validando...' : (isRegister ? 'Registrarse' : 'Iniciar Sesión')}
          </button>
        </form>

        <div className='modal-footer-toggle'>
          <button
            type='button'
            className='btn-link-toggle'
            onClick={() => {
              setIsRegister(!isRegister)
              setError('')
            }}
          >
            {isRegister
              ? '¿Ya tienes una cuenta? Inicia sesión aquí'
              : '¿No tienes cuenta todavía? Regístrate aquí'}
          </button>
        </div>
      </div>
    </div>
  )
}
