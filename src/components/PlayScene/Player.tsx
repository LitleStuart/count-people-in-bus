import React from "react";
import styles from "./PlayScene.module.scss";

interface IPlayerProps {
  // playDynamicOnly: boolean;
  source: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  handleVideoEnd: () => void;
  // speed: number;
}

// type Interval = {
//   startTime: number;
//   endTime?: number;
//   type: "static" | "dynamic";
// };

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
