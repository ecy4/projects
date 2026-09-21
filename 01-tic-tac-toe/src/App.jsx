import { useState, useEffect } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square"
import { TURNS } from "./constants"
import { checkWinnerFrom } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"
import { Footer } from "./components/Footer"
import { supabase } from "./supabase"

function App({ gameId, currentUser, onLeaveGame }) {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)
  const [gameData, setGameData] = useState(null)
  const [copied, setCopied] = useState(false)

  
  const normalizeBoard = (rawBoard) => {
    return rawBoard ? rawBoard.map(cell => (cell === '' ? null : cell)) : Array(9).fill(null)
  }

  
  useEffect(() => {
    if (!gameId) return

    const fetchGame = async () => {
      const { data } = await supabase
        .from('partidas')
        .select('*')
        .eq('id', gameId)
        .single()

      if (data) {
        setGameData(data)
        setBoard(normalizeBoard(data.tablero))
        setTurn(data.turno === data.jugador_x ? TURNS.X : TURNS.O)

        if (data.ganador_id) {
          const winnerSymbol = data.ganador_id === data.jugador_x ? TURNS.X : TURNS.O
          setWinner(winnerSymbol)
          confetti()
        } else if (data.estado === 'empate') {
          setWinner(false)
        }
      }
    }

    fetchGame()

  const channel = supabase
  .channel(`game-${gameId}`)
  .on(
    'postgres_changes',
    { event: 'UPDATE', schema: 'public', table: 'partidas', filter: `id=eq.${gameId}` },
    (payload) => {
      const updatedGame = payload.new
      setGameData(updatedGame)
      setBoard(normalizeBoard(updatedGame.tablero))

      const nextTurn = updatedGame.turno === updatedGame.jugador_x ? TURNS.X : TURNS.O
      setTurn(nextTurn)

      if (updatedGame.ganador_id) {
        // ✅ CORRECCIÓN: Convertir el ID del ganador al símbolo correspondiente (X u O)
        const winnerSymbol = updatedGame.ganador_id === updatedGame.jugador_x ? TURNS.X : TURNS.O
        setWinner(winnerSymbol)
        confetti()
      } else if (updatedGame.estado === 'empate') {
        setWinner(false)
      } else {
        setWinner(null)
      }
    }
  )
  .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [gameId])

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }

  
  const copyGameCode = () => {
    navigator.clipboard.writeText(gameId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  
  const updateboard = async (index) => {
    if (!gameData || !currentUser) return
    if (board[index] || winner) return

    
    if (!gameData.jugador_o) {
      alert("Esperando a que se una el segundo jugador...")
      return
    }

    
    const isPlayerX = currentUser.id === gameData.jugador_x
    const isPlayerO = currentUser.id === gameData.jugador_o

    if ((turn === TURNS.X && !isPlayerX) || (turn === TURNS.O && !isPlayerO)) {
      return 
    }

    const newBoard = [...board]
    newBoard[index] = turn

    const nextTurnUserId = turn === TURNS.X ? gameData.jugador_o : gameData.jugador_x
    const newWinner = checkWinnerFrom(newBoard)
    const isDraw = !newWinner && checkEndGame(newBoard)

    const boardToSave = newBoard.map(cell => cell === null ? '' : cell)

    await supabase
      .from('partidas')
      .update({
        tablero: boardToSave,
        turno: nextTurnUserId,
        ganador_id: newWinner ? currentUser.id : null,
        estado: newWinner ? 'finalizado' : isDraw ? 'empate' : 'jugando'
      })
      .eq('id', gameId)
  }

  
  const resetGame = async () => {
    if (!gameData) return

    await supabase
      .from('partidas')
      .update({
        tablero: Array(9).fill(''),
        turno: gameData.jugador_x,
        ganador_id: null,
        estado: 'jugando'
      })
      .eq('id', gameId)

    setWinner(null)
  }

  const isWaiting = gameData && !gameData.jugador_o
  const isMyTurn = gameData && (
    (turn === TURNS.X && currentUser.id === gameData.jugador_x) ||
    (turn === TURNS.O && currentUser.id === gameData.jugador_o)
  )

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>

      
      <div className="game-code-box">
        <span>Código de sala:</span>
        <button className="code-copy-btn" onClick={copyGameCode}>
          {copied ? '✅ Copiado!' : '📋 Copiar código'}
        </button>
      </div>

      
      {isWaiting && (
        <p className="waiting-msg">⏳ Esperando al segundo jugador...</p>
      )}
      {!isWaiting && !winner && (
        <p className="turn-msg">
          {isMyTurn ? '🎯 Tu turno' : '⏳ Turno del rival'}
        </p>
      )}

      <button onClick={resetGame}>Resetear juego</button>
      <button className="leave-btn" onClick={onLeaveGame}>Salir al lobby</button>

      <section className="game">
        {board.map((_, index) => (
          <Square key={index} index={index} updateboard={updateboard}>
            {board[index]}
          </Square>
        ))}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
      <Footer />
    </main>
  )
}

export default App