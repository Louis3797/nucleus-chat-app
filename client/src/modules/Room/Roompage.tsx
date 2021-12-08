import { DefaultEventsMap } from "@socket.io/component-emitter";
import { NextRouter, useRouter } from "next/dist/client/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
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

import { SocketContext } from "../../context/socket";

// { userId: 4, user: "Fabienne", message: "Hi" },

const Roompage: React.FC = () => {
  // get global socket object from SocketContext
  const socket = useContext(SocketContext);

  const router: NextRouter = useRouter();
  const [msg, setMsg] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");

  // get roomid form query
  const { roomid } = router.query;

  // join the Room
  useEffect(() => {
    if (roomid !== "undefined") socket.emit("joinRoom", "" + roomid);
  }, [roomid, socket]);

  // get message everytime the Component renders new
  useEffect(() => {
    socket.on("msgToClient", (message: Message): void => {
      setMsg([...msg, message]);
    });
  }, [msg]);

  // validate user credentials and text length
  const validate = (): boolean => {
    return (
      text.length > 0 &&
      window.sessionStorage.getItem("UserId") !== null &&
      window.sessionStorage.getItem("UserName") !== null
    );
  };

  const sendChatMessage = () => {
    if (validate()) {
      // construct message object
      const message: Message = {
        id: uuidv4(),
        userid: window.sessionStorage.getItem("UserId") ?? "",
        user: window.sessionStorage.getItem("UserName") ?? "",
        room: "" + roomid,
        message: text,
      };

      // send message to server
      socket.emit("msgToServer", message);

      setText("");
    }
  };

  // map messages from msg state
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
