import styles from "./ProductNode.module.css";

export default function ProductNode({ node, onDragStart }) {
    //Nodes For Product Listing......
  return (
    <div
      className={`d_flex ${styles.product_node_main_div}`}
      onDragStart={(event) => onDragStart(event, "customNode", node)}
      draggable
    >
      <p className={styles.product_title}>{node.title}</p>
      <p className={styles.product_price}>${node.price}</p>
    </div>
  );
}
