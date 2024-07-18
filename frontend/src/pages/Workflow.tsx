import React, { useRef, useCallback, useState, useEffect } from "react";
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
import { Play, Save, Trash2 } from "lucide-react";
import WorkflowSideBar from "../components/workflow/WorkflowSideBar";
import CodeNode from "../components/workflow/CodeNode";
import toast from "react-hot-toast";
import CustomButton from "../components/buttons/CustomButton";
import RunNode from "../components/workflow/RunNode";
import FinishNode from "../components/workflow/FinishNode";
import EditWorkflowButton from "../components/buttons/EditWorkflowButton";
import UploadNode from "../components/workflow/UploadNode";
import { getSession } from "../services/sessionService";
import { fetchWorkflows } from "../api/workflow";
const initialNodes = [
  {
    id: "1",
    type: "run-node",
    data: { label: "Run" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    type: "upload-node",
    data: { label: "Upload" },
    position: { x: 200, y: 0 },
  },
  {
    id: "3",
    type: "code-node",
    data: { label: "Code" },
    position: { x: 400, y: 0 },
  },
  {
    id: "4",
    type: "finish-node",
    data: { label: "Finish" },
    position: { x: 600, y: 0 },
  },
];

const nodeTypes = {
  "code-node": CodeNode,
  "run-node": RunNode,
  "finish-node": FinishNode,
  "upload-node": UploadNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const [selectedVersion, setSelectedVersion] = useState("");
  const [versions, setVersions] = useState([]);

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [rfInstance, setRfInstance] = useState<typeof ReactFlow | null>(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState<
    IWorkflow | undefined
  >();

  const [workflowName, setWorkflowName] = useState(
    (selectedWorkflow && selectedWorkflow.name) || "Untitled Workflow"
  );
  const [selectedKey, setSelectedKey] = useState(null);

  const [workflows, setWorkflows] = useState<any[]>([]);
  const handleChange = (e) => {
    setWorkflowName(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      toast.success(`${workflowName} saved`);
    }
  };

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
  const onConnect = useCallback(
    (params) => {
      const { source, target } = params;

      const targetHasInput = edges.some((edge) => edge.target === target);

      const sourceHasOutput = edges.some((edge) => edge.source === source);

      if (!targetHasInput && !sourceHasOutput) {
        setEdges((eds) => addEdge(params, eds));
      } else {
        toast.error("Nodes can only have one input and one output.");
      }
    },
    [edges, setEdges]
  );

  const onSave = () => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      console.log(flow);
      toast.success(`${workflowName} saved successfully`);
    }
  };
  const runWorkflow = () => {
    const startNode = nodes.find((node) => node.type === "run-node");
    const endNode = nodes.find((node) => node.type === "finish-node");

    if (!startNode || !endNode) {
      toast.error("Workflow must have a start and finish node.");
      return;
    }

    const nodeNames = [];
    let currentNode = startNode;

    while (currentNode) {
      nodeNames.push(currentNode.data.label);
      const nextEdge = edges.find((edge) => edge.source === currentNode.id);
      if (!nextEdge) break;
      currentNode = nodes.find((node) => node.id === nextEdge.target);
      if (currentNode && currentNode.type === "finish-node") {
        nodeNames.push(currentNode.data.label);
        break;
      }
    }

    if (currentNode && currentNode.type === "finish-node") {
      toast.success(`Workflow: ${nodeNames.join(" -> ")}`);
    } else {
      toast.error("Workflow does not end with a finish node.");
    }
  };
  const selectWorkflow = (e, workflow, key) => {
    setSelectedWorkflow(workflow);
    console.log(workflow);
    setSelectedKey(key);
    setWorkflowName(workflow.name);
    restoreFlow(workflow.versions[0].content);
    console.log(workflow.versions[0].name);
    setSelectedVersion(workflow.versions[0].name);
    setVersions(workflow.versions);
  };

  const selectVersion = (e, version) => {
    setSelectedVersion(version.name);
    console.log(version.content);
    restoreFlow(version.content);
  };

  const restoreFlow = async (flow: any) => {
    if (flow) {
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
    }
  };
  useEffect(() => {
    const fetchWorkflow = async () => {
      try {
        const sessionToken = getSession();

        if (sessionToken) {
          const programsData = await fetchWorkflows(sessionToken);
          setWorkflows(programsData);
        } else {
          console.error("Error fetching workflows");
        }
      } catch (error) {
        console.error("Error fetching workflows:", error);
      }
    };

    fetchWorkflow();
  }, []);
  return (
    <div className="mt-20 mx-4">
      <div className="flex mb-2 gap-2">
        <input
          className="font-medium rounded px-2 outline-none "
          type="text"
          value={workflowName}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <details className="dropdown ">
          <summary className="btn px-2 min-h-0 h-6 ">{selectedVersion}</summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            {versions.map((version) => (
              <li key={version.name}>
                <a onClick={(e) => selectVersion(e, version)}>{version.name}</a>
              </li>
            ))}
          </ul>
        </details>
      </div>
      <div className="flex gap-2">
        <WorkflowSideBar
          workflows={workflows}
          selectedKey={selectedKey}
          selectWorkflow={selectWorkflow}
        />
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
            <Panel className="flex gap-1" position="bottom-center">
              <div onClick={runWorkflow}>
                <CustomButton
                  color={"#355cc9"}
                  Icon={Play}
                  text={"Run Workflow"}
                />
              </div>
              <div onClick={onSave}>
                <CustomButton
                  color={"#22c55e "}
                  Icon={Save}
                  text={"Save"}
                ></CustomButton>
              </div>
              <div>
                <CustomButton
                  color={"#b91c1c"}
                  Icon={Trash2}
                  text={"Delete"}
                ></CustomButton>
              </div>
            </Panel>
            <Controls />
            <Background variant="dots" gap={16} size={1} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDFlow />
  </ReactFlowProvider>
);
