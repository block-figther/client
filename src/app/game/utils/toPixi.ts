import { Application } from "pixi.js";

export const PIXIscale = 1; // pixels per meter

export const box2dToPixi = (
  x: number,
  y: number,
  app: Application
): { x: number; y: number } => {
  return {
    x: x * PIXIscale,
    y: app.renderer.height - y * PIXIscale,
  };
};
