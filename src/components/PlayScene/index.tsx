import React from "react";
import styles from "./PlayScene.module.scss";
import { Player } from "./Player";
import { MaterialButton } from "../MaterialButton";
import Swal from "sweetalert2";

const sendData = (insidePeople: number, outsidePeople: number) => {
  Swal.fire("Данные успешно отправлены", "", "success");
};

const getVideoUrl = (): string => {
  // @ts-ignore
  return apex.item("P154_VIDEO").getValue();
};

const PlayScene = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [videoUrl, setVideoUrl] = React.useState(getVideoUrl());
  const [insidePeople, setInsidePeople] = React.useState(0);
  const [outsidePeople, setOutsidePeople] = React.useState(0);
  const [videoIsPlaying, setVideoIsPlaying] = React.useState(false);
  const [speed, setSpeed] = React.useState(2);

  React.useEffect(() => {
    videoRef.current!.playbackRate = speed;
  }, [speed]);

  React.useEffect(() => {
    if (videoIsPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [videoIsPlaying]);

  const toggleVideoSpeed = () => {
    setSpeed((speed % 2) + 1);
  };
  const incrementCount = () => {
    setInsidePeople(insidePeople + 1);
  };
  const decrementCount = () => {
    setOutsidePeople(outsidePeople + 1);
  };
  const updateData = (): void => {
    setInsidePeople(0);
    setOutsidePeople(0);
    setVideoUrl(getVideoUrl());
  };

  const confirmData = () => {
    const confirmMessage = `Зашли ${insidePeople}, вышли ${outsidePeople}`;
    Swal.fire({
      title: "Подтверждение",
      text: confirmMessage,
      showConfirmButton: true,
      confirmButtonText: "Да",
      showCancelButton: true,
      cancelButtonText: "Нет",
      confirmButtonColor: "#9086ff",
    }).then((result) => {
      if (result.isConfirmed) {
        sendData(insidePeople, outsidePeople);
        updateData();
      }
    });
  };

  return (
    <div className={styles.container}>
      <h2>
        Зашли: {insidePeople}; вышли: {outsidePeople}
      </h2>
      <div className={styles.col}>
        <div>
          <MaterialButton
            className={`${styles.button} ${styles.controlsButton}`}
            icon="done"
            handleClick={confirmData}
          />
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
        source={videoUrl}
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
