import React from "react";
import Portal from "../interfaces/Portal";
function FavoritesPortalItem({ portal }: { portal: Portal }) {
  return (
    <div className=" flex gap-2">
      <div
        className="cursor-pointer w-9 h-9 rounded-lg flex-shrink-0"
        style={{
          backgroundImage: `url(${portal.profileImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="cursor-pointer flex items-center">
        <p className="text-secondaryColor font-medium text-sm ">
          {portal.name}
        </p>
      </div>
      {/* <p className='text-[#C7C9CE] text-sm font-medium'>{portal.name}</p> */}
    </div>
  );
}

export default FavoritesPortalItem;
