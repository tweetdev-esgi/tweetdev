import "../styles/TweetDev.css";
import React, { useEffect, useState } from "react";
import "../styles/TweetDev.css";
import { getSession } from "../services/sessionService";
import LikeButton from "./buttons/LikeButton";

import MDEditor from "@uiw/react-md-editor";

function TweetDev({ postInfo }) {
  const [value, setValue] = React.useState(`
  **Hello world!!!**
  <img src="https://em-content.zobj.net/source/microsoft-teams/363/waving-hand_1f44b.png" width="30" height="30">
  >Here's how we used MDEditor npm library to create this component !
  
  \`\`\`bash
  npm i @uiw/react-md-editor
  \`\`\`
  
  then paste this into your React component !
  
  \`\`\`js
  import React from "react";
  import MDEditor from "@uiw/react-md-editor";
  
  export default function App() {
    const [value, setValue] = React.useState("**Hello world!!!**");
    return (
      <div className="container mt-24 p-0 flex flex-col justify-center gap-7 px-5">
        <div>
          <h2 className="text-center text-xl font-bold">Create post</h2>
        </div>
        <div>
          <MDEditor value={value} onChange={setValue} />
          <MDEditor.Markdown source={value} />
        </div>
      </div>
    );
  }
  \`\`\`
  `);

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
    <div className="bg-[#1c212e] border-2 border-componentBorder rounded-xl p-6 ">
      <div className="flex gap-3 mb-3 ">
        <div className="cursor-pointer bg-green-700 w-10 h-10 rounded-lg"></div>
        <div className="flex flex-col">
          <div className="text-sm font-normal leading-normal ">NFTs</div>
          <div className="inline mt-[-5px]">
            <span className=" text-[13px] font-normal leading-normal">
              {postInfo.authorName}
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
      <p className="text-xs text-secondaryColor leading-relaxed mb-0 py-2">
        {/* <div data-color-mode="light">

      <MDEditor.Markdown source={value}  />
      </div> */}
        <MDEditor.Markdown
          source={value}
          className="p-4 bg-inherit rounded-lg"
        />
      </p>
      <div className="flex mt-2 ">
        <LikeButton
          sessionToken={sessionToken}
          postInfo={postInfo}
        ></LikeButton>
      </div>
    </div>
  );
}

export default TweetDev;
