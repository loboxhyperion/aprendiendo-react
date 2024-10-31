import './App.css'
import { useState } from "react"
import confetti from "canvas-confetti"
import {Square} from "./components/Square.jsx"
import {TURNS} from "./constants.js"
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'

function App() {
  //estados
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  //null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null) 


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  
 
  // funcion que se ejecuta solo cuando se hace click y no la cuando se renderiza
  const updateBoard = (index) => {
    // no actualizamos esta posición si ya tiene algo
    if(board[index] || winner) return
    //los estados y los propos deben ser inmutables
    //aqui esto colocando todo lo de board en un nuevo array de manera superficial
    //spread y rest operator aprender
    //actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //cambiar el turno
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner); //es asincrono la actualizacion del estado
      // console.log(winner)//no lo actualiza inmediato debido a que el estado es asincrono
      // alert(`El ganador es ${newWinner}`) 
      // TODO: check if game is over
    } else if (checkEndGame(newBoard)){
      setWinner(false) // empate
    }
  }

  return(
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset el juego</button>
      <section className="game">
        {
          board.map((square, index) => {
            return(
              <Square
                 key={index}
                 index={index}
                 updateBoard={updateBoard}
                 >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )

}

export default App
