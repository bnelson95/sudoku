import React from "react";
import "./Cell.css";

const cell = (props) => {
  let value = props.data.value;
  let notes = props.data.notes;

  let content;
  if (value === 0) {
    content = <span className='Notes'>{notes}</span>;
  } else {
    content = <span className='Value'>{value}</span>;
  }

  return (
    <div
      className={props.data.selected ? "Cell selected" : "Cell"}
      onClick={() => props.click({ x: props.pos.x, y: props.pos.y })}>
      {content}
    </div>
  );
};

export default cell;
