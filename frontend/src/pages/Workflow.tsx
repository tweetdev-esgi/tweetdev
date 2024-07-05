import React, { useRef, useCallback, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  MiniMap,
  Background,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import { Save } from "lucide-react";
import WorkflowSideBar from "../components/workflow/WorkflowSideBar";
import CustomNode from "../components/workflow/CustomNode";
import toast from "react-hot-toast";
import Button from "../components/buttons/Button";

const initialNodes = [
  {
    id: "1",
    type: "custom-node",
    data: { label: "input node" },
    position: { x: 250, y: 5 },
  },
];

const nodeTypes = {
  "custom-node": CustomNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [rfInstance, setRfInstance] = useState<ReactFlow | null>(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      const nodeName = event.dataTransfer.getData(
        "application/reactflow/node/name"
      );

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${nodeName}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition]
  );

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      console.log(flow);
    }
  }, [rfInstance]);

  return (
    <div className="flex mt-20 gap-2 mx-4">
      <WorkflowSideBar />
      <div
        className="border-2 rounded-lg border-componentBorder bg-componentBg"
        style={{ width: "80vw", height: "89vh" }}
        ref={reactFlowWrapper}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onInit={setRfInstance}
          onDragOver={onDragOver}
          fitView
        >
          <MiniMap />
          <Panel className="" position="bottom-center" onClick={onSave}>
            <Button color={"#22c55e "} Icon={Save} text={"Save"}></Button>
          </Panel>
          <Controls />
          <Background variant="dots" gap={16} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDFlow />
  </ReactFlowProvider>
);

// import React, { useCallback } from "react";
// import ReactFlow, {
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   Panel,
// } from "reactflow";
// import WorkflowSideBar from "../components/WorkflowSideBar";
// import "reactflow/dist/style.css";

// const initialNodes = [
//   { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
//   { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
// ];
// const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

// export default function Workflow() {
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

//   const onConnect = useCallback(
//     (params) => setEdges((eds) => addEdge(params, eds)),
//     [setEdges]
//   );

//   const addNode = () => {
//     console.log("add node");
//   };

//   return (
//     <div className="flex mt-20 gap-2 mx-4">
//       <WorkflowSideBar></WorkflowSideBar>
//       <div
//         className="border-2 rounded-lg border-componentBorder bg-componentBg"
//         style={{ width: "80vw", height: "89vh" }}
//       >
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//         >
//           <Controls />
//           <MiniMap />
//           <Panel
//             className="bg-white rounded-lg p-2 text-black font-semibold text-sm cursor-pointer select-none hover:bg-slate-200"
//             position="bottom-center"
//             onClick={addNode}
//           >
//             Add node
//           </Panel>
//           <Background variant="dots" gap={12} size={1} />
//         </ReactFlow>
//       </div>
//     </div>
//   );
// }
