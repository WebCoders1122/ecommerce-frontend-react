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
            <CheckOutPage />
          </Protect>
        }
      />
    </Route>,
  ),
);
const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
