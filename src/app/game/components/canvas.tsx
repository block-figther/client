import { Application } from "pixi.js";
import { useEffect, useRef } from "react";
import { GroundData } from "../bodies/interfaces/i.ground-data";
import { IPlayerData as PlayerData } from "../bodies/interfaces/i.player-data";
import { drawGround } from "../bodies/ground/draw/ground";
import { box2dToPixi } from "../utils/toPixi";
import { drawPlayer } from "../bodies/player/draw/player";
import { Body } from "../bodies/enum/enum.bodies";
import { SCALE } from "../const/scale";
import { getPlayerPosition } from "../bodies/player/utils/getPlayerPosition";

const KeyCodes: Record<string, string> = {
  w: "up",
  a: "left",
  s: "down",
  d: "right",
};

export const CanvasComponent = ({ socket }: { socket: WebSocket }) => {
  const pixiContainer = useRef<HTMLDivElement | null>(null); // Ref for PixiJS canvas container

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!e.repeat) {
      console.log(`HERE`, e);
      const key: string = KeyCodes[e.key.toLowerCase()];
      if (key) {
        socket.send(
          JSON.stringify({
            event: `KEY_PRESS`,
            data: {
              key,
            },
          })
        );
      }
    }
  };
  useEffect(() => {
    const app = new Application();
    document.addEventListener("keydown", handleKeyPress);

    let counter = 0;
    // const fpsCounter = setInterval(() => {
    //   console.log(`Frames per second: ${counter}`);
    //   counter = 0;
    // }, 1000);

    if (pixiContainer.current) {
      app
        .init({
          resizeTo: window,
          backgroundColor: 0x000000,
        })
        .then(() => {
          console.log(`initialized`);
          pixiContainer.current?.appendChild(app.canvas);
          app.stage.interactive = true;
          app.stage.eventMode = "static";
          app.stage.on("pointerdown", (e) => {
            console.log(`Click, X: ${e.globalX}, Y: ${e.globalY}`);
          });
        });
    }

    socket.onmessage = (event: MessageEvent) => {
      counter++;

      if (!app.renderer) {
        return;
      }

      app.stage.removeChildren();
      const data = JSON.parse(event.data);
      for (let i = 0; i < data.length; i++) {
        const bodyData: GroundData | PlayerData = data[i];

        if (bodyData.type === Body.ground) {
          drawGround(app, bodyData);
        }

        if (bodyData.type === Body.player) {
          drawPlayer(app, bodyData);
          const [x, y] = getPlayerPosition(app, bodyData);
          app.stage.pivot.set(x, y);

          app.stage.position.set(
            app.renderer.width / 2,
            app.renderer.height / 2
          );
        }
      }
    };

    return () => {
      // clearInterval(fpsCounter);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [socket]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div ref={pixiContainer} />
    </div>
  );
};
