import React from "react";

interface ChatWrapperProps {
  children: React.ReactNode;
}

const ChatWrapper: React.FC<ChatWrapperProps> = ({ children }) => {
  return (
    <div className="flex flex-col space-y-4 p-3 max-w-5xl w-4/6 h-screen  justify-between overflow-y-auto bg-primary">
      {children}
    </div>
  );
};

export default ChatWrapper;
