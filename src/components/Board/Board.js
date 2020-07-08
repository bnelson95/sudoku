import React from "react";
import Cell from "../Cell/Cell";
import "./Board.css";

const board = (props) => {
  return (
    <div>
      <table>
        <thead></thead>
        <tbody>
          {props.board.map((row, y) => {
            return (
              <tr key={String(y)}>
                {row.map((col, x) => {
                  return (
                    <td key={String(y) + String(x)}>
                      <Cell
                        value={col}
                        change={(e) => props.change({ x, y, value: e.target.value })}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
};

export default board;
