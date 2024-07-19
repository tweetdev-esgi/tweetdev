import "../../styles/Post.css";
import React, { useEffect, useState } from "react";
import { getSession } from "../../services/sessionService";
import LikeButton from "../buttons/LikeButton";
import { Dot, Trash2 } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { convertTimeToPostTime } from "../../utils/utils";
import { fetchUserProfilePictureByUsername } from "../../api/user";
import { fetchHubByName } from "../../api/hub";
import { DotsThreeVertical } from "@phosphor-icons/react";
import {
  deletePostById,
  fetchIsPostDeletable,
  getIsPostDeletable,
} from "../../api/post";
import toast from "react-hot-toast";

export default function Program({ programInfo }) {
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
  const isPostedinHub = programInfo.hubname ? true : false;
  //   const [isDeletable, setIsDeletable] = useState(false);
  const handleChildClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    path: string
  ) => {
    event.stopPropagation();
    navigateTo(path);
  };

  const navigateTo = (location: string) => {
    window.location.href = location;
  };

  const postedTimeIndicator = convertTimeToPostTime(programInfo.creationDate);

  //   const deletePost = async (event) => {
  //     event.stopPropagation();
  //     try {
  //       const deletePostResponse = await deletePostById(
  //         sessionToken,
  //         programInfo._id
  //       );
  //       toast.success("Deleted post !");

  //       window.location.href = "/";
  //     } catch (error) {
  //       toast.error("Error deleting post ");
  //     }
  //   };

  useEffect(() => {
    const fetchHub = async () => {
      try {
        const cleanString = encodeURIComponent(programInfo.hubname);

        const response = await fetchHubByName(sessionToken, cleanString);
        console.log(response.profileImageUrl);
        setHubnameProfileImageUrl(response.profileImageUrl);
      } catch (error) {
        console.error("Failed to fetch user profile picture:", error);
      }
    };
    // const fetchIsDeletable = async () => {
    //   const isDeletableResponse = await getIsPostDeletable(
    //     sessionToken,
    //     programInfo._id
    //   );
    //   setIsDeletable(isDeletableResponse);
    // };
    const fetchUserProfileImage = async () => {
      try {
        const url = await fetchUserProfilePictureByUsername(
          sessionToken,
          programInfo.username
        );
        setUserProfileImageUrl(url);
      } catch (error) {
        console.error("Failed to fetch user profile picture:", error);
      }
    };
    // fetchIsDeletable();
    fetchHub();
    fetchUserProfileImage();
  }, [sessionToken, programInfo.username]);

  const renderPostingInfo = () => {
    if (isPostedinHub) {
      return (
        <div className="flex gap-3 mb-3 ">
          <div
            className="cursor-pointer bg-green-700 w-10 h-10 rounded-lg"
            onClick={(e) => handleChildClick(e, `/hub/${programInfo.hubname}`)}
            style={{
              backgroundImage: `url(${hubnameProfileImageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="flex flex-col">
            <div
              className="text-sm font-semibold leading-normal cursor-pointer "
              onClick={(e) =>
                handleChildClick(e, `/profile/${programInfo.username}`)
              }
            >
              <p className="hover:text-secondaryColor transition-all">
                {programInfo.hubname}
              </p>
            </div>
            <div className="inline mt-[-5px]  ">
              <span
                className=" text-[14px] text-gray-400 hover:text-white transition-all font-medium leading-normal cursor-pointer"
                onClick={(e) =>
                  handleChildClick(e, `/profile/${programInfo.username}`)
                }
              >
                {programInfo.username}
              </span>
              <Dot size={16} color="#9ca3af"></Dot>
              <span className="text-[13px] font-medium text-gray-400 ">
                {postedTimeIndicator}
              </span>
            </div>
          </div>
          {/* {isDeletable && (
            <>
              <div className="flex items-center cursor-pointer relative group ml-auto">
                <div className="absolute bg-whitez-10 top-10 right-0 hidden group-hover:block ">
                  <button
                    className="text-red-700 font-medium bg-red-100 text-nowrap rounded-lg  p-2 flex items-center gap-2 hover:bg-red-200 text-sm "
                    onClick={(e) => deletePost(e)}
                  >
                    <Trash2 size={20} weight="bold" color="#b91c1c"></Trash2>
                    Delete Post
                  </button>
                </div>
                <DotsThreeVertical size={30} weight="bold"></DotsThreeVertical>
              </div>
            </>
          )} */}
        </div>
      );
    }
    return (
      <div className="flex gap-3 mb-3 ">
        <div
          className="cursor-pointer bg-blue-700 w-10 h-10 rounded-full"
          onClick={(e) =>
            handleChildClick(e, `/profile/${programInfo.username}`)
          }
          style={{
            backgroundImage: `url(${userProfileImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="flex flex-col">
          <div
            className="text-sm font-semibold leading-normal cursor-pointer"
            onClick={(e) =>
              handleChildClick(e, `/profile/${programInfo.username}`)
            }
          >
            {programInfo.username}
          </div>
          <div className="inline mt-[-5px]">
            <span className="text-[13px] font-medium text-gray-400">
              {postedTimeIndicator}
            </span>
          </div>
        </div>
        {/* {isDeletable && (
          <>
            <div className="flex items-center cursor-pointer relative group ml-auto">
              <div className="absolute bg-whitez-10 top-10 right-0 hidden group-hover:block ">
                <button
                  className="text-red-700 font-medium bg-red-100 text-nowrap rounded-lg  p-2 flex items-center gap-2 hover:bg-red-200 text-sm "
                  onClick={(e) => deletePost(e)}
                >
                  <Trash2 size={20} weight="bold" color="#b91c1c"></Trash2>
                  Delete Post
                </button>
              </div>
              <DotsThreeVertical size={30} weight="bold"></DotsThreeVertical>
            </div>
          </>
        )} */}
      </div>
    );
  };

  return (
    <div
      className="bg-componentBg border-2 border-componentBorder rounded-xl p-6 hover:bg-componentBgHover cursor-pointer"
      onClick={() => navigateTo("/post/" + programInfo._id)}
    >
      {renderPostingInfo()}
      <h2>{programInfo.name}</h2>
      <p className="text-xs text-secondaryColor leading-relaxed mb-0 py-2">
        <MDEditor.Markdown
          source={programInfo.content}
          className="p-4 bg-inherit rounded-lg"
        />
      </p>
      <div className="flex mt-2 ">
        <LikeButton
          sessionToken={sessionToken}
          postInfo={programInfo}
        ></LikeButton>
      </div>
    </div>
  );
}
