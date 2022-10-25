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
      <Link to="/" className={`${styles.button} ${styles.controlsButton}`}>
        <span className="material-icons-round">close</span>
      </Link>
      <h2>People: {count}</h2>
      <div className={styles.videoMask}>
        <video src="" className={styles.player} controls></video>
      </div>
      <div className={`${styles.button} ${styles.controlsButton}`}>
        <span className="material-icons-round">play_arrow</span>
      </div>
      <div
        className={`${styles.button} ${styles.countButton}`}
        onClick={decrementCount}
      >
        <span className="material-icons-round">remove</span>
      </div>
      <div
        className={`${styles.button} ${styles.countButton}`}
        onClick={incrementCount}
      >
        <span className="material-icons-round">add</span>
      </div>
    </div>
  );
};

export default PlayScene;
