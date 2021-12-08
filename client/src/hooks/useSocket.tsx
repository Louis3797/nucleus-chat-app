import { useState } from "react";
import { io, Socket } from "socket.io-client";
import Message from "../types/Message";

export const useSocket = (socketAdress: string) => {
  const [socket, setSocket] = useState<Socket>(io(socketAdress));

  function connect(): void {
    socket.on("connect", () => {});
  }

  function disconnect(): void {
    socket.on("leftRoom", () => {});
  }

  function getMessage(): Message | null {
    return null;
  }

  function sendMessage(message: Message): void {
    socket.emit("msgToServer", message);
  }

  function joinRoom(room: string): void {
    socket.emit("joinRoom", room);
  }

  return [
    socket,
    setSocket,
    connect,
    disconnect,
    joinRoom,
    getMessage,
    sendMessage,
  ] as const;
};
