import React from "react";
import { Link } from "react-router-dom";
import styles from "./PlayScene.module.scss";
import video from "../../resources/1.mov";

const PlayScene = () => {
  const [count, setCount] = React.useState(9);
  const [videoIsPlaying, setVideoIsPlaying] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (videoIsPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setVideoIsPlaying(!videoIsPlaying);
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
        <Link to="/" className={`${styles.button} ${styles.controlsButton}`}>
          <span className="material-icons-round">close</span>
        </Link>
        <div
          className={`${styles.button} ${styles.countButton}`}
          onClick={decrementCount}
        >
          <span className="material-icons-round">remove</span>
        </div>
      </div>
      <div className={styles.col}>
        <div className={styles.videoMask}>
          <video ref={videoRef} src={video} className={styles.player}></video>
        </div>
      </div>
      <div className={styles.col}>
        <div
          className={`${styles.button} ${styles.controlsButton}`}
          onClick={toggleVideo}
        >
          <span className="material-icons-round">
            {videoIsPlaying ? "pause" : "play_arrow"}
          </span>
        </div>
        <div
          className={`${styles.button} ${styles.countButton}`}
          onClick={incrementCount}
        >
          <span className="material-icons-round">add</span>
        </div>
      </div>
    </div>
  );
};

export default PlayScene;
