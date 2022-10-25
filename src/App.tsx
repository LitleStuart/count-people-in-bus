import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainMenu from "./components/MainMenu";
import PlayScene from "./components/PlayScene";
const path = "https://litlestuart.github.io/count-people-in-bus";
const router = createBrowserRouter([
  {
    path: path + "/",
    element: <MainMenu />,
  },
  {
    path: path + "/start",
    element: <PlayScene />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
