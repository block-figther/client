"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CanvasComponent } from "./components/canvas";

export default function GamePage() {
  const router = useRouter();
  const [isConnected, setConnected] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (isConnected) {
      return;
    }

    const token = localStorage.getItem("token");
    const nickname = localStorage.getItem("nickname");
    if ((!token || !nickname) && !isConnected) {
      toast.warning("Seems you session is expired.");
      router.push("/");
      return;
    }

    const socket = new WebSocket(
      `ws://localhost:8080/join_game?token=${token}&nickname=${nickname}`
    );

    socket.onerror = (error) => {
      console.error("WebSocket error: ", error);
      // toast.warning(error);
    };

    localStorage.removeItem("token");
    localStorage.removeItem("nickname");
    socket.onopen = () => {
      setConnected(true);
      setSocket(socket);
    };

    socket.onclose = (event: CloseEvent) => {
      if (event.code === 1006) {
        toast.error("Connection closed unexpectedly.");
      }
      router.push("/");
    };
  });

  useEffect(() => {
    return () => {
      socket?.close();
    };
  }, [socket]);

  return socket ? <CanvasComponent socket={socket} /> : <></>;
}
