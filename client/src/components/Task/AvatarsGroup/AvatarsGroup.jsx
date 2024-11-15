import React from "react";
import "./avatarsGroup.css";

const AvatarsGroup = ({ avatars = [], maxVisible = 4 }) => {
  const visibleAvatars = avatars.slice(0, maxVisible);
  const extraAvatarsCount = avatars.length - maxVisible;
  return (
    <div className='avatars-group'>
      {" "}
      {visibleAvatars.map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt={`Avatar ${index + 1}`}
          className='avatar'
          style={{ zIndex: maxVisible - index }}
        />
      ))}{" "}
      {extraAvatarsCount > 0 && (
        <div className='avatar_extra'>+{extraAvatarsCount}</div>
      )}{" "}
    </div>
  );
};


const AvatarsGroupForTask = ({ avatars = [], maxVisible = 4 }) => {
  const visibleAvatars = avatars.slice(0, maxVisible);
  const extraAvatarsCount = avatars.length - maxVisible;

  return (
    <div className='avatars_group_task'>
      {visibleAvatars.map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt={`Avatar ${index + 1}`}
          className='avatar_tasks'
          style={{ zIndex: maxVisible - index }}
        />
      ))}
      {extraAvatarsCount > 0 && (
        <div className='avatar_extra_tasks'>+{extraAvatarsCount}</div>
      )}
    </div>
  );
};

export { AvatarsGroupForTask, AvatarsGroup };
