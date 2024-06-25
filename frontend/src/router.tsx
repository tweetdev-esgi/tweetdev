import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/index";
import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import CreateTweetDev from "./pages/CreateTweetDev";
import Feed from "./pages/Feed";
import Profile2 from "./pages/Profile2";
export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Feed />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/profile",
        element: <Profile2 />,
      },
      {
        path: "/feed",
        element: <Feed />,
      },
      {
        path: "/create-tweetdev",
        element: <CreateTweetDev />,
      },

      // {
      //   path: "/header",
      //   element: <Header />
      // }
    ],
  },
]);
