import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Followers from "./components/Followers";
import Following from "./components/Following";
import FileForm from "./components/Form/FileForm";
import NewPost from "./components/Post/NewPost";
import ErrorPage from "./scenes/ErrorPage";
import HomePage from "./scenes/HomePage";
import MyProfile from "./scenes/MyProfile";
import RegisterPage from "./scenes/RegisterPage";
import UserProfile from "./scenes/UserProfile";



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,

  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,

  },
  {
    path: "/my-profile",
    element: <MyProfile />,
    errorElement: <ErrorPage />,

  },
  {
    path: "/user/:username",
    element: <UserProfile />,
    errorElement: <ErrorPage />,

  },

  {
    path: "/user/:username/followers",
    element: <Followers />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user/:username/following",
    element: <Following />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/postform",
    element: <NewPost />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/fileform",
    element: <FileForm />,
    errorElement: <ErrorPage />,
  },




]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;


