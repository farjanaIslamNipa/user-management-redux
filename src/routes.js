import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: '/add-user',
    element: <AddUser />
  },
  {
    path: '/update-user/:id',
    element: <EditUser />
  }

]);

export default routes;
