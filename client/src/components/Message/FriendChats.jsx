import React, { useState, useEffect } from "react";
import Members from "./Members";
import "./mess.css";
import { useAuth } from "./../../AuthContext";

const FriendChats = ({ setActiveChat }) => {
  const { friends = [], activeChat } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
  }, [friends]);

  useEffect(() => {
    if (activeChat) {
      const activeIndex = friends.findIndex(friend => friend._id === activeChat._id);
      setSelectedIndex(activeIndex);
    }
  }, [activeChat, friends]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMemberClick = (friend, index) => {
    setSelectedIndex(index);
    setActiveChat(friend);
  };

  const filteredFriends = friends.filter((friend) =>
    friend.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='friend_chats_container'>
      {filteredFriends.map((friend, index) => (
        <div 
          key={friend._id} 
          onClick={() => handleMemberClick(friend, index)}
          className={selectedIndex === index ? 'selected' : ''}
        >
          <Members 
            fullName={friend.fullName} 
            avatarUrl={friend.avatarUrl} 
            index={index} 
            isSelected={index === selectedIndex} 
          />
        </div>
      ))}
    </div>
  );
};

export default FriendChats;
