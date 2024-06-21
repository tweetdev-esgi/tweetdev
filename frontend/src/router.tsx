import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/index";
import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import CreateTweetDev from "./pages/CreateTweetDev";
import CodeEditorPage from "./pages/CodeEditorPage.tsx";
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
      ,
      {
        path:"/profile",
        element: <Profile />
      },
      {
        path:"/feed",
        element: <Feed />
      },
      {
        path:"/create-tweetdev",
        element: <CreateTweetDev />
      }
      ,
      {
        path:"/codeEditor",
        element: <CodeEditorPage />
      }
      // {
      //   path: "/header",
      //   element: <Header />
      // }
    ],
  },
]);
