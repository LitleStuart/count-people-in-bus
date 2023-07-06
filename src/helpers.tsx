import Swal from "sweetalert2";

export const getApexItemValue = (item: string): string => {
  // @ts-ignore
  return apex.item(item).getValue();
};
export const setApexItemValue = (item: string, value: string | number) => {
  // @ts-ignore
  apex.item(item).setValue(value);
};

export const getSpeedIcon = (speed: number) => {
  return speed + "x";
};
export const getPlayPauseIcon = (videoIsPlaying: boolean) => {
  return videoIsPlaying ? "pause" : "play_arrow";
};

export const handleIosPwaInstall = () => {
  const isIos = /iphone|ipad|ipod/.test(
    window.navigator.userAgent.toLowerCase()
  );
  const isInStandaloneMode =
    // @ts-ignore
    "standalone" in window.navigator && window.navigator.standalone;

  if (isIos && !isInStandaloneMode) {
    Swal.fire({
      title: "Установите приложение",
      text: 'Нажмите на кнопку поделиться, а затем на кнопку "Добавить на главный экран" ("Add to homescreen")',
      showConfirmButton: true,
      confirmButtonText: "Хорошо",
      showCancelButton: false,
      confirmButtonColor: "#9086ff",
    });
  }
};

export const handleChangeCount = (
  containerRef: React.RefObject<HTMLDivElement>
) => {
  if (containerRef !== null) {
    containerRef.current!.style.outlineWidth = "5px";
    setTimeout(() => {
      containerRef.current!.style.outlineWidth = "0px";
    }, 300);
  }
};

type successResponse = {
  code: "ok";
  id: number;
  url: string;
  date: string;
};
type errorSavingResult = { code: "error"; error: "saving" };
type errorGettingVideo = { code: "error"; error: "get_video" };
export type responseType =
  | successResponse
  | errorGettingVideo
  | errorSavingResult;
