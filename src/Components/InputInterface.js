import { useState } from "react";
import Board from "./Board";

export default function InputInterface() {
  const [rows, setRows] = useState("");
  const [columns, setColumns] = useState("");
  const [winValue, setWinValue] = useState("");
  const [showBoard, setShowBoard] = useState(false);
  const checkCondition = () => {
    if (rows === "" || columns === "" || winValue === "") {
      alert("Yêu cầu nhập đầy đủ các trường!");
      setShowBoard(false);
      return;
    }
    if (winValue > rows && winValue > columns) {
      alert("Trường giá trị thắng không được phép hơn số hàng hoặc số cột!!");
      setShowBoard(false);
      return;
    }
    [...document.getElementsByClassName("field-ip")].forEach((item) =>
      item.setAttribute("disabled", true)
    );
    document.getElementById("start-game").style.display = "none";
  };
  return (
    <>
      <div className="init-game">
        <h1 className="title-game">TIK TAC TOE</h1>

        <div className="field">
          <label className="title-ip">Nhập số hàng:</label>
          <input
            value={rows}
            className="field-ip"
            type="number"
            onChange={(e) => setRows(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="title-ip">Nhập số cột:</label>
          <input
            value={columns}
            className="field-ip"
            type="number"
            onChange={(e) => setColumns(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="title-ip">Nhập giá trị thắng:</label>
          <input
            value={winValue}
            className="field-ip"
            type="number"
            onChange={(e) => setWinValue(e.target.value)}
          />
        </div>
        <div className="start-game">
          <button
            id="start-game"
            onClick={() => {
              setShowBoard(!showBoard);
              checkCondition();
            }}
          >
            Bắt đầu
          </button>
        </div>
      </div>
      {showBoard ? (
        <Board rows={rows} columns={columns} winValue={winValue} />
      ) : (
        <></>
      )}
    </>
  );
}
