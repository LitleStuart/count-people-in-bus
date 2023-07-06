import React from "react";
import { useOrientation } from "react-use";
import MainMenu from "./MainMenu";
import Orientation from "./Orientation";
import PlayScene from "../PlayScene/index";

const Main = () => {
  const [wasStarted, setWasStarted] = React.useState(false);
  const { type } = useOrientation();

  const toggleWasStarted = () => {
    setWasStarted(!wasStarted);
  };

  return (
    <>
      <div style={{ display: type === "landscape-primary" ? "none" : "" }}>
        <Orientation />
      </div>
      <div
        style={{
          display: !wasStarted || type !== "landscape-primary" ? "none" : "",
        }}
      >
        <PlayScene paused={!wasStarted || type !== "landscape-primary"} />
      </div>
      <div
        style={{
          display: wasStarted || type !== "landscape-primary" ? "none" : "",
        }}
      >
        <MainMenu onClick={toggleWasStarted} />
      </div>
    </>
  );
};

export default Main;
