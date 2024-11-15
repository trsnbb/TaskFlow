import React from "react";
import "./mess.css";
const MessageBlock = ({ messageText, isUser }) => {
  return (
    <div className={`mess_block ${isUser ? "user" : "other"}`}>
      {" "}
      {messageText} <span className='timestamp'>13:22</span>{" "}
    </div>
  );
};
export default MessageBlock;
