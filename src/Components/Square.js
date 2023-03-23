import "../Style/board.css";
export default function Square({ value, isWinningSquares, onClick }) {
  return (
    <>
      <div
        className={`square ${isWinningSquares ? "winning-squares" : ""}`}
        onClick={onClick}
      >
        {value}
      </div>
    </>
  );
}
