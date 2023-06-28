import React from "react";
import styles from "./PlayScene.module.scss";
import { Player } from "./Player";
import { MaterialButton } from "../MaterialButton";
import Swal from "sweetalert2";
import {
  getApexItemValue,
  getPlayPauseIcon,
  getSpeedIcon,
  setApexItemValue,
  handleIosPwaInstall,
  handleChangeCount,
} from "../../helpers";

const PlayScene = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [videoId, setVideoId] = React.useState(
    getApexItemValue("P154_ID_VIDEO")
  );
  const [videoUrl, setVideoUrl] = React.useState(
    getApexItemValue("P154_VIDEO")
  );
  const [videoDate, setVideoDate] = React.useState(
    getApexItemValue("P154_DATE")
  );
  const [videoTime, setVideoTime] = React.useState({
    currentTime: 0,
    duration: 0,
  });
  const [videoIsPlaying, setVideoIsPlaying] = React.useState(false);
  const [videoWasFinished, setVideoWasFinished] = React.useState(false);
  const [speed, setSpeed] = React.useState(2);
  const [insidePeople, setInsidePeople] = React.useState(0);
  const [outsidePeople, setOutsidePeople] = React.useState(0);

  React.useEffect(handleIosPwaInstall, []);

  React.useEffect(() => {
    if (videoId === "" && videoUrl === "") {
      setVideoTime({ currentTime: 0, duration: 0 });
      // @ts-ignore
      apex.server
        .process("get_new_video", {
          x01: getApexItemValue("P154_BEG_DT"),
          x02: getApexItemValue("P154_END_DT"),
          x03: getApexItemValue("P154_VEH"),
        })
        .then((result: { id: number; url: string; date: string }) => {
          setInsidePeople(0);
          setOutsidePeople(0);
          setVideoIsPlaying(false);
          if (Object.keys(result).length) {
            setApexItemValue("P154_ID_VIDEO", result.id);
            setApexItemValue("P154_VIDEO", result.url);
            setApexItemValue("P154_DATE", result.date);
            setVideoId(result.id.toString());
            setVideoUrl(result.url);
            setVideoDate(result.date);
          } else {
            setApexItemValue("P154_ID_VIDEO", "");
            setApexItemValue("P154_VIDEO", "");
            setApexItemValue("P154_DATE", "");
            setVideoId("");
            setVideoUrl("");
            setVideoDate("");
          }
        });
    }
  }, [videoId, videoUrl]);

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
    handleChangeCount(containerRef);
  };
  const decrementCount = () => {
    setOutsidePeople(outsidePeople + 1);
    handleChangeCount(containerRef);
  };
  const handleVideoEnd = () => {
    setVideoWasFinished(true);
    setVideoIsPlaying(false);
  };
  const handlePlayPauseButton = () => {
    if (videoRef.current?.currentTime !== videoRef.current?.duration)
      setVideoIsPlaying(!videoIsPlaying);
  };
  const resetPeopleCount = () => {
    setInsidePeople(0);
    setOutsidePeople(0);
    videoRef.current!.currentTime = 0;
  };
  const handleLoadedMetadata = () => {
    setVideoTime({
      currentTime: 0,
      duration: videoRef.current!.duration,
    });
  };
  const handleTimeUpdate = () => {
    setVideoTime({
      duration: videoTime.duration,
      currentTime: videoRef.current!.currentTime,
    });
  };

  const updateData = (): void => {
    type successResponse = {
      code: "ok";
      id: number;
      url: string;
      date: string;
    };
    type errorSavingResult = { code: "error"; error: "saving" };
    type errorGettingVideo = { code: "error"; error: "get_video" };
    type responseType = successResponse | errorGettingVideo | errorSavingResult;

    // @ts-ignore
    apex.server
      .process("send_data", {
        x01: getApexItemValue("P154_VEH"),
        x02: getApexItemValue("P154_BEG_DT"),
        x03: getApexItemValue("P154_END_DT"),
        x04: insidePeople,
        x05: outsidePeople,
        x06: videoId,
      })
      .then((result: responseType) => {
        if (result.code === "ok") {
          setInsidePeople(0);
          setOutsidePeople(0);
          setVideoIsPlaying(false);
          setVideoWasFinished(false);
          setApexItemValue("P154_ID_VIDEO", result.id);
          setApexItemValue("P154_VIDEO", result.url);
          setApexItemValue("P154_DATE", result.date);
          setVideoId(result.id.toString());
          setVideoUrl(result.url);
          setVideoDate(result.date);
        } else {
          Swal.fire({
            title: "Ошибка при сохранении результатов подсчета",
            icon: "error",
            showCancelButton: true,
            cancelButtonText: "Отмена",
            showConfirmButton: true,
            confirmButtonText: "Повтор",
            confirmButtonColor: "#9086ff",
          }).then((result) => {
            if (result.isConfirmed) {
              updateData();
            }
          });
        }
      });
  };

  return (
    <div className={styles.container} ref={containerRef}>
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
            handleClick={updateData}
            disabled={!videoWasFinished}
          />
          <MaterialButton
            className={`${styles.button} ${styles.controlsButton}`}
            icon="refresh"
            handleClick={resetPeopleCount}
          />
        </div>
        <MaterialButton
          className={`${styles.button} ${styles.countButton}`}
          handleClick={decrementCount}
          icon="remove"
        />
      </div>
      <Player
        currentTime={videoTime.currentTime}
        duration={videoTime.duration}
        videoRef={videoRef}
        src={videoUrl}
        onEnded={handleVideoEnd}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
      />
      <div className={styles.col}>
        <div>
          <MaterialButton
            handleClick={handlePlayPauseButton}
            icon={getPlayPauseIcon(videoIsPlaying)}
            className={`${styles.button} ${styles.controlsButton}`}
          />
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
