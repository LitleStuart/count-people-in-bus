import React from "react";
import styles from "./PlayScene.module.scss";
import { useDrag } from "@use-gesture/react";

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
  const [width, setWidth] = React.useState(0);
  const timeContainerRef = React.useRef<HTMLDivElement>(null);
  const bind = useDrag(
    (state) => {
      setCurrentWidth(width + state.delta[0]);
      setVideoTime(
        Math.round(
          videoRef.current!.duration *
            (width / timeContainerRef.current!.offsetWidth)
        )
      );
    },
    { axis: "x" }
  );

  const setVideoTime = (time: number) => {
    if (time < 0) videoRef.current!.currentTime = 0;
    else if (time > videoRef.current!.duration)
      videoRef.current!.currentTime = videoRef.current!.duration;
    else videoRef.current!.currentTime = time;
  };
  const setCurrentWidth = (w: number) => {
    if (w < 0) setWidth(0);
    else if (w > timeContainerRef.current!.offsetWidth)
      setWidth(timeContainerRef.current!.offsetWidth);
    else setWidth(w);
    console.log(width);
  };

  return (
    <div className={styles.col}>
      <div className={styles.videoMask}>
        <video
          playsInline
          src={source}
          ref={videoRef}
          className={styles.player}
          onTimeUpdate={() => {
            handleTimeUpdate();
            setCurrentWidth(
              Math.round(
                (videoRef.current!.currentTime / videoRef.current!.duration) *
                  timeContainerRef.current!.offsetWidth
              )
            );
          }}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleVideoEnd}
        ></video>
        <div
          className={styles.timeContainer}
          {...bind()}
          ref={timeContainerRef}
        >
          <div className={styles.currentTime} style={{ width: width + "px" }}>
            &nbsp;
          </div>
        </div>
      </div>
    </div>
  );
};
