import React from "react";
import styles from "./PlayScene.module.scss";
import ScrollBar from "./ScrollBar";

interface IPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  videoRef: React.RefObject<HTMLVideoElement>;
  currentTime: number;
  duration: number;
}

export const Player = ({
  videoRef,
  currentTime,
  duration,
  ...rest
}: IPlayerProps) => {
  const setVideoTime = (time: number) => {
    if (time < 0) videoRef.current!.currentTime = 0;
    else if (time > videoRef.current!.duration)
      videoRef.current!.currentTime = videoRef.current!.duration;
    else videoRef.current!.currentTime = time;
  };

  const handleWidthChange = (widthPercentage: number) => {
    setVideoTime(
      Number((videoRef.current!.duration * widthPercentage).toFixed(3))
    );
  };

  return (
    <div className={styles.col}>
      <div className={styles.videoMask}>
        <video
          playsInline
          ref={videoRef}
          className={styles.player}
          {...rest}
        ></video>
        <ScrollBar
          onWidthChange={handleWidthChange}
          timePercentage={Number((currentTime / duration).toFixed(3))}
        />
      </div>
    </div>
  );
};
