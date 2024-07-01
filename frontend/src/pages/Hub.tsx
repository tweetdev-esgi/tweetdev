import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Favorites from "../components/Favorites";

function Hub(props) {
  let { name } = useParams();
  useEffect(() => {
    console.log(name);
  });
  return (
    <div className="hub-container mt-6 grid grid-cols-[1fr_3.5fr] p-12 gap-4 ">
      <div>
        <Favorites></Favorites>
      </div>
      <div className="bg-componentBg col-span-4 row-span-3">4</div>
      <div className="col-span-3 col-start-2 row-start-4">5</div>
      <div className="col-start-5 row-start-4">6</div>
    </div>
  );
}

export default Hub;
