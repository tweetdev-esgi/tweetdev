import React, { useEffect, useState } from "react";
import "../styles/Feed.css";
import { getSession } from "../services/sessionService";
import { fetchPosts } from "../api/post";
import { Post } from "../interfaces";
import TweetDev from "../components/TweetDev";
import Favorites from "../components/Favorites";
import Portal from "../interfaces/Portal";
import { Users } from "@phosphor-icons/react";
import { PortalSample } from "../interfaces/PortalSample";
import { fetchHubs } from "../api/hubs";

function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [portals, setPortals] = useState<Hub[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionToken = getSession();

        if (sessionToken) {
          const postsData = await fetchPosts(sessionToken, true);
          setPosts(postsData);
        } else {
          console.error("Error fetching posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    const fetchHubsData = async () => {
      try {
        const sessionToken = getSession();

        if (sessionToken) {
          const hubsData = await fetchHubs(sessionToken);
          setPortals(hubsData);
        } else {
          console.error("Error fetching posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
    fetchHubsData();
  }, []);

  function formatNumber(number: number) {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + "k";
    }
    return number;
  }
  return (
    <div className="feed-container grid grid-cols-[1fr_2.5fr_1.5fr] gap-4 p-12 mt-6">
      <div className="hidden sm:block">
        <Favorites></Favorites>
      </div>
      <div className="flex flex-col gap-3 shrink-0 col-span-3  sm:col-span-2  lg:col-span-1">
        {posts.map((post, index) => (
          // <TweetDev key={index} postInfo={post} />
          <TweetDev postInfo={post} key={index} />
        ))}
      </div>
      <div className="hidden lg:block">
        <div className="pt-4 px-6 text-lg font-medium flex flex-col gap-3">
          Featured Hubs
          {portals.map((portal, index) => (
            <div
              key={index}
              className="relative portal-element border-2 border-componentBorder rounded-xl p-5 h-40 overflow-hidden "
            >
              <div
                className="absolute inset-0 bg-cover bg-center filter brightness-50 hover:brightness-75 transition-all"
                style={{ backgroundImage: `url(${portal.coverImageUrl})` }}
              ></div>
              <div className="flex gap-3  items-center">
                <div
                  className="cursor-pointer w-12 h-12 rounded-lg z-10"
                  style={{
                    backgroundImage: `url(${portal.profileImageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="flex flex-col z-10">
                  <div className="cursor-pointer text-sm font-semibold leading-normal ">
                    {portal.name}
                  </div>
                  <div className="inline mt-[-5px]">
                    <span className="text-[12px] font-semibold leading-normal">
                      <Users size={18} weight="bold"></Users>{" "}
                      {formatNumber(portal.users.length)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;
