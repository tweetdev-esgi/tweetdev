import React, { useEffect, useState } from "react";
import {
  fetchIsUserFollowed,
  fetchSelfInfo,
  fetchUserInfo,
  followUser,
} from "../api/user";
import { getSession } from "../services/sessionService";
import { convertTimestampToMonthYear, defaultUser } from "../utils/utils";
import "../styles/Profile.css";
import { fetchProfilePosts } from "../api/post";
import { Post } from "../interfaces";
import { useLocation } from "react-router-dom";
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
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Profile() {
  const query = useQuery();
  const [selfInfo, setSelfInfo] = useState<UserResponse>(defaultUser);

  const [selfPosts, setSelfPosts] = useState<Post[]>([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const [isFollowed, setIsFollowed] = useState(false);
  const id = query.get("id");
  const followerText = followersCount > 1 ? "Followers" : "Follower";
  const followingText = followingCount > 1 ? "Followers" : "Follower";
  const sessionToken = getSession();

  const isUserFollowed = async () => {
    if (sessionToken && id) {
      try {
        const response = await fetchIsUserFollowed(sessionToken, id);
        return response.isFollowed;
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
  };
  const showFollowersModal = () => {
    console.log("show followers modal");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFollowed(await isUserFollowed());
        if (sessionToken) {
          if (id == null) {
            const selfInfoData = await fetchSelfInfo(sessionToken);
            setSelfInfo(selfInfoData);
            setFollowersCount(selfInfoData.followers.length);
            setFollowingCount(selfInfoData.following.length);
            const selfPostsData = await fetchProfilePosts(sessionToken);
            setSelfPosts(selfPostsData);
          } else {
            console.log(id);
            const selfInfoData = await fetchUserInfo(sessionToken, id);
            setSelfInfo(selfInfoData);
            setFollowersCount(selfInfoData.followers.length);
            setFollowingCount(selfInfoData.following.length);
            const selfPostsData = await fetchProfilePosts(sessionToken, id);
            setSelfPosts(selfPostsData);
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

  const follow = async () => {
    if (isFollowed) {
      setFollowersCount(followersCount - 1);
    } else {
      setFollowersCount(followersCount + 1);
    }
    setIsFollowed(!isFollowed);
    if (sessionToken && id) {
      try {
        const response = await fetchIsUserFollowed(sessionToken, id);
        console.log(response);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
      console.log(fetchIsUserFollowed(sessionToken, id));
      followUser(sessionToken, id);
    }
  };

  const incrementFollowers = () => {
    setFollowersCount((prevCounter) => prevCounter + 1);
  };

  const decrementFollowers = () => {
    setFollowersCount((prevCounter) => prevCounter - 1);
  };

  return (
    <div className="profile-container grid grid-cols-[1fr_3.5fr] gap-4 p-12 mt-6 ">
      {!selfInfo && <>Loading...</>}

      {selfInfo && (
        <>
          <div className="hidden lg:block">
            <Favorites></Favorites>
          </div>
          <div className="profile-card border-2 border-componentBorder rounded-xl grid grid-rows-[60fr_25fr_15fr] h-[600px] mr-6 col-span-2 lg:col-span-1">
            <div
              className="border-b-2 border-componentBorder rounded-t-xl"
              style={{
                backgroundImage: `url(${selfInfo.backgroundImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="border-b-2 border-componentBorder grid grid-cols-[15fr_67fr_18fr]">
              <div className="flex justify-center">
                <div
                  className="h-[180px] w-[180px] border-4 border-cyan-400 rounded-full mt-[-60px] ml-6 mr-2"
                  style={{
                    backgroundImage: `url(${selfInfo.profileImageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>
              <div className="flex flex-col gap-3 p-4">
                <p className="text-xl font-semibold ">{selfInfo.username}</p>
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
                  Since {convertTimestampToMonthYear(selfInfo.joinDate)}
                </p>
              </div>
              <div className="grid grid-rows-[40fr_50fr]">
                <div className="flex gap-3 p-2">
                  {!id && <EditButton selfInfo={selfInfo}></EditButton>}

                  {id && (
                    <FollowButton
                      increment={incrementFollowers}
                      decrement={decrementFollowers}
                    ></FollowButton>
                  )}

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
                {selfInfo.aboutMe}Over eighteen months, I played a pivotal role
                ithe project culminated in developing a robust design system,
                solidifying the platform's visual consistency.
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
        </>
      )}
    </div>
  );
}

export default Profile;
