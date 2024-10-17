import { SCALE } from "../const/scale";

export const boxToPixi = ({
  x,
  y,
  width,
  height,
  renderHeight,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  renderHeight: number;
}) => {
  return {
    x: (x - width) * SCALE,
    y: renderHeight - (y - height / 2) * SCALE, // Adjust y-coordinate
    width: width * SCALE * 2,
    height: height * SCALE * 2
  };
};
