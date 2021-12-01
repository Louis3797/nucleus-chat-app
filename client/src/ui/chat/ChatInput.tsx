import React, { forwardRef } from "react";

interface ChatInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onClick: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onClick, ...props }) => {
  return (
    <div className="flex flex-row w-full justify-center items-center bg-primary-10">
      <input
        {...props}
        type="text"
        className="w-full max-w-2xl p-2 bg-primary-600 placeholder-primary-700 text-accent mb-5 mt-4 rounded-lg focus:outline-none font-medium"
        placeholder="Write a message..."
      />
      <button
        className="p-2 ml-2 rounded-full bg-secondary hover:bg-secondary-600 disabled:bg-primary-700"
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          viewBox="0 0 24 24"
          width="20"
          className="fill-current stroke-1 text-button"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M13 19V7.83l4.88 4.88c.39.39 1.03.39 1.42 0 .39-.39.39-1.02 0-1.41l-6.59-6.59c-.39-.39-1.02-.39-1.41 0l-6.6 6.58c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L11 7.83V19c0 .55.45 1 1 1s1-.45 1-1z" />
        </svg>
      </button>
    </div>
  );
};

export default ChatInput;
