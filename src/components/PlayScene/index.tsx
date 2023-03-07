import React from "react";
import styles from "./PlayScene.module.scss";
import { Player } from "./Player";
import { MaterialButton } from "../MaterialButton";
import Swal from "sweetalert2";

const getVideoUrl = (): string => {
  // @ts-ignore
  return apex.item("P154_VIDEO").getValue();
};

const getVideoDate = (): string => {
  // @ts-ignore
  return apex.item("P154_DATE").getValue();
};

const getSpeedIcon = (speed: number) => {
  return speed === 1 ? "chevron_right" : "keyboard_double_arrow_right";
};

const getPlayPauseIcon = (videoIsPlaying: boolean) => {
  return videoIsPlaying ? "pause" : "play_arrow";
};

const PlayScene = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [videoUrl, setVideoUrl] = React.useState(getVideoUrl());
  const [insidePeople, setInsidePeople] = React.useState(0);
  const [outsidePeople, setOutsidePeople] = React.useState(0);
  const [videoIsPlaying, setVideoIsPlaying] = React.useState(false);
  const [speed, setSpeed] = React.useState(2);
  const [videoTime, setVideoTime] = React.useState({
    currentTime: 0,
    duration: 0,
  });
  const [videoDate, setVideoDate] = React.useState(getVideoDate());

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
    setSpeed((speed % 2) + 1);
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
  };

  const updateData = (): void => {
    // @ts-ignore
    apex.server
      .process("send_data", {
        // @ts-ignore
        x01: apex.item("P154_VEH").getValue(),
        // @ts-ignore
        x02: apex.item("P154_BEG_DT").getValue(),
        // @ts-ignore
        x03: apex.item("P154_END_DT").getValue(),
        x04: insidePeople,
        x05: outsidePeople,
        // @ts-ignore
        x06: apex.item("P154_ID_VIDEO").getValue(),
      })
      .then((result: { id: number; url: string; date: string }) => {
        setInsidePeople(0);
        setOutsidePeople(0);
        setVideoIsPlaying(false);
        // @ts-ignore
        apex.item("P154_ID_VIDEO").setValue(result.id);
        // @ts-ignore
        apex.item("P154_VIDEO").setValue(result.url);
        // @ts-ignore
        apex.item("P154_DATE").setValue(result.date);
        setVideoDate(result.date);
        setVideoUrl(result.url);
      });
  };

  const confirmData = () => {
    const confirmMessage = `Вышло ${outsidePeople}, зашло ${insidePeople}`;
    Swal.fire({
      title: "Подтверждение",
      text: confirmMessage,
      showConfirmButton: true,
      confirmButtonText: "Да",
      showCancelButton: true,
      cancelButtonText: "Отмена",
      confirmButtonColor: "#9086ff",
    }).then((result) => {
      if (result.isConfirmed) {
        updateData();
      }
    });
  };

  return (
    <div className={styles.container}>
      <h2>
        Видео от {videoDate}, {Math.floor(videoTime.currentTime)}/
        {Math.floor(videoTime.duration)} сек
        <br />
        Вышло: {outsidePeople}; зашло: {insidePeople}
      </h2>
      <div className={styles.col}>
        <div>
          <MaterialButton
            className={`${styles.button} ${styles.controlsButton}`}
            icon="done"
            handleClick={confirmData}
          />
          <MaterialButton
            className={`${styles.button} ${styles.controlsButton}`}
            icon="refresh"
            handleClick={resetPeopleCount}
          />
          <MaterialButton
            className={`${styles.button} ${styles.controlsButton}`}
            icon="arrow_back"
            handleClick={() => {
              // @ts-ignore
              window.location.href = apex.util.makeApplicationUrl({
                pageId: 155,
              });
            }}
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
          <MaterialButton
            className={`${styles.button} ${styles.controlsButton}`}
            handleClick={toggleVideoSpeed}
            icon={getSpeedIcon(speed)}
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
