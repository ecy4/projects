import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square"
import { TURNS} from "./constants"
import { checkWinnerFrom } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"
function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)
  // nll es que no hayno hay ganador
  // false es un  empate
  const [winner, setWinner] = useState(null)


 

    const resetGame = () => {
      setBoard(Array(9).fill(null))
      setTurn(TURNS.X)
      setWinner(null)

    }
  const checkEndGame = (newBoard) => {
    //revisamos si no hay mas espacios
    //  vacidos en el tablero
    return newBoard.every((square) => square != null)

  }
  const updateboard = (index) => {
    // no se actuliza esta posicion 
    // si ya tiene algo
    if (board[index]) return
    // actuliza el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambia el turno

    
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // Revisamos si hay un ganador
    const newWinwner = checkWinnerFrom(newBoard)
    if (newWinwner){
      confetti()
      setWinner(newWinwner)
    } else if (checkEndGame(newBoard)){
      setWinner(false)// Emapate

    }

  }

 return (
   <main className= 'board'>
    <h1>Tic tac toe</h1>
    <button onClick={resetGame}>Reset el juego</button>
    <section className="game">
      {
        board.map((_, index) => {
          return(
            <Square
            key={index}
            index={index}
            updateboard={updateboard}
            >

              {board[index]}
            </Square>


          )


        })
      } 
    </section>
    <section className="turn">
      <Square isSelected={turn === TURNS.X}>
        {TURNS.X}
      </Square>
      <Square isSelected={turn === TURNS.O}>
        {TURNS.O}
      </Square>
    </section>

    <WinnerModal resetGame={resetGame} winner={winner} />

  </main>
)  
}


export default App