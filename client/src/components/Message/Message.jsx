import React from "react";
import FriendChats from "./FriendChats";
import Chat from "./Chat";
import { useAuth } from "./../../AuthContext";

const Message = () => {
  const { isAuthenticated, activeChat, setActiveChat } = useAuth();

  return (
    <div className='container_mess'>
      <FriendChats setActiveChat={setActiveChat} />
      <Chat activeChat={activeChat} isAuthenticated={isAuthenticated} />
    </div>
  );
};

export default Message;
