import Home from "./pages/Home"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import Cart from "./features/cart/Cart"
import CheckOutPage from "./pages/CheckOutPage"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<CheckOutPage />} />
    </Route>,
  ),
)
const App = () => {
  return <RouterProvider router={router} />
}
export default App
