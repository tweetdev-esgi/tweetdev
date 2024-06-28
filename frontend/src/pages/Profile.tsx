import React, { useEffect, useState } from "react";
import {
  fetchIsUserFollowed,
  fetchSelfInfo,
  fetchUserInfo,
  fetchUserInfoByUsername,
  followUser,
} from "../api/user";
import {
  getLocalStorageItemByName,
  getSession,
} from "../services/sessionService";
import { convertTimestampToMonthYear, defaultUser } from "../utils/utils";
import "../styles/Profile.css";
import { fetchProfilePosts } from "../api/post";
import { Post } from "../interfaces";
import { useLocation, useParams } from "react-router-dom";
import Favorites from "../components/Favorites";
import {
  Clock,
  PencilSimple,
  DotsThreeVertical,
  InstagramLogo,
  YoutubeLogo,
  XLogo,
  TwitterLogo,
  TwitchLogo,
  DiscordLogo,
  GithubLogo,
  PatreonLogo,
} from "@phosphor-icons/react";
import EditButton from "../components/buttons/EditButton";
import FollowButton from "../components/buttons/FollowButton";
import ModalFollowers from "../components/ModalFollowers";
import TweetDev from "../components/TweetDev";

function Profile() {
  const [userInfo, setUserInfo] = useState<UserResponse>(defaultUser);

  const [posts, setPosts] = useState<Post[]>([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const followerText = followersCount > 1 ? "Followers" : "Follower";
  const sessionToken = getSession();
  const [notFoundUser, setNotFoundUser] = useState("");
  let { username } = useParams();
  const [sessionUsername, setSessionUsername] = useState("");

  const id = userInfo._id;

  useEffect(() => {
    const getSessionUsername = getLocalStorageItemByName("username");
    setSessionUsername(getSessionUsername);
    const fetchData = async () => {
      try {
        if (sessionToken) {
          if (username == undefined) {
            const selfInfoData = await fetchSelfInfo(sessionToken);
            setUserInfo(selfInfoData);
            setFollowersCount(selfInfoData.followers.length);
            setFollowingCount(selfInfoData.following.length);
            const selfPostsData = await fetchProfilePosts(sessionToken);
            setPosts(selfPostsData);
          } else {
            try {
              const userInfoData = await fetchUserInfoByUsername(
                sessionToken,
                username
              );
              setUserInfo(userInfoData);
              setFollowersCount(userInfoData.followers.length);
              setFollowingCount(userInfoData.following.length);
              const selfPostsData = await fetchProfilePosts(
                sessionToken,
                userInfoData.username
              );
              setPosts(selfPostsData);
            } catch (error) {
              setNotFoundUser("This account doesn’t exist");
              console.error("Error fetching self info:", error);
            }
          }
        } else {
          console.error("Token de session null.");
        }
      } catch (error) {
        console.error("Error fetching self info:", error);
      }
    };
    fetchData();
  }, []);

  const incrementFollowers = () => {
    setFollowersCount((prevCounter) => prevCounter + 1);
  };

  const decrementFollowers = () => {
    setFollowersCount((prevCounter) => prevCounter - 1);
  };

  const renderButton = () => {
    if (username) {
      return username === sessionUsername ? (
        <EditButton selfInfo={userInfo} />
      ) : (
        <FollowButton
          increment={incrementFollowers}
          decrement={decrementFollowers}
          id={id}
        />
      );
    }
    return <EditButton selfInfo={userInfo} />;
  };

  return (
    <div className="profile-container grid grid-cols-[1fr_3.5fr] gap-4 p-12 mt-6 ">
      {!userInfo && <>Loading...</>}

      {userInfo && (
        <>
          <div className="hidden lg:block">
            <Favorites></Favorites>
          </div>
          <div className="profile-card border-2 border-componentBorder rounded-xl grid grid-rows-[60fr_25fr_15fr] h-[600px] mr-6 col-span-2 lg:col-span-1">
            <div
              className="border-b-2 border-componentBorder rounded-t-xl"
              style={{
                backgroundImage: `url(${userInfo.backgroundImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="border-b-2 border-componentBorder grid grid-cols-[15fr_67fr_18fr]">
              <div className="flex justify-center">
                <div
                  className="h-[180px] w-[180px] border-4 border-cyan-400 rounded-full mt-[-60px] ml-6 mr-2"
                  style={{
                    backgroundImage: `url(${userInfo.profileImageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>
              <div className="flex flex-col gap-3 p-4">
                <p className="text-xl font-semibold ">{userInfo.username}</p>
                <div className="flex flex-row gap-3">
                  <ModalFollowers
                    followersCount={followingCount}
                    followersText={"Following"}
                  ></ModalFollowers>
                  <ModalFollowers
                    followersCount={followersCount}
                    followersText={followerText}
                  ></ModalFollowers>
                </div>
                <p className="text-secondaryColor text-xs font-medium">
                  <Clock color="#C7C9CE" weight="bold" size={22}></Clock> Member
                  Since {convertTimestampToMonthYear(userInfo.joinDate)}
                </p>
              </div>
              <div className="grid grid-rows-[40fr_50fr]">
                <div className="flex gap-3 p-2">
                  {renderButton()}

                  <div className="flex items-center cursor-pointer">
                    <DotsThreeVertical
                      size={30}
                      weight="bold"
                    ></DotsThreeVertical>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 grid grid-cols-[68fr_32fr] gap-5">
              <div className=" text-secondaryColor text-sm font-medium">
                {userInfo.description}
                {notFoundUser}
              </div>
              <div className="flex justify-around items-center">
                <InstagramLogo size={24} weight="fill"></InstagramLogo>
                <YoutubeLogo size={24} weight="fill"></YoutubeLogo>
                <XLogo size={24} weight="fill"></XLogo>
                <TwitchLogo size={24} weight="fill"></TwitchLogo>
                <GithubLogo size={24} weight="fill"></GithubLogo>
              </div>
            </div>
          </div>
          <div className=" -mt-20 mr-6 flex flex-col gap-4  col-span-2 lg:col-start-2">
            {posts.reverse().map((post, index) => (
              <TweetDev postInfo={post} key={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
