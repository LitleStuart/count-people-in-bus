import React from "react";
import styles from "./PlayScene.module.scss";

interface IPlayerProps {
  playDynamicOnly: boolean;
  source: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  handleVideoEnd: () => void;
  videoIsPlaying: boolean;
  speed: number;
}

type Interval = {
  startTime: number;
  endTime?: number;
  type: "static" | "dynamic";
};

export const Player = ({
  playDynamicOnly,
  source,
  handleVideoEnd,
  videoRef,
  videoIsPlaying,
}: IPlayerProps) => {
  const playDynamicIntervals = (intervals: Interval[]) => {
    const dynamicIntervals: Interval[] = [];
    const intervalsAmount = intervals.length;

    for (let i = 0; i < intervals.length - 1; i++) {
      const interval = intervals[i];
      if (interval.type === "dynamic") {
        dynamicIntervals.push({
          startTime: interval.startTime,
          endTime: intervals[i + 1].startTime,
          type: "dynamic",
        });
      }
    }
    if (intervals[intervalsAmount - 1].type === "dynamic") {
      dynamicIntervals.push({
        startTime: intervals[intervalsAmount - 1].startTime,
        type: "dynamic",
      });
    }
  };
  return (
    <div className={styles.col}>
      <div className={styles.videoMask}>
        <video
          ref={videoRef}
          src={source}
          className={styles.player}
          onEnded={handleVideoEnd}
          playsInline
        ></video>
      </div>
    </div>
  );
};
