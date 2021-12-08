import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import ChatBox from "../../ui/chat/ChatBox";
import ChatInput from "../../ui/chat/ChatInput";
import ChatWrapper from "../../ui/chat/ChatWrapper";
import {
  MessageBubbleLeft,
  MessageBubbleRight,
} from "../../ui/chat/MessageBubble";

import { v4 as uuidv4 } from "uuid";
import Message from "../../types/Message";
import { useSocket } from "../../hooks/useSocket";

// { userId: 4, user: "Fabienne", message: "Hi" },

const Roompage = () => {
  const router = useRouter();
  const [msg, setMsg] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");

  const [
    socket,
    setSocket,
    connect,
    disconnect,
    joinRoom,
    getMessage,
    sendMessage,
  ] = useSocket("http://localhost:4000");

  const { roomid } = router.query;

  console.log(roomid);

  useEffect(() => {
    if (roomid !== "undefined") joinRoom("" + roomid);
    return () => {
      roomid;
    };
  }, [joinRoom, roomid]);

  useEffect(() => {
    socket.on("msgToClient", (message: Message): void => {
      setMsg([...msg, message]);
    });
  }, [msg]);

  const validate = (): boolean => {
    return (
      text.length > 0 &&
      window.sessionStorage.getItem("UserId") !== null &&
      window.sessionStorage.getItem("UserName") !== null
    );
  };

  const sendChatMessage = () => {
    if (validate()) {
      const message: Message = {
        id: uuidv4(),
        userid: window.sessionStorage.getItem("UserId") ?? "",
        user: window.sessionStorage.getItem("UserName") ?? "",
        room: "" + roomid,
        message: text,
      };

      sendMessage(message);
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
          onKeyPress={(event) => {
            event.key === "Enter" && sendChatMessage();
          }}
        />
      </ChatWrapper>
    </body>
  );
};

export default Roompage;
