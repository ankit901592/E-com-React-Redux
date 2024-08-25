import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../Cart/cart.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartSelector } from "../../redux/reducers/ItemcartReducers";
import { useDispatch } from "react-redux";
import { deleteItem } from "../../redux/reducers/ItemcartReducers";
import { calculateTotal } from "../../redux/reducers/ItemcartReducers";

function CartModal() {
  const dispatch = useDispatch();
  const { cart } = useSelector(cartSelector);
  const { total } = useSelector(cartSelector);
  dispatch(calculateTotal());

  const callToast = () => {
    window.confirm("Are you sure you want to Delete");
    toast.success("Item Deleted Succesfully");
  };

  const clearAllItem = () => {
    alert("Are you sure You want to Clear Cart");
    toast.success("Clear Cart Succesfully");
  };

  return (
    <div className={styles.cartModal}>
      <Link to="/">
        <div className={styles.closeButton}>Close</div>
      </Link>
      <div
        onClick={() => {
          clear();
          clearAllItem();
        }}
        className={styles.clearButton}
      >
        Clear
      </div>
      <div className={styles.itemContainer}>
        {cart.map((item, idx) => {
          return (
            <div className={styles.cartCard}>
              <h1>{item.title}</h1>
              <h1>{item.price}</h1>
              <h1>X{item.qty}</h1>
              <h1>X {item.qty * item.price}</h1>
              <button
                className={styles.button}
                onClick={() => {
                  dispatch(deleteItem(item.id));
                  dispatch(calculateTotal());
                  callToast();
                }}
              >
                Remove
              </button>
            </div>
          );
        })}
        ;
      </div>
      <div className={styles.total}>
        <div className={styles.totalText}>Total</div>
        <div className={styles.totalPrice}>
          &#x20B9;{parseInt(parseInt(total))}
        </div>
      </div>
      <Link to="/Orders">
        {" "}
        <button className={styles.button}>PLACE ORDER</button>{" "}
      </Link>
    </div>
  );
}

export default CartModal;
