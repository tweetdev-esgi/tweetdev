import React from "react";
import { Handle, NodeToolbar, Position, useReactFlow } from "reactflow";
import { Code } from "lucide-react";
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
        <button
          className="bg-white rounded text-red-600 font-semibold px-2"
          onClick={deleteNode}
        >
          Delete
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
        <div className="relative top-1">
          <p className="text-white text-[12px] text-center font-medium ">
            {data?.label}
          </p>
        </div>
      </div>
    </>
  );
}
