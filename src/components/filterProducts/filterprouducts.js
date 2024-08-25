import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProducts,
  updateFilteredProducts,
} from "../../redux/reducers/productreducers";
import styles from "../filterProducts/filter.module.css";

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [category, setCategory] = useState(""); // State for selected category
  const [priceRange, setPriceRange] = useState([0, 1000]); // State for selected price range

  useEffect(() => {
   

    const filtered = products.filter((product) => {
      const isCategoryMatch = category ? product.category === category : true;
      const isPriceMatch =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return isCategoryMatch && isPriceMatch;
    });

    dispatch(updateFilteredProducts(filtered)); // Update Redux state with filtered products
  }, [category, priceRange, products, dispatch]);

  return (
    <div className={styles.productList}>
      <h1> Filter Products</h1>
      <div className={styles.filters}>
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="men's clothing">men's clothing</option>
          <option value="jewelery">jewelery</option>
          <option value="women's clothing">women's clothing</option>
          
        </select>

        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
        />
        <span>Up to ${priceRange[1]}</span>
      </div>
    </div>
  );
}

export default ProductList;
