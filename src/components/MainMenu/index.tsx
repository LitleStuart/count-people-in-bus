import React from "react";
import { Link } from "react-router-dom";
import styles from "./MainMenu.module.scss";

const MainMenu = () => {
  const [orientation, setOrientation] = React.useState(window.orientation);
  window.addEventListener("orientationchange", () => {
    setOrientation(window.orientation);
  });
  if (orientation === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Пожалуйста, переверните телефон</h1>
        <h1 className={styles.title}>{orientation}</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Сколько людей в автобусе?</h1>
      <Link className={styles.startButton} to="/start">
        Начать
      </Link>
    </div>
  );
};

export default MainMenu;
