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
                <MaterialButton
                  key={val}
                  className={styles.link}
                  handleClick={() => {
                    setCurrentVideoTime(val);
                  }}
                  text={`${Math.floor(val / 60)
                    .toString()
                    .padStart(2, "0")}:${(val % 60)
                    .toString()
                    .padStart(2, "0")}`}
                />
              );
            })}
          </div>
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
          <MaterialButton
            className={`${styles.button} ${styles.controlsButton}`}
            icon={
              withMovement ? "directions_run" : "airline_seat_recline_normal"
            }
            handleClick={() => {
              setWithMovement(!withMovement);
            }}
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
