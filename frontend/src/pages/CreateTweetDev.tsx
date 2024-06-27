import React from "react";
import MDEditor from "@uiw/react-md-editor";

export default function App() {
  const [value, setValue] = React.useState("**Hello world!!!**");
  return (
    <div className="container m-24">
      <MDEditor value={value} onChange={setValue} />
      <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />
    </div>
  );
}
