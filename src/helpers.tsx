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
};

export const handleChangeCount = (
  containerRef: React.RefObject<HTMLDivElement>
) => {
  if (containerRef !== null) {
    containerRef.current!.style.outlineWidth = "5px";
    const timeout = setTimeout(() => {
      containerRef.current!.style.outlineWidth = "0px";
    }, 300);
  }
};
