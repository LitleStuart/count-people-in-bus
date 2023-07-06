import React from "react";
import styles from "./MainMenu.module.scss";

type successResponse = {
  code: "ok";
  count: number;
  duration: number;
};
type errorResponse = { code: "error"; error: "saving" };
type responseType = successResponse | errorResponse;

const MainMenu = (rest: React.HTMLProps<HTMLDivElement>) => {
  const [videoCount, setVideoCount] = React.useState(0);
  const [videoDuration, setVideoDuration] = React.useState(0);

  const getMetadata = () => {
    //@ts-ignore
    apex.server.process("get_metadata").then((res: responseType) => {
      if (res.code === "ok") {
        setVideoCount(res.count);
        setVideoDuration(res.duration);
      } else {
        console.error(res.error);
      }
    });
  };

  React.useEffect(getMetadata, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Привет! Вы находитесь в приложении для ручного подсчета входов и выходов
        пассажиров через двери автобусов.
        <br />
        {`Доступно: ${videoDuration} минут видео/${videoCount} файлов`}
      </h1>
      <div className={styles.startButton} {...rest}>
        Начать
      </div>
    </div>
  );
};

export default MainMenu;
