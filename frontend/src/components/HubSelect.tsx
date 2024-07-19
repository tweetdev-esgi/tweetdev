import React from "react";

const HubSelect = ({ name, updateParentState }) => {
  const changeParentState = () => {
    updateParentState(name);
  };
  return (
    <li className="cursor-pointer" onClick={changeParentState}>
      <p>{name}</p>
    </li>
  );
};

export default HubSelect;
