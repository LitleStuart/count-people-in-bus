import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainMenu from "./components/MainMenu";
import PlayScene from "./components/PlayScene";
const router = createHashRouter([
  {
    path: "/",
    element: <MainMenu />,
  },
  {
    path: "/start",
    element: <PlayScene />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
