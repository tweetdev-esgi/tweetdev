import React, { useEffect, useState } from "react";
import "../styles/Feed.css";
import { getSession } from "../services/sessionService";
import { fetchPosts } from "../api/post";
import { IPost } from "../interfaces";
import Post from "../components/Post";
import Favorites from "../components/Favorites";
import Portal from "../interfaces/Portal";
import { Users } from "@phosphor-icons/react";
import { PortalSample } from "../interfaces/PortalSample";
import { fetchHubs } from "../api/hub";
import { IHub } from "../interfaces/IHub";
import { useNavigate } from "react-router-dom";
import FeaturedHubItem from "../components/FeaturedHubItem";

function Feed() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [portals, setPortals] = useState<IHub[]>([]);

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

  return (
    <div className="feed-container grid grid-cols-[1fr_2.5fr_1.5fr] gap-4 p-12 mt-6">
      <div className="hidden sm:block">
        <Favorites></Favorites>
      </div>
      <div className="flex flex-col gap-4 col-span-2  sm:col-span-2  lg:col-span-1 ">
        {posts.map((post, index) => (
          <Post postInfo={post} key={index} />
        ))}
      </div>
      <div className="hidden lg:block">
        <div className="pt-4 px-6 text-lg font-medium flex flex-col gap-3  shrink-0  ">
          Featured Hubs
          {portals.map((hub, index) => (
            <FeaturedHubItem hub={hub}></FeaturedHubItem>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;
