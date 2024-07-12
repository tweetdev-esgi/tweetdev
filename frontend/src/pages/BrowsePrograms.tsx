import React, { useEffect, useState } from "react";
import Favorites from "../components/Favorites";
import { fetchHubs } from "../api/hub";
import { fetchPosts } from "../api/post";
import FeaturedHubItem from "../components/FeaturedHubItem";
import Post from "../components/Post";
import { IPost } from "../interfaces";
import { IHub } from "../interfaces/IHub";
import { getSession } from "../services/sessionService";
import { fetchPrograms } from "../api/programs";
import Program from "../components/Program";

export default function BrowsePrograms(props) {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [portals, setPortals] = useState<IHub[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionToken = getSession();

        if (sessionToken) {
          const programsData = await fetchPrograms(sessionToken);
          setPrograms(programsData);
        } else {
          console.error("Error fetching programs");
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
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
        {programs.map((program, index) => (
          <Program programInfo={program} key={index} />
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
