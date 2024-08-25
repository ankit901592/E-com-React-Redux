import React from "react";
import styles from "../components/nav.module.css";
import { NavLink, Outlet, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleSearch } from "../redux/reducers/productreducers";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/Auth.Reducers";
import { logout } from "../redux/reducers/Auth.Reducers";
import { toast } from "react-toastify";

const Navbar2 = () => {
  const dispatch = useDispatch();
  const { LoggedIn } = useSelector(authSelector);

  const handleLogin = () => {
    if (LoggedIn) {
      dispatch(logout());
      toast.success("Logout succesfully");
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <a href="/">
            <img
              className={styles.img}
              src="https://t3.ftcdn.net/jpg/02/47/48/00/360_F_247480017_ST4hotATsrcErAja0VzdUsrrVBMIcE4u.jpg"
              alt="Logo"
            />
          </a>
        </div>
        <ul className={styles.navLinks}>
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? { color: "black" } : {})}
          >
            <li>Products</li>
          </NavLink>
          <NavLink
            to="/Orders"
            style={({ isActive }) => (isActive ? { color: "black" } : {})}
          >
            <li>Orders</li>
          </NavLink>
          <NavLink
            to="/contact"
            style={({ isActive }) => (isActive ? { color: "black" } : {})}
          >
            <li>Contact Us</li>
          </NavLink>
          <li>
            <input
              className={styles.input}
              autoFocus
              type="text"
              onChange={(e) => dispatch(handleSearch(e.target.value))}
              placeholder="Search products"
            />
          </li>
          <Link to="/cart">
            <div className={styles.cart}>
              <Link to="/login">
                {" "}
                <button
                  className={styles.button}
                  onClick={() => {
                    handleLogin();
                  }}
                >
                  {LoggedIn ? "Logout" : "Login"}
                </button>{" "}
              </Link>
              <Link to="/Cart">
                {" "}
                <button className={styles.button}>Cart</button>{" "}
              </Link>
            </div>
          </Link>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar2;
