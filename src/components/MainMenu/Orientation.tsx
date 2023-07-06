import React from "react";
import styles from "./MainMenu.module.scss";
const Orientation = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Для использования приложения нужно повернуть телефон горизонтально
      </h1>
    </div>
  );
};

export default Orientation;
