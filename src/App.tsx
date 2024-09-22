import Home from "./pages/Home"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import LoginPage from "./pages/LoginPage"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<LoginPage />} />
    </Route>,
  ),
)
const App = () => {
  return <RouterProvider router={router} />
}
export default App
