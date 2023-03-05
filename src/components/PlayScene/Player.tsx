import React from "react";
import styles from "./PlayScene.module.scss";

interface IPlayerProps {
  source: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  handleVideoEnd: () => void;
  handleTimeUpdate: () => void;
  handleLoadedData: () => void;
}

export const Player = ({
  source,
  videoRef,
  handleVideoEnd,
  handleTimeUpdate,
  handleLoadedData,
}: IPlayerProps) => {
  return (
    <div className={styles.col}>
      <div className={styles.videoMask}>
        <video
          preload="auto"
          src={source}
          ref={videoRef}
          className={styles.player}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnd}
          onLoadedData={handleLoadedData}
          playsInline
        ></video>
      </div>
    </div>
  );
};
