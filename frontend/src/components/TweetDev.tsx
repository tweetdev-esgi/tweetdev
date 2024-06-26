import "../styles/TweetDev.css";
import React, { useEffect, useState } from "react";
import { Heart, ChatCircle, Plus } from "@phosphor-icons/react";
import "../styles/TweetDev.css";
import { fetchIsPostLiked, patchToggleLikePost } from "../api/post";
import { getSession } from "../services/sessionService";
import LikeButton from "./buttons/LikeButton";
function TweetDev({ postInfo }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const sessionToken = getSession();
  const authorUrl = `/profile?id=${postInfo.userId}`;

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInput(event.target.value);
  };

  return (
    <div className="bg-[#1c212e] border-2 border-componentBorder rounded-xl p-4 ">
      <div className="flex gap-3 mb-3 ">
        <div className="cursor-pointer bg-green-700 w-10 h-10 rounded-lg"></div>
        <div className="flex flex-col">
          <div className="text-sm font-normal leading-normal ">NFTs</div>
          <div className="inline mt-[-5px]">
            <span className=" text-[13px] font-normal leading-normal">
              Paschyz
            </span>
            <span className="text-[13px] font-normal text-gray-400"> 21m</span>
          </div>
        </div>
        <div className="cursor-pointer ml-auto relative group">
          <div className="absolute w-64 h-64 bg-white rounded-sm z-10 top-0 right-0 hidden group-hover:block">
            rfeqsd
          </div>
          <span>⋯</span>
        </div>
      </div>
      <p className="text-xs text-secondaryColor leading-relaxed mb-0">
        Over eighteen months, I played a pivotal role in redesigning and
        enhancing a social network's web application. As the company's first
        designer, I established a design-centric approach, collaborating closely
        with the founders and development team. This endeavor involved a
        ground-up redesign of the web application and a comprehensive revamp of
        the brand's visual identity. I introduced user-friendly features
        tailored for a non-tech-savvy audience in the web3 environment— the
        project culminated in developing a robust design system, solidifying the
        platform's visual consistency.
      </p>
      <div className="flex mt-2">
        <LikeButton
          sessionToken={sessionToken}
          postInfo={postInfo}
        ></LikeButton>
      </div>
    </div>
  );
}

export default TweetDev;
