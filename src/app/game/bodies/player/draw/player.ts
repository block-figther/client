import { Application, Graphics } from "pixi.js";
import { IPlayerData } from "../../interfaces/i.player-data";
import { SCALE } from "../../../const/scale";

export const drawPlayer = (app: Application, data: IPlayerData) => {
  const {
    x,
    y,
    data: { width, height },
  } = data;

  const player = new Graphics()
    .rect(
      (x - width) * SCALE,
      app.renderer.height - y * SCALE - 5 , // Adjust y-coordinate
      width * SCALE * 2,
      height * SCALE * 2
    )
    .fill(0xffffff);

  app.stage.addChild(player);
};

// .rect(
//   x * SCALE + (width / 2) * SCALE,
//   app.renderer.height - y * SCALE - (height / 2) * SCALE,
//   width * SCALE,
//   height * SCALE
// )

// .rect(
//   (x - width / 2) * SCALE,
//   app.renderer.height - (y - height / 2) * SCALE, // Adjust y-coordinate
//   width * SCALE,
//   height * SCALE
// )
