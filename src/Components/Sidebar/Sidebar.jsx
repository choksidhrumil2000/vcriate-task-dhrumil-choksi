import React from "react";
import ProductNode from "../ProductNode/ProductNode";
import { useDnD } from "../../Context/DnDContext";
import styles from "./Sidebar.module.css";

export default function Sidebar({ filteredProductsData, isloading }) {
  const [type, setType, currentNodeData, setCurrentNodeData] = useDnD();

  const onDragStart = (event, nodeType, item) => {
    setType(nodeType);
    setCurrentNodeData(item);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <h1>Products</h1>
        <div className="description">You can drag these nodes to the pane.</div>
      </div>
      {isloading && (
        <div className={`d_flex ${styles.info_text}`}>
          <p>Loading....</p>
        </div>
      )}
      {!isloading && filteredProductsData.length === 0 && (
        <div className={` d_flex ${styles.info_text}`}>
          <p>No Products Found!!!</p>
        </div>
      )}
      <div style={{ overflowY: "scroll", width: "100%" }}>
        {!isloading &&
          filteredProductsData.length !== 0 &&
          filteredProductsData.map((item) => (
            <ProductNode
              node={item}
              key={item.id + item.title}
              onDragStart={onDragStart}
            />
          ))}
      </div>
    </>
  );
}
