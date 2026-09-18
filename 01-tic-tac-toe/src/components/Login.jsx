import { useState } from 'react'

export function Login({ onLogin }) {
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return

    // Recuperar o generar un ID único para este usuario
    let userId = localStorage.getItem('ttt_user_id')
    if (!userId) {
      userId = crypto.randomUUID()
      localStorage.setItem('ttt_user_id', userId)
    }

    const user = { id: userId, name: trimmed }
    localStorage.setItem('ttt_user_name', trimmed)
    onLogin(user)
  }

  return (
    <main className="login-screen">
      <h1>Tic Tac Toe</h1>
      <h2>🎮 Multijugador</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="username">Tu nombre de jugador:</label>
        <input
          id="username"
          type="text"
          placeholder="Ej: María, Carlos..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={20}
          autoFocus
        />
        <button type="submit" disabled={!name.trim()}>
          Entrar al juego
        </button>
      </form>
    </main>
  )
}
