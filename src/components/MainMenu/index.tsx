import { Link } from "react-router-dom";
import styles from "./MainMenu.module.scss";

const MainMenu = () => {
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
