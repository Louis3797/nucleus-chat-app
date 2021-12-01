import React from "react";

interface MessageBubbleProps {
  name: string;
  message: string;
}

export const MessageBubbleRight: React.FC<MessageBubbleProps> = ({
  name,
  message,
}) => {
  return (
    <div className="flex justify-end">
      <div className="flex flex-col break-words pl-4 pr-10 max-w-md w-auto py-2 text-left rounded-xl rounded-br-none bg-secondary">
        <p className="text-sm text-accent font-bold mb-1">{name}</p>
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
};

export const MessageBubbleLeft: React.FC<MessageBubbleProps> = ({
  name,
  message,
}) => {
  return (
    <div className="flex justify-start">
      <div className="flex flex-col break-words pl-4 pr-10 max-w-md w-auto py-2 text-left rounded-xl rounded-bl-none bg-primary-600">
        <p className="text-sm text-accent font-bold mb-1">{name}</p>
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
};
