import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/index";
import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout";
export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        
      },
      {
        path:"/login",
        element: <Login />
      }
      ,
      {
        path:"/signup",
        element: <Signup />
      }
      ,
      {
        path:"/logout",
        element: <Logout />
      }
      
      // {
      //   path: "/header",
      //   element: <Header />
      // }
    ],
  },
]);
