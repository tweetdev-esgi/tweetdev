import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import Button from "../components/buttons/CustomButton";
import { ThumbsUp } from "lucide-react";
import { createPost } from "../api/post";
import { getSession } from "../services/sessionService";
import toast from "react-hot-toast";
import HubSelect from "../components/HubSelect";
import { fetchUserHubs } from "../api/user";
import { IHub } from "../interfaces/IHub";

export default function CreatePost() {
  const [value, setValue] = React.useState("**Hello world!!!**");
  const [userHubs, setUserHubs] = useState<IHub[]>([]);
  const sessionToken = getSession();
  const [selectedHubUsername, setSelectedHubUsername] = useState();
  const object = {
    content: value,
    hubname: selectedHubUsername,
  };
  const submitPost = () => {
    try {
      createPost(sessionToken, object);

      toast.success("Post created !", { duration: 1000 });
      window.location.href = "/";
    } catch (error) {
      toast.error("Error creation post !", { duration: 1000 });
    }
    setValue("**Hello world!!!**");
  };

  useEffect(() => {
    const fetchHubs = async () => {
      try {
        const sessionToken = getSession();
        const response = await fetchUserHubs(sessionToken);
        setUserHubs(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching hub info:", error);
      }
    };

    fetchHubs();
  }, []);

  const handleHubSelect = (username: string) => {
    setSelectedHubUsername(username);
  };
  return (
    <div className="container pt-24 flex flex-col justify-center gap-7 px-12 w-screen max-w-none  ">
      <div className="ml-auto relative group ">
        <div className="absolute w-64  bg-componentBg rounded-sm z-10 top-0 right-0 hidden group-hover:block mt-6  ">
          <div className="flex flex-col p-2 gap-2 ">
            {userHubs.length > 0 &&
              userHubs.map((hub, key) => {
                return (
                  <HubSelect
                    name={hub.name}
                    updateParentState={handleHubSelect}
                  />
                );
              })}
            {userHubs.length == 0 && <span>You are not subbed to any Hub</span>}
          </div>
        </div>
        <div className="flex flex-col">
          {selectedHubUsername && <span>{selectedHubUsername}</span>}
          {!selectedHubUsername && <span>No Hub Selected</span>}

          <span>Select Hub</span>
        </div>
      </div>
      <div>
        <h2 className="text-center text-xl font-bold">Create post</h2>
      </div>
      <div>
        <MDEditor value={value} onChange={setValue} />
      </div>
      <div className="bg-accentColor hover:bg-accentColorHover w-fit p-2 cursor-pointer rounded-lg ">
        <p className="text-sm font-semibold" onClick={() => submitPost()}>
          Submit
        </p>
      </div>
    </div>
  );
}
