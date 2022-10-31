import React from "react";
import { Link } from "react-router-dom";
import styles from "./PlayScene.module.scss";

const PlayScene = () => {
  const [count, setCount] = React.useState(0);

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
          <video
            src="https://github.com/litlestuart/count-people-in-bus/resources/1.mov"
            className={styles.player}
          ></video>
        </div>
      </div>
      <div className={styles.col}>
        <div className={`${styles.button} ${styles.controlsButton}`}>
          <span className="material-icons-round">play_arrow</span>
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
