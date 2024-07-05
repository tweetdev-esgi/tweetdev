import React from "react";
import { Handle, NodeToolbar, Position, useReactFlow } from "reactflow";
import { Code, Trash2 } from "lucide-react";
import CustomButton from "../buttons/CustomButton";
import { FilePy } from "@phosphor-icons/react";
export default function CustomNode({ id, data }) {
  const reactFlowInstance = useReactFlow();
  const deleteNode = () => {
    reactFlowInstance.setNodes((nds) => nds.filter((node) => node.id !== id));
  };
  return (
    <>
      <NodeToolbar
        isVisible={data.forceToolbarVisible || undefined}
        position={data.toolbarPosition}
      >
        <button className="" onClick={deleteNode}>
          <CustomButton
            text={"Delete"}
            color={"#dc2626"}
            Icon={Trash2}
          ></CustomButton>
        </button>
      </NodeToolbar>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <div className="w-20 h-20 bg-componentBg border-2 border-componentBorder rounded-sm  ">
        <div className="flex justify-center items-center h-full">
          <p className="text-sm">
            <Code size={35} color="orange"></Code>
          </p>
        </div>
        <div className="relative -top-[27px] right-[2px] text-right ">
          <FilePy size={16} weight="fill" />
        </div>
        <div className="relative -top-5">
          <p className="text-white text-[12px] text-center font-medium ">
            {data?.label}
          </p>
        </div>
      </div>
    </>
  );
}