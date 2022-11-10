import React from "react";
import { Link } from "react-router-dom";
import styles from "./PlayScene.module.scss";
import video from "../../resources/1.mov";

const PlayScene = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [count, setCount] = React.useState(9);
  const [videoIsPlaying, setVideoIsPlaying] = React.useState(false);
  const [speed, setSpeed] = React.useState(2);
  const [withMovement, setWithMovement] = React.useState(true);
  const [linksToVideoTime, setlinksToVideoTime] = React.useState<number[]>([]);

  React.useEffect(() => {
    videoRef.current!.playbackRate = speed;
  }, [speed]);

  React.useEffect(() => {
    setlinksToVideoTime([1, 5, 9, 15]);
  }, []);

  React.useEffect(() => {
    if (videoIsPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [withMovement, videoIsPlaying]);

  const toggleVideoSpeed = () => {
    if (speed === 3) {
      setSpeed(1);
    } else {
      setSpeed(speed + 1);
    }
  };
  const incrementCount = () => {
    setCount(count + 1);
  };
  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const setCurrentVideoTime = (secs: number) => {
    videoRef.current!.currentTime = secs;
  };

  return (
    <div className={styles.container}>
      <h2>People: {count}</h2>
      <div className={styles.col}>
        <div>
          <Link to="/" className={`${styles.button} ${styles.controlsButton}`}>
            <span className="material-icons-round">close</span>
          </Link>
          <div style={{ textAlign: "center" }}>
            {linksToVideoTime.map((val) => {
              return (
                <p
                  key={val}
                  className={styles.link}
                  onClick={() => {
                    setCurrentVideoTime(val);
                  }}
                >{`${Math.floor(val / 60)
                  .toString()
                  .padStart(2, "0")}:${(val % 60)
                  .toString()
                  .padStart(2, "0")}`}</p>
              );
            })}
          </div>
        </div>
        <div
          className={`${styles.button} ${styles.countButton}`}
          onClick={decrementCount}
        >
          <span className="material-icons-round">remove</span>
        </div>
      </div>
      <div className={styles.col}>
        <div className={styles.videoMask}>
          <video
            ref={videoRef}
            src={video}
            className={styles.player}
            onEnded={() => {
              setVideoIsPlaying(false);
            }}
          ></video>
        </div>
      </div>
      <div className={styles.col}>
        <div>
          <div
            className={`${styles.button} ${styles.controlsButton}`}
            onClick={() => {
              setVideoIsPlaying(!videoIsPlaying);
            }}
          >
            <span className="material-icons-round">
              {videoIsPlaying ? "pause" : "play_arrow"}
            </span>
          </div>
          <div
            className={`${styles.button} ${styles.controlsButton}`}
            style={{ marginTop: 10 }}
            onClick={toggleVideoSpeed}
          >
            <span style={{ fontSize: "2em", lineHeight: "calc(1em*1.5)" }}>
              {`${speed}x`}
            </span>
          </div>
          <div
            className={`${styles.button} ${styles.controlsButton}`}
            style={{ marginTop: 10 }}
            onClick={() => {
              setWithMovement(!withMovement);
            }}
          >
            <span className="material-icons-round">
              {withMovement ? "directions_run" : "airline_seat_recline_normal"}
            </span>
          </div>
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
