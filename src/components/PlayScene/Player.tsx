import React from "react";
import styles from "./PlayScene.module.scss";

interface IPlayerProps {
  source: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  handleVideoEnd: () => void;
}

export const Player = ({ source, videoRef, handleVideoEnd }: IPlayerProps) => {
  return (
    <div className={styles.col}>
      <div className={styles.videoMask}>
        <video
          src={source}
          ref={videoRef}
          className={styles.player}
          onEnded={handleVideoEnd}
          playsInline
        ></video>
      </div>
    </div>
  );
};
