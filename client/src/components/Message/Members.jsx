import React from "react";
import "./mess.css";
import pin from "./../../img/icons/message/pin.svg";
import sent from "./../../img/icons/message/sent.svg";
import axios from "./../../axios";

const Members = ({ avatarUrl, fullName, index, isSelected }) => {
  return (
    <div className={`members_container ${isSelected ? "selected" : ""}`}>
      <img
        className='avatar_members'
        src={`${axios.defaults.baseURL}${avatarUrl}`}
        alt='Avatar'
      />
      <div className='info_members'>
        <div className='up_container_members'>
          <p className='members_name'>{fullName}</p>
          <div className='icon_and_time_members'>
            {index < 3 && <img src={sent} alt='sent' />}
            <span>14.22</span>
          </div>
        </div>
        <div className='down_container_members'>
          <p>Останній текст</p>
          <img src={pin} alt='pin' />
        </div>
      </div>
    </div>
  );
};

export default Members;
