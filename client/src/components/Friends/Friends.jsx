import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./../../axios";
import { useAuth } from "./../../AuthContext";
import "./friends.css";
import search from "./../../img/icons/header/search.svg";
import message from "./../../img/icons/friends/message.svg";
import deleteIco from "./../../img/icons/friends/deleteIco.svg";

const Friends = () => {
  const { friends = [], deleteFriend, setActiveChat } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
  }, [friends]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFriends = friends.filter((friend) =>
    friend.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMessageClick = (friend) => {
    setActiveChat(friend);
    navigate("/messages");
  };

  return (
    <div className='container_friends'>
      <p className='title_friends'>Друзі</p>
      <div className='search_friends'>
        <img src={search} alt='icon search' className='search_friends_icon' />
        <input
          type='text'
          className='search_input'
          placeholder='Пошук...'
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {friends.length === 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            fontSize: "20px",
            fontWeight: "900",
            gap: "40px",
            marginTop: "40px",
          }}
        >
          У мене немає друзів, немає друзів...
          <iframe
            style={{ borderRadius: "12px" }}
            src='https://open.spotify.com/embed/track/17MNf6d2pIm69u3ggB7ZMo?utm_source=generator&theme=0'
            width='70%'
            height='352'
            allowFullScreen=''
            allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            loading='lazy'
          ></iframe>
        </div>
      ) : filteredFriends.length > 0 ? (
        <div className='friends_list'>
          {filteredFriends.map((friend) => (
            <div key={friend._id}>
              <div className='friend_item'>
                <div className='friend_info_block'>
                  <div className='avatar_friend'>
                    {friend.avatarUrl ? (
                      <img
                        src={`${axios.defaults.baseURL}${friend.avatarUrl}`}
                        alt='Avatar'
                        className='avatar_image'
                      />
                    ) : (
                      <div className='avatar_placeholder'></div>
                    )}
                  </div>
                  <div className='info_about_block'>
                    <h3 className='name_friends'>{friend.fullName}</h3>
                    <p className='description_friends'>{friend.description}</p>
                  </div>
                </div>
                <div className='container_btn_friend'>
                  <button onClick={() => handleMessageClick(friend)}>
                    Написати
                    <img src={message} alt='Написати' />
                  </button>
                  <button onClick={() => deleteFriend(friend._id)}>
                    Видалити
                    <img src={deleteIco} alt='Видалити' />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='not_found'>Результатів немає...</div>
      )}
    </div>
  );
};

export default Friends;
