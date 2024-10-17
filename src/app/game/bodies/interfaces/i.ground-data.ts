import { Body } from "../enum/enum.bodies";

export interface GroundData {
  x: number;
  y: number;
  type: Body.ground;
  data: {
    type: Body.ground;
    width: number;
    height: number;
  };
}
