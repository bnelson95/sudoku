import React from "react";
import "./Cell.css";

const cell = (props) => {
  let value = props.value;
  if (value === 0) {
    value = "";
  }
  return (
    <div className='Cell'>
      <input
        type='number'
        min='0'
        max='9'
        onChange={props.change}
        value={value}
      />
    </div>
  );
};

export default cell;
