import React, { useState } from "react";
import "./mess.css";
import pin_none from "./../../img/icons/message/pin_none.svg";
import back from "./../../img/icons/message/back.svg";
import add_file_chat from "./../../img/icons/message/add_file_chat.svg";
import MessageBlock from "./MessageBlock";
import axios from "./../../axios";
import Modal from "./../Modal/Modal";

const Chat = ({ activeChat, isAuthenticated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='chat_container'>
      {isAuthenticated ? (
        activeChat ? (
          <>
            <div className='header_chat'>
              <img src={back} alt='' />
              <div className='info_chat_header'>
                <img
                  className='avatar_chats_header'
                  src={`${axios.defaults.baseURL}${activeChat.avatarUrl}`}
                  alt='Avatar'
                />
                <p>{activeChat.fullName}</p>
              </div>
              <div className='icon_header_chat'>
                <img src={pin_none} alt='' style={{ cursor: "pointer" }} />
                <span className='more_header'>...</span>
              </div>
            </div>
            <div className='body_chat'>
              <MessageBlock messageText='Привіт' isUser={true} />
              <MessageBlock messageText='Привіт!' isUser={false} />
              <MessageBlock messageText='Як справи?' isUser={true} />
              <MessageBlock messageText='Чудово, а в тебе як?' isUser={false} />
              <MessageBlock
                messageText='Теж. Ось вчора Ху Тао вибила і Посох'
                isUser={true}
              />
              <MessageBlock
                messageText='Думала не встигну посох викрутити, але пощастило, випав до гаранту'
                isUser={true}
              />
              <MessageBlock
                messageText='Ооо, вітаю!! теж якраз кручу її. Поки не випала'
                isUser={false}
              />
              <MessageBlock
                messageText='Сподіваюсь і тобі пощастить!'
                isUser={true}
              />
              <MessageBlock messageText='Дякую' isUser={false} />
            </div>
            <div className='footer_chat'>
              <div className='write_wrapper'> Пишіть...</div>
              <img src={add_file_chat} alt='' />
            </div>
          </>
        ) : (
          <div className='no_chat_selected'>
            <p>Виберіть чат, щоб почати спілкування</p>
          </div>
        )
      ) : (
        <div className='not_authenticated'>
          <span
            onClick={openModal}
            style={{ cursor: "pointer" }}
            className='link_modal_auth'
          >
            Авторизуйтесь
          </span>
          , щоб розпочати
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Chat;
