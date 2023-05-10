import React from "react";
import styles from "./PlayScene.module.scss";

interface IPlayerProps {
  source: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  handleVideoEnd: () => void;
  handleTimeUpdate: () => void;
  handleLoadedMetadata: () => void;
  handlePlayPause: () => void;
  handleRateChange: () => void;
}

export const Player = ({
  source,
  videoRef,
  handleVideoEnd,
  handleTimeUpdate,
  handleLoadedMetadata,
  handlePlayPause,
  handleRateChange,
}: IPlayerProps) => {
  return (
    <div className={styles.col}>
      <div className={styles.videoMask}>
        <video
          onPlay={handlePlayPause}
          onPause={handlePlayPause}
          onRateChange={handleRateChange}
          controls
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
