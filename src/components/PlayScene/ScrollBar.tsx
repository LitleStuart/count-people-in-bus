import styles from "./PlayScene.module.scss";
import React from "react";
import { useDrag } from "@use-gesture/react";

interface IScrollBarProps {
  onWidthChange: (widthPercentage: number) => void;
  timePercentage: number;
}

const ScrollBar = ({ onWidthChange, timePercentage }: IScrollBarProps) => {
  const [width, setWidth] = React.useState(0);
  const scrollMaskRef = React.useRef<HTMLDivElement>(null);

  const setCurrentWidth = React.useCallback((w: number) => {
    if (w < 0) setWidth(0);
    else if (w > scrollMaskRef.current!.offsetWidth)
      setWidth(scrollMaskRef.current!.offsetWidth);
    else setWidth(w);
  }, []);

  React.useEffect(() => {
    setCurrentWidth(
      Number(
        (
          (scrollMaskRef.current!.offsetWidth || window.innerWidth * 0.75) *
          timePercentage
        ).toFixed(3)
      )
    );
  }, [scrollMaskRef, setCurrentWidth, timePercentage]);

  const bind = useDrag(
    (state) => {
      setCurrentWidth(width + state.delta[0]);
      onWidthChange(
        Number((width / scrollMaskRef.current!.offsetWidth).toFixed(3))
      );
    },
    { axis: "x" }
  );

  return (
    <div className={styles.timeContainer} {...bind()} ref={scrollMaskRef}>
      <div
        className={styles.currentTime}
        style={{
          width: width + "px",
        }}
      >
        &nbsp;
      </div>
    </div>
  );
};

export default ScrollBar;
