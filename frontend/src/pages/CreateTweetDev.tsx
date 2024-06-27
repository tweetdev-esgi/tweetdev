import React from "react";
import MDEditor from "@uiw/react-md-editor";
import Button from "../components/buttons/Button";

export default function CreateTweetDev() {
  const [value, setValue] = React.useState("**Hello world!!!**");
  return (
    <div className="container pt-24 flex flex-col justify-center gap-7 px-12 w-screen max-w-none  ">
      <div >
        <h2 className="text-center text-xl font-bold">Create post</h2>
      </div>
      <div>
      <MDEditor value={value} onChange={setValue} />
      </div>
      <Button></Button>
    </div>
  );
}
