import { Body } from "../enum/enum.bodies";

export interface IPlayerData {
  x: number;
  y: number;
  type: Body.player;
  data: {
    type: Body.player;
    width: number;
    height: number;
    health: number
  };
}
