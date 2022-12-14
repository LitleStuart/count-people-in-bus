import React from "react";
import { Link } from "react-router-dom";
import styles from "./PlayScene.module.scss";
import { Player } from "./Player";
import { MaterialButton } from "../MaterialButton";
import Swal from "sweetalert2";

const sendData = (
  insidePeople: number,
  outsidePeople: number,
  intervals: number[]
) => {
  Swal.fire("Данные успешно отправлены", "", "success");
};

const getVideo = () => {
  return "https://vpp-reg.tahoplan.ru/video/2022-12-29T13/001241dbf441_2022-12-29T13:29:27_007.mp4";
};

const PlayScene = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [insidePeople, setInsidePeople] = React.useState(0);
  const [outsidePeople, setOutsidePeople] = React.useState(0);
  const [videoIsPlaying, setVideoIsPlaying] = React.useState(false);
  const [speed, setSpeed] = React.useState(2);
  const [intervals, setIntervals] = React.useState<number[]>([]);

  React.useEffect(() => {
    videoRef.current!.playbackRate = speed;
  }, [speed]);

  React.useEffect(() => {
    const SECONDS_FROM_START_VIDEO =
      Math.round(videoRef.current!.currentTime * 1000) / 1000;
    setIntervals([...intervals, SECONDS_FROM_START_VIDEO]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insidePeople, outsidePeople]);

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

  const confirmData = () => {
    const confirmMessage = `Зашли ${insidePeople}, вышли ${outsidePeople}`;
    const data = {
      insidePeople: insidePeople,
      outsidePeople: outsidePeople,
      intervals: intervals,
    };
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
        sendData(data.insidePeople, data.outsidePeople, data.intervals);
        setInsidePeople(0);
        setOutsidePeople(0);
        setIntervals([]);
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
          <Link to="/" className={`${styles.button} ${styles.controlsButton}`}>
            <span className="material-icons-round">close</span>
          </Link>
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
        source={getVideo()}
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
