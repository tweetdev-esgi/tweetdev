import React, { useEffect, useState } from "react";
import { fetchWorkflows } from "../api/workflow";
import { getSession } from "../services/sessionService";
import { convertTimeToPostTime } from "../utils/utils";
import Favorites from "../components/Favorites";
import { fetchHubs } from "../api/hub";
import FeaturedHubItem from "../components/FeaturedHubItem";
import { IPost } from "../interfaces";
import { IHub } from "../interfaces/IHub";
import { fetchPrograms } from "../api/programs";
import Workflow from "../components/Workflow";
export default function BrowseWorkflows(props) {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [portals, setPortals] = useState<IHub[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [workflows, setWorkflows] = useState<any[]>([]);

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
    const fetchWorkflow = async () => {
      try {
        const sessionToken = getSession();

        if (sessionToken) {
          const programsData = await fetchWorkflows(sessionToken);
          setWorkflows(programsData);
        } else {
          console.error("Error fetching programs");
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };
    fetchWorkflow();
    fetchData();
    fetchHubsData();
  }, []);
  return (
    <div className="feed-container grid grid-cols-[1fr_2.5fr_1.5fr] gap-4 p-12 mt-6">
      <div className="hidden sm:block">
        <Favorites></Favorites>
      </div>
      <div className="flex flex-col gap-4 col-span-2  sm:col-span-2  lg:col-span-1 ">
        {workflows.map((workflow, key) => (
          <Workflow programInfo={workflow}></Workflow>
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
