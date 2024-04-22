import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "react-flow-renderer";

import Sidebar from "./Sidebar"; // Importing Sidebar component

import "./App.css";

// Initial nodes for the React Flow
const initialNodes = [
  {
    id: "1",
    type: "default",
    data: { label: "Initial" },
    position: { x: 250, y: 5 },
  },
];

// Function to generate unique IDs for nodes
let id = 0;
const getId = () => `dndnode_${id++}`;

const App = () => {
  // Ref for the React Flow wrapper
  const reactFlowWrapper = useRef(null);

  // State for managing nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // State for the React Flow instance
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Callback function for adding edges between nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // Callback function for handling drag over event
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Callback function for handling drop event
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className="w-screen h-screen dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          {/* React Flow component */}
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView // Automatically fit view
          >
            <Controls /> {/* Control buttons */}
          </ReactFlow>
        </div>
        <Sidebar /> {/* Sidebar component */}
      </ReactFlowProvider>
    </div>
  );
};

export default App;
