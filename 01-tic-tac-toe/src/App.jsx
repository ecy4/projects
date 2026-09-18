import { useState, useEffect } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square"
import { TURNS } from "./constants"
import { checkWinnerFrom } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"
import { supabase } from "./supabase"

function App({ gameId, currentUser }) {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)
  const [gameData, setGameData] = useState(null)

  // Helper para convertir '' a null
  const normalizeBoard = (rawBoard) => {
    return rawBoard ? rawBoard.map(cell => (cell === '' ? null : cell)) : Array(9).fill(null)
  }

  // 1. Cargar datos y escuchar en tiempo real
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
          
          // Normalización obligatoria aquí también:
          setBoard(normalizeBoard(updatedGame.tablero))

          const nextTurn = updatedGame.turno === updatedGame.jugador_x ? TURNS.X : TURNS.O
          setTurn(nextTurn)

          if (updatedGame.ganador_id) {
            setWinner(updatedGame.ganador_id)
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

  // 2. Enviar movimiento a Supabase
  const updateboard = async (index) => {
    if (!gameData || !currentUser) return
    if (board[index] || winner) return

    // Validar si falta el rival
    if (!gameData.jugador_o) {
      alert("Esperando a que se una el segundo jugador...")
      return
    }

    // Validar turno
    const isPlayerX = currentUser.id === gameData.jugador_x
    const isPlayerO = currentUser.id === gameData.jugador_o

    if ((turn === TURNS.X && !isPlayerX) || (turn === TURNS.O && !isPlayerO)) {
      return // No es tu turno
    }

    const newBoard = [...board]
    newBoard[index] = turn

    const nextTurnUserId = turn === TURNS.X ? gameData.jugador_o : gameData.jugador_x
    const newWinner = checkWinnerFrom(newBoard)
    const isDraw = !newWinner && checkEndGame(newBoard)

    // Convertimos nulls a strings vacíos para guardar en Postgres
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

  // 3. Reiniciar la partida en la DB
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

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Resetear juego</button>
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
    </main>
  )
}

export default App