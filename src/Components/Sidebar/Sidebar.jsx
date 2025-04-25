import React from "react";
import ProductNode from "../ProductNode/ProductNode";

export default function Sidebar({ productsData }) {
  //   const [_, setType] = useDnD();

  //   const onDragStart = (event, nodeType) => {
  //     setType(nodeType);
  //     event.dataTransfer.effectAllowed = 'move';
  //   };

  return (
    <>
      <div>
        <h1>Products</h1>
        <div className="description">
          You can drag these nodes to the pane on the right.
        </div>
      </div>
      <div style={{ overflowY: "scroll" }}>
        {productsData.map((item) => (
          <ProductNode node={item} key={item.id + item.title} />
        ))}
      </div>
    </>
  );
}
