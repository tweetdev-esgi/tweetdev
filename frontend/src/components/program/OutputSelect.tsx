import React from "react";

const OutputSelect = ({ name, updateParentState }) => {
  const changeParentState = () => {
    updateParentState(name);
  };
  return (
    <li className="cursor-pointer" onClick={changeParentState}>
      <p>{name}</p>
    </li>
  );
};

export default OutputSelect;
