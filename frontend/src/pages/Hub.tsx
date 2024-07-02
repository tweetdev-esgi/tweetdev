import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Favorites from "../components/Favorites";
import { fetchHubByName, fetchHubPosts } from "../api/hub";
import { getSession } from "../services/sessionService";
import { IHub } from "../interfaces/IHub";
import { convertTimestampToMonthYear } from "../utils/utils";
import Post from "../components/Post";
import IPost from "../interfaces/IPost";
import { Clock, DotsThreeVertical } from "@phosphor-icons/react";
import ModalFollowers from "../components/ModalFollowers";

function Hub() {
  const [posts, setPosts] = useState<IPost[]>([]);

  let { name } = useParams();
  const [notFoundHub, setNotFoundHub] = useState("");

  const [followersCount, setFollowersCount] = useState(0);

  const followerText = followersCount > 1 ? "Followers" : "Follower";
  const sessionToken = getSession();
  const [hub, setHub] = useState<IHub>({
    _id: "",
    name: "r",
    posts: [],
    description: "",
    creationDate: "",
    profileImageUrl: "",
    coverImageUrl: "",
    users: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionToken = getSession();

        if (sessionToken && name) {
          const hubData = await fetchHubByName(sessionToken, name);
          setHub(hubData);
          const postsData = await fetchHubPosts(sessionToken, name);
          setPosts(postsData);
          console.log(postsData);
          setFollowersCount(hubData.users.length);
        }
      } catch (error) {
        setNotFoundHub("This hub doesn’t exist");
        console.error("Error fetching hub info:", error);
      }
    };
    console.log(name);
    fetchData();
  }, []);

  return (
    <div className="profile-container grid grid-cols-[1fr_3.5fr] gap-4 p-12 mt-6 ">
      {!hub && <>Loading...</>}

      {hub && (
        <>
          <div className="hidden lg:block">
            <Favorites></Favorites>
          </div>
          <div className="profile-card border-2 border-componentBorder rounded-xl grid grid-rows-[60fr_25fr_15fr] h-[600px] mr-6 col-span-2 lg:col-span-1">
            <div
              className="border-b-2 border-componentBorder rounded-t-xl"
              style={{
                backgroundImage: `url(${hub.coverImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="border-b-2 bg-componentBg border-componentBorder grid grid-cols-[15fr_67fr_18fr]">
              <div className="flex justify-center">
                <div
                  className="h-[180px] w-[180px] border-4 border-cyan-400 rounded-full mt-[-60px] ml-6 mr-2"
                  style={{
                    backgroundImage: `url(${hub.profileImageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>
              <div className="flex flex-col gap-3 p-4">
                <p className="text-xl font-semibold ">{hub.name}</p>
                <div className="flex flex-row gap-3">
                  <ModalFollowers
                    followersCount={followersCount}
                    followersText={followerText}
                  ></ModalFollowers>
                </div>
                <p className="text-secondaryColor text-xs font-medium">
                  <Clock color="#C7C9CE" weight="bold" size={22}></Clock> Hub
                  Since {convertTimestampToMonthYear(hub.creationDate)}
                </p>
              </div>
              <div className="grid grid-rows-[40fr_50fr]">
                <div className="flex gap-3 p-2">
                  <div className="flex items-center cursor-pointer">
                    <DotsThreeVertical
                      size={30}
                      weight="bold"
                    ></DotsThreeVertical>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-componentBg grid grid-cols-[68fr_32fr] gap-5">
              <div className=" text-secondaryColor text-sm font-medium">
                {hub.description}
                {notFoundHub}
              </div>
              {/* <div className="flex justify-around items-center">
                <InstagramLogo size={24} weight="fill"></InstagramLogo>
                <YoutubeLogo size={24} weight="fill"></YoutubeLogo>
                <XLogo size={24} weight="fill"></XLogo>
                <TwitchLogo size={24} weight="fill"></TwitchLogo>
                <GithubLogo size={24} weight="fill"></GithubLogo>
              </div> */}
            </div>
          </div>
          <div className=" -mt-20 mr-10 flex flex-col gap-4  col-span-2 lg:col-start-2">
            {posts.map((post, index) => (
              <Post postInfo={post} key={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
  // return (
  //   <div className="hub-container mt-6 grid grid-cols-[1fr_3.5fr] p-12 gap-4 ">
  //     <div>
  //       <Favorites></Favorites>
  //     </div>
  //     <div className="bg-componentBg col-span-4 row-span-3">4 {hub.name}</div>
  //     <div className="col-span-3 col-start-2 row-start-4">5 {hub.description}</div>
  //     <div className="col-start-5 row-start-4">6
  //     {!hub.users && (<div>Loading </div>)}
  //     {hub.users && (<div>{hub.users.length} </div>)}

  //     </div>
  //   </div>
  // );
}

export default Hub;
