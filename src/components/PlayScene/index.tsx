import React from "react";
import { Link } from "react-router-dom";
import styles from "./PlayScene.module.scss";
import video from "../../resources/1.mov";
import { Player } from "./Player";
import { MaterialButton } from "./MaterialButton";

const PlayScene = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [count, setCount] = React.useState(9);
  const [videoIsPlaying, setVideoIsPlaying] = React.useState(false);
  const [speed, setSpeed] = React.useState(2);
  const [intervals, setIntervals] = React.useState<number[]>([]);

  React.useEffect(() => {
    videoRef.current!.playbackRate = speed;
  }, [speed]);

  React.useEffect(() => {
    const SECONDS_FROM_START_VIDEO =
      Math.round(videoRef.current!.currentTime * 1000) / 1000;
    setIntervals([...intervals, SECONDS_FROM_START_VIDEO]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  React.useEffect(() => {
    if (videoIsPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [videoIsPlaying]);

  const toggleVideoSpeed = () => {
    setSpeed((speed % 2) + 1);
  };
  const incrementCount = () => {
    setCount(count + 1);
  };
  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className={styles.container}>
      <h2>People: {count}</h2>
      <div className={styles.col}>
        <div>
          <Link to="/" className={`${styles.button} ${styles.controlsButton}`}>
            <span className="material-icons-round">close</span>
          </Link>
        </div>
        <MaterialButton
          className={`${styles.button} ${styles.countButton}`}
          handleClick={() => {
            decrementCount();
          }}
          icon="remove"
        />
      </div>
      <Player
        videoRef={videoRef}
        source={video}
        handleVideoEnd={() => {
          setVideoIsPlaying(false);
        }}
      />
      <div className={styles.col}>
        <div>
          <MaterialButton
            handleClick={() => setVideoIsPlaying(!videoIsPlaying)}
            icon={videoIsPlaying ? "pause" : "play_arrow"}
            className={`${styles.button} ${styles.controlsButton}`}
          />
          <MaterialButton
            className={`${styles.button} ${styles.controlsButton}`}
            handleClick={() => toggleVideoSpeed()}
            icon={speed === 1 ? "chevron_right" : "keyboard_double_arrow_right"}
          />
        </div>
        <MaterialButton
          className={`${styles.button} ${styles.countButton}`}
          handleClick={() => {
            incrementCount();
          }}
          icon="add"
        />
      </div>
    </div>
  );
};

export default PlayScene;
