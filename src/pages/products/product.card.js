import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectProducts,
  selectSearchProduct,
  selectfilterProduct,
} from "../../redux/reducers/productreducers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../products/product.module.css";
import { fetchProducts } from "../../redux/reducers/productreducers";
import { handleAdd } from "../../redux/reducers/ItemcartReducers";
import { authSelector } from "../../redux/reducers/Auth.Reducers";
import { useNavigate } from "react-router-dom";

function ItemCard() {
  const navigate = useNavigate();
  const { LoggedIn } = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const products = useSelector(selectProducts);
  const searchProduct = useSelector(selectSearchProduct);
  const filterData = useSelector(selectfilterProduct);

  const filteredItems =
    searchProduct.length > 0
      ? products.filter((item) =>
          item.title.toLowerCase().includes(searchProduct.toLowerCase())
        )
      : filterData.length > 0
      ? filterData
      : products;

  const callToast = () => {
    toast.success("Added to cart successfully");
  };

  const handleAddToCart = (item) => {
    if (LoggedIn) {
      dispatch(handleAdd(item));
      callToast();
    } else {
      navigate("/login");
    }
  };

  {
    return (
      <div className="list page">
        <div className="item-list">
          {filteredItems.map((i) => (
            <div className="item" key={i.id}>
              <h3>{i.title}</h3>
              <img src={i.image} alt={i.title} />
              <h2>${i.price}</h2>
              <button
                className={styles.itemButton}
                onClick={() => handleAddToCart(i)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ItemCard;
