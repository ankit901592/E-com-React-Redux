import { cartSelector } from "../../redux/reducers/ItemcartReducers";
import styles from "../orders/orders.module.css";
import { useSelector } from "react-redux";

function Orders() {
  const { cart, total } = useSelector(cartSelector);

  return (
    <div className={styles.orderSummary}>
      <h1>Orders Summary</h1>
      <h1>{new Date().toLocaleString()}</h1>
      <ul className={styles.orderList}>
        {cart.map((item, index) => (
          <li key={index}>
            <p>{item.title}</p>
            <p>{item.price}</p>
            <p>{item.qty}</p>
          </li>
        ))}
      </ul>
      <p className={styles.total}>Total:&#x20B9; {parseInt(total)}</p>
    </div>
  );
}

export default Orders;
