import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import { useDnD } from "./Context/DnDContext";
import {
  addEdge,
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import CustomNode from "./Components/CustomNode/CustomNode";
import "@xyflow/react/dist/style.css"; // Main Flow styles

const nodeTypes = {
  customNode: CustomNode,
};
function App() {
  const [productsData, setProductsData] = useState([]);
  const [filteredProductsData, setFilteredProductsData] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type, setType, currentNodeData, setCurrentNodeData] = useDnD();

  useEffect(() => {
    setIsLoading(true);
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProductsData(data.products);
        setFilteredProductsData(data.products);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Products Fetch Failed!!", err);
        setIsLoading(false);
      });
  }, []);

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

      // check if the dropped element is valid
      if (!type) {
        return;
      }
      setIsLoading(true);
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: `${currentNodeData.id}`,
        type,
        position,
        data: {
          title: currentNodeData.title,
          price: currentNodeData.price,
          onDelete: (id) => {
            setIsLoading(true);
            setNodes((nds) => nds.filter((node) => node.id !== id));
            setFilteredProductsData((prev) => {
              const arr = [...prev, productsData[id - 1]];
              arr.sort((a, b) => a.id - b.id);
              return arr;
            });
            setIsLoading(false);
          },
        },
      };

      setNodes((nds) => nds.concat(newNode));
      const tmp_data = [...filteredProductsData];
      const idx = tmp_data.findIndex((item) => currentNodeData.id === item.id);
      tmp_data.splice(idx, 1);
      setFilteredProductsData(tmp_data);
      setIsLoading(false);
    },
    [screenToFlowPosition, type, currentNodeData]
  );

  const onDragStart = (event, nodeType, product) => {
    setType(nodeType);
    setCurrentNodeData(product);
    event.dataTransfer.setData("text/plain", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className={`d_flex mainDiv`} style={{ height: "100vh" }}>
      {/* SideBar */}
      <div className={`d_flex sidebar_main_div`}>
        <Sidebar
          filteredProductsData={filteredProductsData}
          isloading={isloading}
        />
      </div>
      {/* FLow Editor */}
      <div className={`reactflow-div`}>
        {/* <div className="dndflow"> */}
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            // fitView
            style={{ backgroundColor: "#F7F9FB" }}
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default App;
