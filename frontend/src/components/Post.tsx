import "../styles/Post.css";
import React, { useEffect, useState } from "react";
import { getSession } from "../services/sessionService";
import LikeButton from "./buttons/LikeButton";
import { Dot } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { convertTimeToPostTime } from "../utils/utils";
import { fetchUserProfilePictureByUsername } from "../api/user";
import { fetchHubByName } from "../api/hub";

function Post({ postInfo }) {
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
  const [userProfileImageUrl, setUserProfileImageUrl] = useState(null);
  const [hubnameProfileImageUrl, setHubnameProfileImageUrl] = useState(null);
  const isPostedinHub = postInfo.hubname ? true : false;

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInput(event.target.value);
  };

  const navigateTo = (location: string) => {
    window.location.href = location;
  };

  const postedTimeIndicator = convertTimeToPostTime(postInfo.creationDate);

  useEffect(() => {
    const fetchHub = async () => {
      try {
        const cleanString = encodeURIComponent(postInfo.hubname);

        const response = await fetchHubByName(sessionToken, cleanString);
        console.log(response.profileImageUrl);
        setHubnameProfileImageUrl(response.profileImageUrl);
      } catch (error) {
        console.error("Failed to fetch user profile picture:", error);
      }
    };
    const fetchUserProfileImage = async () => {
      try {
        const url = await fetchUserProfilePictureByUsername(
          sessionToken,
          postInfo.username
        );
        setUserProfileImageUrl(url);
      } catch (error) {
        console.error("Failed to fetch user profile picture:", error);
      }
    };
    if (isPostedinHub) {
      fetchHub();
    }
    fetchUserProfileImage();
  }, [sessionToken, postInfo.username]);

  const renderPostingInfo = () => {
    if (isPostedinHub) {
      return (
        <div className="flex gap-3 mb-3 ">
          <div
            className="cursor-pointer bg-green-700 w-10 h-10 rounded-lg"
            onClick={() => navigateTo(`/hub/${postInfo.hubname}`)}
            style={{
              backgroundImage: `url(${hubnameProfileImageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="flex flex-col">
            <div
              className="text-sm font-semibold leading-normal cursor-pointer "
              onClick={() => navigateTo(`/profile/${postInfo.username}`)}
            >
              <p className="hover:text-secondaryColor transition-all">
                {postInfo.hubname}
              </p>
            </div>
            <div className="inline mt-[-5px]  ">
              <span
                className=" text-[14px] text-gray-400 hover:text-white transition-all font-medium leading-normal cursor-pointer"
                onClick={() => navigateTo(`/profile/${postInfo.username}`)}
              >
                {postInfo.username}
              </span>
              <Dot size={16} color="#9ca3af"></Dot>
              <span className="text-[13px] font-medium text-gray-400 ">
                {postedTimeIndicator}
              </span>
            </div>
          </div>
          <div className="cursor-pointer ml-auto relative group">
            <div className="absolute w-64 h-64 bg-white rounded-sm z-10 top-0 right-0 hidden group-hover:block">
              rfeqsd
            </div>
            <span>⋯</span>
          </div>
        </div>
      );
    }
    return (
      <div className="flex gap-3 mb-3 ">
        <div
          className="cursor-pointer bg-blue-700 w-10 h-10 rounded-full"
          onClick={() => navigateTo(`/profile/${postInfo.username}`)}
          style={{
            backgroundImage: `url(${userProfileImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="flex flex-col">
          <div
            className="text-sm font-semibold leading-normal cursor-pointer"
            onClick={() => navigateTo(`/profile/${postInfo.username}`)}
          >
            {postInfo.username}
          </div>
          <div className="inline mt-[-5px]">
            <span className="text-[13px] font-medium text-gray-400">
              {postedTimeIndicator}
            </span>
          </div>
        </div>
        <div className="cursor-pointer ml-auto relative group">
          <div className="absolute w-64 h-64 bg-white rounded-sm z-10 top-0 right-0 hidden group-hover:block">
            rfeqsd
          </div>
          <span>⋯</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-componentBg border-2 border-componentBorder rounded-xl p-6 hover:bg-componentBgHover cursor-pointer">
      {renderPostingInfo()}
      <p className="text-xs text-secondaryColor leading-relaxed mb-0 py-2">
        <MDEditor.Markdown
          source={postInfo.content}
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

export default Post;
{
  /* <div data-color-mode="light">

      <MDEditor.Markdown source={value}  />
      </div> */
}
