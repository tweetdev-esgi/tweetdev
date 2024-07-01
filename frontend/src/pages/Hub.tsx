import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Favorites from "../components/Favorites";
import { fetchHubByName } from "../api/hub";
import { getSession } from "../services/sessionService";
import { IHub } from "../interfaces/IHub";

function Hub(props) {
  let { name } = useParams();
  const sessionToken = getSession();
  const [hub, setHub] = useState<IHub >({
    _id: "",
    name: "r",
    posts: [],
    description: "",
    creationDate: Date.now(),
    profileImageUrl: "",
    coverImageUrl:"",
    users: []
  }); // Use Hub type
  useEffect( () => {
    const fetchData = async () => {
      try {
        const sessionToken = getSession();

        if (sessionToken && name) {
          const postsData = await fetchHubByName(sessionToken, name);
          setHub(postsData);
          console.log(postsData);
        } else {
          console.error("Error fetching posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    console.log(name);
   fetchData();
  },[]);
  return (
    <div className="hub-container mt-6 grid grid-cols-[1fr_3.5fr] p-12 gap-4 ">
      <div>
        <Favorites></Favorites>
      </div>
      <div className="bg-componentBg col-span-4 row-span-3">4 {hub.name}</div>
      <div className="col-span-3 col-start-2 row-start-4">5 {hub.description}</div>
      <div className="col-start-5 row-start-4">6 
      {!hub.users && (<div>Loading </div>)}
      {hub.users && (<div>{hub.users.length} </div>)}

      
      </div>
    </div>
  );
}

export default Hub;
