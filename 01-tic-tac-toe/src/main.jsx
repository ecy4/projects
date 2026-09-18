import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.jsx'
import { Login } from './components/Login.jsx'
import { Lobby } from './components/Lobby.jsx'

function Root() {
  const [currentUser, setCurrentUser] = useState(() => {
    // Restaurar sesión si ya había iniciado
    const id = localStorage.getItem('ttt_user_id')
    const name = localStorage.getItem('ttt_user_name')
    return id && name ? { id, name } : null
  })
  const [gameId, setGameId] = useState(null)

  const handleLogin = (user) => {
    setCurrentUser(user)
  }

  const handleGameStart = (id) => {
    setGameId(id)
  }

  const handleLeaveGame = () => {
    setGameId(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('ttt_user_id')
    localStorage.removeItem('ttt_user_name')
    setCurrentUser(null)
    setGameId(null)
  }

  if (!currentUser) {
    return <Login onLogin={handleLogin} />
  }

  if (!gameId) {
    return (
      <>
        <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
        <Lobby currentUser={currentUser} onGameStart={handleGameStart} />
      </>
    )
  }

  return (
    <App
      gameId={gameId}
      currentUser={currentUser}
      onLeaveGame={handleLeaveGame}
    />
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
    <Analytics />
  </StrictMode>,
)
