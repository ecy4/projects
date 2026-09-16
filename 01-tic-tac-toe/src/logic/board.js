import { WINNER_COMBOS } from "../constants"
export const checkWinnerFrom = (boardToCheck) => {
    // Revisamos ganadoras x u x
    for ( const combo of WINNER_COMBOS){
    const [a, b , c] = combo
    if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
    ){
        return boardToCheck[a]
    }
    }
    // si no hay gandor
    return null
}