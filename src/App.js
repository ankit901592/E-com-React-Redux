import "./styles.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { Contact } from "../src/pages/contactUs/Contact";
import Orders from "./pages/orders/orders";
import { NotFound } from "../src/pages/Notfound/NotFound";
import { useEffect, useState } from "react";
import Navbar2 from "./components/nav2";
import ItemCard from "./pages/products/product.card";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import CartModal from "./pages/Cart/cart";
import Login from "./pages/Auth/Login/login";
import Signup from "./pages/Auth/Signup/signup";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { authSelector } from "./redux/reducers/Auth.Reducers";
import { toast } from "react-toastify";
import ProductList from "./components/filterProducts/filterprouducts";

export default function App() {
  const [filtersActive, setFiltersActive] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState();
  const { LoggedIn } = useSelector(authSelector);

  useEffect(() => {
    setIsLoggedIn(LoggedIn);
    if (LoggedIn) {
      toast.success("Login succesfully");
    }
  }, [LoggedIn]);

  const handleFilters = (active) => {
    setFiltersActive(active);
  };

  // protected route below

  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) return <Navigate to="/login" replace={true} />;
    return children;
  };
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <NotFound />,
      element: <Navbar2 />,
      children: [
        {
          index: true,
          element: (
            <>
              <ProductList />
              {!filtersActive ? (
                <ItemCard loggedIn={isLoggedIn} setLoggedin={setIsLoggedIn} />
              ) : (
                <ProductList onFiltersChange={handleFilters} />
              )}
            </>
          ),
        },

        {
          path: "Cart",
          element: <ProtectedRoute>{<CartModal />}</ProtectedRoute>,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/Orders",
          element: <ProtectedRoute>{<Orders />}</ProtectedRoute>,
        },
        {
          path: "/login",
          element: LoggedIn ? <Navigate to="/" replace={true} /> : <Login />,
        },
        {
          path: "/Signup",
          element: <Signup />,
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <div className="App">
        <ToastContainer />
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}
