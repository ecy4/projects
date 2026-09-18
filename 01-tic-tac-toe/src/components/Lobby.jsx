import { useState } from 'react'
import { supabase } from '../supabase'

export function Lobby({ currentUser, onGameStart }) {
  const [gameCode, setGameCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Crear una nueva partida (el usuario es jugador X)
  const createGame = async () => {
    setLoading(true)
    setError('')
    try {
      const { data, error: sbError } = await supabase
        .from('partidas')
        .insert({
          tablero: Array(9).fill(''),
          turno: currentUser.id,
          jugador_x: currentUser.id,
          jugador_o: null,
          ganador_id: null,
          estado: 'esperando'
        })
        .select()
        .single()

      if (sbError) throw sbError
      onGameStart(data.id)
    } catch (err) {
      console.error(err)
      setError('Error al crear la partida. Revisa tu conexión a Supabase.')
    } finally {
      setLoading(false)
    }
  }

  // Unirse a una partida existente (el usuario es jugador O)
  const joinGame = async (e) => {
    e.preventDefault()
    const code = gameCode.trim()
    if (!code) return
    setLoading(true)
    setError('')
    try {
      // Buscar la partida
      const { data: game, error: fetchError } = await supabase
        .from('partidas')
        .select('*')
        .eq('id', code)
        .single()

      if (fetchError || !game) {
        setError('No se encontró ninguna partida con ese código.')
        setLoading(false)
        return
      }
      if (game.jugador_o) {
        setError('Esta partida ya está completa.')
        setLoading(false)
        return
      }
      if (game.jugador_x === currentUser.id) {
        setError('No puedes unirte a tu propia partida.')
        setLoading(false)
        return
      }

      // Unirse como jugador O
      const { error: updateError } = await supabase
        .from('partidas')
        .update({ jugador_o: currentUser.id, estado: 'jugando' })
        .eq('id', code)

      if (updateError) throw updateError
      onGameStart(code)
    } catch (err) {
      console.error(err)
      setError('Error al unirse a la partida.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="lobby-screen">
      <h1>Tic Tac Toe 🎮</h1>
      <p className="welcome-msg">Hola, <strong>{currentUser.name}</strong>!</p>

      <div className="lobby-options">
        {/* Crear partida */}
        <div className="lobby-card">
          <h2>Crear partida</h2>
          <p>Crea una sala y comparte el código con tu rival.</p>
          <button onClick={createGame} disabled={loading}>
            {loading ? 'Creando...' : '+ Nueva partida'}
          </button>
        </div>

        <div className="lobby-divider">ó</div>

        {/* Unirse a partida */}
        <div className="lobby-card">
          <h2>Unirse a partida</h2>
          <p>Ingresa el código que te compartió tu rival.</p>
          <form onSubmit={joinGame} className="join-form">
            <input
              type="text"
              placeholder="Código de la sala"
              value={gameCode}
              onChange={(e) => setGameCode(e.target.value)}
            />
            <button type="submit" disabled={loading || !gameCode.trim()}>
              {loading ? 'Uniéndose...' : 'Unirse'}
            </button>
          </form>
        </div>
      </div>

      {error && <p className="lobby-error">⚠️ {error}</p>}
    </main>
  )
}
