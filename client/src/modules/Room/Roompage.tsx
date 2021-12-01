import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { receiveMessageOnPort } from "worker_threads";
import ChatBox from "../../ui/chat/ChatBox";
import ChatInput from "../../ui/chat/ChatInput";
import ChatWrapper from "../../ui/chat/ChatWrapper";
import {
  MessageBubbleLeft,
  MessageBubbleRight,
} from "../../ui/chat/MessageBubble";

import { v4 as uuidv4 } from "uuid";

interface Message {
  id: string;
  userid: string;
  user: string;
  message: string;
  room: string;
}
// { userId: 4, user: "Fabienne", message: "Hi" },

const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io(
  "http://localhost:4000"
);

const Roompage = () => {
  const router = useRouter();
  const [msg, setMsg] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");

  const { room } = router.query;

  useEffect(() => {
    const receiveMessage = (message: Message): void => {
      setMsg([...msg, message]);
    };

    socket.on("msgToClient", (message: Message): void => {
      receiveMessage(message);
    });
  });

  const validate = (): boolean => {
    return (
      text.length > 0 &&
      window.sessionStorage.getItem("UserId") !== null &&
      window.sessionStorage.getItem("UserName") !== null
    );
  };

  const sendChatMessage = () => {
    if (validate()) {
      const message = {
        id: uuidv4(),
        userid: window.sessionStorage.getItem("UserId"),
        user: window.sessionStorage.getItem("UserName"),
        room: room,
        message: text,
      };

      socket.emit("msgToServer", message);
      setText("");
    }
  };

  const chatMessages = msg.map((m: Message) => {
    if (window.sessionStorage.getItem("UserId") === m.userid) {
      return (
        <MessageBubbleRight name={m.user} message={m.message} key={m.id} />
      );
    } else {
      return <MessageBubbleLeft name={m.user} message={m.message} key={m.id} />;
    }
  });

  return (
    <body className="flex flex-col items-center justify-center w-screen min-h-screen bg-primary-100">
      <ChatWrapper>
        <ChatBox>{chatMessages}</ChatBox>
        <ChatInput
          onClick={() => sendChatMessage()}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </ChatWrapper>
    </body>
  );
};

export default Roompage;
