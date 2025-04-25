import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Trash2 } from "lucide-react"; // optional: use any icon library

const CustomNode = ({ id, data }) => {
    //Nodes For Chart ...................
  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#fff",
        maxWidth: "250px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        position: "relative",
        pointerEvents: "all",
      }}
    >
      {/* Handles */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />

      {/* Node Content */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pointerEvents: "all",
        }}
      >
        <div>
          <strong>{data.title}</strong>
          <div style={{ color: "#555", marginTop: "8px" }}>${data.price}</div>
        </div>
        <button
          style={{
            background: "transparent",
            border: "none",
            color: "red",
            cursor: "pointer",
            pointerEvents: "all",
          }}
          //   className={`nodrag`}
          onClick={(e) => {
            data.onDelete(id);
          }}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default CustomNode;
