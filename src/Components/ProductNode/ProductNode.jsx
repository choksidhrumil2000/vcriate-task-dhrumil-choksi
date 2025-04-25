import styles from './ProductNode.module.css';

export default function ProductNode({node}){
    return(
        <div className={`d_flex ${styles.product_node_main_div}`}>
            <p className={styles.product_title}>{node.title}</p>
            <p className={styles.product_price}>${node.price}</p>
        </div>
    )
}