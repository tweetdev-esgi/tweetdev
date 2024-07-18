import React, { useEffect, useState } from "react";
import { fetchWorkflows } from "../api/workflow";
import { getSession } from "../services/sessionService";
import { convertTimeToPostTime } from "../utils/utils";

function BrowseWorkflows(props) {
  const [workflows, setWorkflows] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);
  return (
    <div className="mt-24">
      {workflows.map((workflow, key) => (
        <div
          key={key}
          className="flex flex-col gap-4 col-span-2  sm:col-span-2  lg:col-span-1 "
        >
          <h1>{workflow.name}</h1>
          <h3>{workflow.username}</h3>
          <p>{convertTimeToPostTime(workflow.creationDate)}</p>
        </div>
      ))}
    </div>
  );
}

export default BrowseWorkflows;
