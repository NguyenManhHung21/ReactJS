import Square from "./Square";
import "../Style/board.css";
import { useState, useEffect } from "react";
import LocationPick from "./LocationPick";
export default function Board({ rows, columns, winValue }) {
  const [board, setBoard] = useState([]);
  const [turn, setTurn] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [moves, setMoves] = useState([]);
  const [winningSquares, setWinningSquares] = useState([]);

  useEffect(() => {
    const newBoard = new Array(Number(rows))
      .fill()
      .map(() => new Array(Number(columns)).fill(null));
    setBoard(newBoard);
  }, [rows, columns]);
  const handleClick = (i, j) => {
    if (board[i][j] || gameOver) return;
    const newBoard = [...board];
    newBoard[i][j] = turn % 2 === 0 ? "X" : "O";
    setBoard(newBoard);

    const newMoves = { row: i, col: j };
    setMoves([...moves, newMoves]);

    // check Win
    if (calculateWiner(i, j)) {
      alert(`${newBoard[i][j]} đã chiến thắng`);
      setGameOver(!gameOver);
      return;
    }

    //Check Draw
    const isBoardFull = newBoard.every((row) => row.every((cell) => cell));
    if (isBoardFull) {
      alert(`Trò chơi kết thúc với kết quả hoà!!`);
      setGameOver(!gameOver);
      return;
    }
    setTurn(turn + 1);
  };
  const calculateWiner = (i, j) => {
    const rowQuantity = rows;
    const colQuantity = columns;
    const win = Number(winValue);
    // check row
    let rowScores = 1;
    let rowUp = j + 1;
    let arrWin = [[i, j]];
    while (rowUp < rowQuantity && board[i][j] === board[i][rowUp]) {
      rowScores++;
      arrWin.push([i, rowUp]);
      rowUp++;
    }
    let rowDown = j - 1;
    while (rowDown >= 0 && board[i][j] === board[i][rowDown]) {
      rowScores++;
      arrWin.push([i, rowDown]);
      rowDown--;
    }

    if (rowScores >= win) {
      setWinningSquares(arrWin);
      return true;
    }
    //check column
    let colScores = 1;
    let colUp = i + 1;
    while (colUp < colQuantity && board[colUp][j] === board[i][j]) {
      colScores++;
      arrWin.push([colUp, j]);
      colUp++;
    }
    let colDown = i - 1;
    while (colDown >= 0 && board[colDown][j] === board[i][j]) {
      colScores++;
      arrWin.push([colDown, j]);
      colDown--;
    }
    if (colScores >= win) {
      setWinningSquares(arrWin);
      return true;
    }

    //check diagonals
    arrWin = [[i, j]];
    let diagScores = 1;
    let diagUpRow = i + 1;
    let diagUpCol = j + 1;
    while (
      diagUpRow < colQuantity &&
      diagUpCol < rowQuantity &&
      board[i][j] === board[diagUpRow][diagUpCol]
    ) {
      diagScores++;
      arrWin.push([diagUpRow, diagUpCol]);
      diagUpRow++;
      diagUpCol++;
    }
    let diagDownRow = i - 1;
    let diagDownCol = j - 1;
    while (
      diagDownRow >= 0 &&
      diagDownCol >= 0 &&
      board[i][j] === board[diagDownRow][diagDownCol]
    ) {
      diagScores++;
      arrWin.push([diagDownRow, diagDownCol]);
      diagDownRow--;
      diagDownCol--;
    }
    if (diagScores >= win) {
      setWinningSquares(arrWin);
      return true;
    }
    //     /
    //   /
    // /
    let diagScores1 = 1;
    diagDownRow = i - 1;
    diagUpCol = j + 1;
    while (
      diagDownRow >= 0 &&
      diagUpCol < rowQuantity &&
      board[i][j] === board[diagDownRow][diagUpCol]
    ) {
      diagScores1++;
      arrWin.push([diagDownRow, diagUpCol]);
      diagDownRow--;
      diagUpCol++;
    }
    diagUpRow = i + 1;
    diagDownCol = j - 1;
    while (
      diagUpRow < rowQuantity &&
      diagDownCol >= 0 &&
      board[i][j] === board[diagUpRow][diagDownCol]
    ) {
      diagScores1++;
      arrWin.push([diagUpRow, diagDownCol]);
      diagUpRow++;
      diagDownCol--;
      console.log(diagScores1);
    }
    if (diagScores1 >= win) {
      setWinningSquares(arrWin);
      return true;
    }

    return false;
  };
  console.log(winningSquares);
  return (
    <div className="interface-board">
      <div className="board">
        {board.map((row, rowIndex) => (
          <div className="board-row" key={rowIndex}>
            {row.map((square, colIndex) => {
              const isWinner = winningSquares.some(
                (winningSquare) =>
                  winningSquare[0] === rowIndex && winningSquare[1] === colIndex
              );
              return (
                <Square
                  key={`${rowIndex}-${colIndex}`}
                  value={board[rowIndex][colIndex]}
                  isWinningSquares={isWinner}
                  onClick={() => handleClick(rowIndex, colIndex)}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="picked-location">
        <LocationPick moves={moves} />
      </div>
    </div>
  );
}
