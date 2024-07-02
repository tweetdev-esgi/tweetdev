import React from "react";

function HubSelect({ name }) {
  return (
    <div className=" cursor-pointer " onClick={console.log(name)}>
      <p className="">{name}</p>
    </div>
  );
}

export default HubSelect;
