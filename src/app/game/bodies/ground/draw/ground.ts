import { Application, Graphics } from "pixi.js";
import { GroundData } from "../../interfaces/i.ground-data";
import { box2dToPixi } from "../../../utils/toPixi";
import { SCALE } from "../../../const/scale";

export const drawGround = (app: Application, data: GroundData) => {
  const {
    x,
    y,
    data: { width, height },
  } = data;

  const newY = app.renderer.height - y + height * SCALE;
  const ground = new Graphics()
    .rect((x - width) * SCALE, newY, width * SCALE * 2, height * SCALE * 2)
    .fill(0xffffff);
  ground.interactive = true;

  app.stage.addChild(ground);
};

// .rect(
//   x * SCALE - (width / 2) * SCALE,
//   app.renderer.height - y * SCALE - (height / 2) * SCALE,
//   width * SCALE,
//   height * SCALE
// )
