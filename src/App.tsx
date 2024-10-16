import Home from "./pages/Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Cart from "./features/cart/Cart";
import CheckOutPage from "./pages/CheckOutPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Protect from "./features/auth/Protect";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { AppDispatch } from "./app/store";
import { fetchCartProductsByUserIdAsync } from "./features/cart/cartSlice";
import NotFound404 from "./pages/NotFound404";
import { OrderSuccessPage } from "./pages/OrderSuccessPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={
          <Protect>
            <Home />
          </Protect>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/cart"
        element={
          <Protect>
            <Cart />
          </Protect>
        }
      />
      <Route
        path="/checkout"
        element={
          <Protect>
            <CheckOutPage />
          </Protect>
        }
      />
      <Route
        path="/product/:id"
        element={
          <Protect>
            <ProductDetailsPage />
          </Protect>
        }
      />
      <Route
        path="/order-success/:id"
        element={
          <Protect>
            <OrderSuccessPage />
          </Protect>
        }
      />
      <Route path="*" element={<NotFound404 />} />
    </Route>,
  ),
);
const App = () => {
  //fetching cart products as user logs in
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    //fetch cart products
    if (user) dispatch(fetchCartProductsByUserIdAsync(user?.id));
  }, [dispatch, user]);
  return <RouterProvider router={router} />;
};
export default App;
