import React from "react";
import styles from "./PlayScene.module.scss";
import { Player } from "./Player";
import { MaterialButton } from "../MaterialButton";
import Swal from "sweetalert2";

const sendData = (insidePeople: number, outsidePeople: number) => {
  // @ts-ignore
  apex.server
    .process("send_data", {
      // @ts-ignore
      x01: apex.item("P154_ID_VIDEO").getValue(),
      x02: insidePeople,
      x03: outsidePeople,
    })
    .then(() => {
      Swal.fire("Данные успешно отправлены", "", "success");
    });
};

const getVideoUrl = (): string => {
  // @ts-ignore
  return apex.item("P154_VIDEO").getValue();
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
    // @ts-ignore
    apex.server
      .process("get_new_video", {
        // @ts-ignore
        x01: apex.item("P154_BEG_DT").getValue(),
        // @ts-ignore
        x02: apex.item("P154_END_DT").getValue(),
        // @ts-ignore
        x03: apex.item("P154_VEH").getValue(),
      })
      .then((data: { id: number; url: string }) => {
        // @ts-ignore
        apex.item("P154_ID_VIDEO").setValue(data.id);
        setVideoUrl(data.url);
      });
  };

  const confirmData = () => {
    const confirmMessage = `Зашли ${insidePeople}, вышли ${outsidePeople}`;
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
        sendData(insidePeople, outsidePeople);
        updateData();
      }
    });
  };

  const handleVideoEnd = () => {
    setVideoIsPlaying(false);
    Swal.fire({
      title: "Подтверждение",
      text: "Видео закончилось, хотите сразу отправить данные?",
      showConfirmButton: true,
      confirmButtonText: "Да",
      confirmButtonColor: "#9086ff",
      showCancelButton: true,
      cancelButtonText: "Отмена",
    }).then((result) => {
      if (result.isConfirmed) {
        confirmData();
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
          handleClick={decrementCount}
          icon="remove"
        />
      </div>
      <Player
        videoRef={videoRef}
        source={videoUrl}
        handleVideoEnd={handleVideoEnd}
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
