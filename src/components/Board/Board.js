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
                {row.map((cell, x) => {
                  return (
                    <td key={String(y) + String(x)}>
                      <Cell pos={{x, y}} data={cell} click={props.click} />
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
