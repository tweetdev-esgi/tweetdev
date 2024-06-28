import React from "react";
import MDEditor from "@uiw/react-md-editor";
import Button from "../components/buttons/Button";
import { ThumbsUp } from "lucide-react";
import { createPost } from "../api/post";
import { getSession } from "../services/sessionService";

export default function CreateTweetDev() {
  const [value, setValue] = React.useState("**Hello world!!!**");

  const sessionToken = getSession();

  const object = {
    content: value,
  };
  const submitPost = () => {
    try {
      createPost(sessionToken, object);
      alert("ok");
    } catch (error) {
      alert("no ok");
    }
    setValue("**Hello world!!!**");
  };

  return (
    <div className="container pt-24 flex flex-col justify-center gap-7 px-12 w-screen max-w-none  ">
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
