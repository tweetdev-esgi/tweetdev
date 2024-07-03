import React from "react";

const HubSelect = ({ name, updateParentState }) => {
  const changeParentState = () => {
    updateParentState(name);
  };
  return (
    <div className="cursor-pointer" onClick={changeParentState}>
      <p>{name}</p>
    </div>
  );
};

export default HubSelect;
