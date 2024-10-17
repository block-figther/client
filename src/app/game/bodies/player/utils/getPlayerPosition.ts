import { Application } from "pixi.js";
import { IPlayerData } from "../../interfaces/i.player-data";
import { SCALE } from "../../../const/scale";

export const getPlayerPosition = (
  app: Application,
  bodyData: IPlayerData
): [number, number] => {
  const x = (bodyData.x - bodyData.data.width) * SCALE;
  const y = app.renderer.height - bodyData.y * SCALE - 4;
  return [x, y];
};
