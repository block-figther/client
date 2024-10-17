import { Application, Graphics } from "pixi.js";
import { IPlayerData } from "../../interfaces/i.player-data";
import { SCALE } from "../../../const/scale";
import { getPlayerPosition } from "../utils/getPlayerPosition";

export const drawPlayer = (app: Application, data: IPlayerData) => {
  const {
    data: { width, height },
  } = data;

  const [x, y] = getPlayerPosition(app, data);

  const player = new Graphics()
    .rect(x, y, width * SCALE * 2, height * SCALE * 2)
    .fill(0xffffff);
  player.interactive = true;
  

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
