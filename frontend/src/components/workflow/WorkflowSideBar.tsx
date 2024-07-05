import { Flag, Play } from "lucide-react";
import React from "react";

function WorkflowSideBar(props) {
  const programs: IProgram[] = [
    {
      id: "1",
      name: "first",
      creationDate: "2023-01-01",
      content: "First program content",
      authorName: "paschyz",
      inputFileType: "png",
      outputFileType: "png",
    },
    {
      id: "2",
      name: "second",
      creationDate: "2023-02-01",
      content: "Second program content",
      authorName: "johnDoe",
      inputFileType: "jpg",
      outputFileType: "jpg",
    },
    {
      id: "3",
      name: "third",
      creationDate: "2023-03-01",
      content: "Third program content",
      authorName: "janeSmith",
      inputFileType: "gif",
      outputFileType: "gif",
    },
    {
      id: "4",
      name: "fourth",
      creationDate: "2023-04-01",
      content: "Fourth program content",
      authorName: "aliceJones",
      inputFileType: "bmp",
      outputFileType: "bmp",
    },
    {
      id: "5",
      name: "fifth",
      creationDate: "2023-05-01",
      content: "Fifth program content",
      authorName: "bobBrown",
      inputFileType: "tiff",
      outputFileType: "tiff",
    },
  ];

  const onDragStart = (event, nodeName, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);

    event.dataTransfer.setData("application/reactflow/node/name", nodeName);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div
      style={{ width: "20vw" }}
      className="border-2 rounded-lg border-componentBorder bg-componentBg p-6 flex flex-col gap-4"
    >
      {programs.map((program, key) => {
        return (
          <div
            className="border-2 rounded-md border-componentBorder p-2 cursor-pointer hover:bg-componentBgHover select-none"
            onDragStart={(event) =>
              onDragStart(event, program.name, "custom-node")
            }
            draggable
          >
            <div className="text-lg font-semibold">{program.name}</div>
            <div className="text-sm">{program.inputFileType}</div>
            <div className="text-sm">{program.outputFileType}</div>
            <div className="text-sm">Created by {program.authorName}</div>
            <div className="text-sm text-secondaryColor">
              {program.creationDate}
            </div>
          </div>
        );
      })}
      <div
        className="border-2 rounded-md border-componentBorder p-2 cursor-pointer hover:bg-componentBgHover select-none flex items-center gap-2"
        onDragStart={(event) => onDragStart(event, "Run", "run-node")}
        draggable
      >
        <Play size={35} color="green"></Play>
        <p className="font-medium">Run Node</p>
      </div>
      <div
        className="border-2 rounded-md border-componentBorder p-2 cursor-pointer hover:bg-componentBgHover select-none flex items-center gap-2"
        onDragStart={(event) => onDragStart(event, "End", "finish-node")}
        draggable
      >
        <Flag size={35} color="#0062ff"></Flag>

        <p className="font-medium">Finish Node</p>
      </div>
    </div>
  );
}

export default WorkflowSideBar;