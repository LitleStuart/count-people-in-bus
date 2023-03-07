import React from "react";
import styles from "./PlayScene.module.scss";

interface IPlayerProps {
  source: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  handleVideoEnd: () => void;
  handleTimeUpdate: () => void;
  handleLoadedMetadata: () => void;
}

export const Player = ({
  source,
  videoRef,
  handleVideoEnd,
  handleTimeUpdate,
  handleLoadedMetadata,
}: IPlayerProps) => {
  return (
    <div className={styles.col}>
      <div className={styles.videoMask}>
        <video
          playsInline
          src={source}
          ref={videoRef}
          className={styles.player}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleVideoEnd}
        ></video>
      </div>
    </div>
  );
};
