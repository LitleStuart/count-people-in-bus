import React from "react";
import styles from "./PlayScene.module.scss";
import { Player } from "./Player";
import { MaterialButton } from "../MaterialButton";
import Swal from "sweetalert2";

const getSpeedIcon = (speed: number) => {
  return speed + "x";
};
const getPlayPauseIcon = (videoIsPlaying: boolean) => {
  return videoIsPlaying ? "pause" : "play_arrow";
};

const PlayScene = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  // eslint-disable-next-line
  const [videoUrl, setVideoUrl] = React.useState(
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  );
  // eslint-disable-next-line
  const [videoDate, setVideoDate] = React.useState("09.05.2023 09:00");
  const [videoTime, setVideoTime] = React.useState({
    currentTime: 0,
    duration: 0,
  });
  const [videoIsPlaying, setVideoIsPlaying] = React.useState(false);
  const [speed, setSpeed] = React.useState(2);
  const [insidePeople, setInsidePeople] = React.useState(0);
  const [outsidePeople, setOutsidePeople] = React.useState(0);

  React.useEffect(() => {
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };
    const isInStandaloneMode = () =>
      // @ts-ignore
      "standalone" in window.navigator && window.navigator.standalone;

    if (isIos() && !isInStandaloneMode()) {
      Swal.fire({
        title: "Установите приложение",
        text: 'Нажмите на кнопку поделиться, а затем на кнопку "Добавить на главный экран" ("Add to homescreen")',
        showConfirmButton: true,
        confirmButtonText: "Хорошо",
        showCancelButton: false,
        confirmButtonColor: "#9086ff",
      });
    }
  }, []);

  React.useEffect(() => {
    videoRef.current!.playbackRate = speed;
    if (videoIsPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [videoIsPlaying, speed]);

  const toggleVideoSpeed = () => {
    setSpeed((speed % 3) + 1);
  };
  const incrementCount = () => {
    setInsidePeople(insidePeople + 1);
  };
  const decrementCount = () => {
    setOutsidePeople(outsidePeople + 1);
  };
  const handleVideoEnd = () => {
    setVideoIsPlaying(false);
  };
  const resetPeopleCount = () => {
    setInsidePeople(0);
    setOutsidePeople(0);
    videoRef.current!.currentTime = 0;
  };

  return (
    <div className={styles.container}>
      <h2>
        {`${
          videoDate === "" ? "Нет видео" : "Видео от "
        } ${videoDate}, ${Math.floor(videoTime.currentTime)}/${Math.floor(
          videoTime.duration
        )} сек`}
        <br />
        {`Вышло: ${outsidePeople}; зашло: ${insidePeople}`}
      </h2>
      <div className={styles.col}>
        <div>
          <MaterialButton
            className={`${styles.button} ${styles.controlsButton}`}
            icon="done"
          />
          <MaterialButton
            className={`${styles.button} ${styles.controlsButton}`}
            icon="refresh"
            handleClick={resetPeopleCount}
          />
          <MaterialButton
            className={`${styles.button} ${styles.controlsButton}`}
            icon="arrow_back"
          />
        </div>
        <MaterialButton
          className={`${styles.button} ${styles.countButton}`}
          handleClick={decrementCount}
          icon="remove"
        />
      </div>
      <Player
        videoRef={videoRef}
        source={videoUrl}
        handleVideoEnd={handleVideoEnd}
        handleTimeUpdate={() => {
          setVideoTime({
            duration: videoTime.duration,
            currentTime: videoRef.current!.currentTime,
          });
        }}
        handleLoadedMetadata={() => {
          setVideoTime({
            currentTime: 0,
            duration: videoRef.current!.duration,
          });
        }}
      />
      <div className={styles.col}>
        <div>
          <MaterialButton
            handleClick={() => setVideoIsPlaying(!videoIsPlaying)}
            icon={getPlayPauseIcon(videoIsPlaying)}
            className={`${styles.button} ${styles.controlsButton}`}
          />
          {/* <MaterialButton
            className={`${styles.button} ${styles.controlsButton}`}
            handleClick={toggleVideoSpeed}
            icon={getSpeedIcon(speed)}
          /> */}
          <MaterialButton
            className={`${styles.button} ${styles.controlsButton}`}
            handleClick={toggleVideoSpeed}
            style={{
              fontFamily: "'Roboto Mono', monospace",
              lineHeight: "1.5em",
              fontSize: "2em",
              fontWeight: "bold",
            }}
            text={getSpeedIcon(speed)}
          />
        </div>
        <MaterialButton
          className={`${styles.button} ${styles.countButton}`}
          handleClick={incrementCount}
          icon="add"
        />
      </div>
    </div>
  );
};

export default PlayScene;
