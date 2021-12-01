import React from "react";

interface ChatBoxProps {
  children: React.ReactNode;
}
const ChatBox: React.FC<ChatBoxProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-full justify-start overflow-y-auto">
      <div className="space-y-4 w-full p-5">{children}</div>
    </div>
  );
};

export default ChatBox;
