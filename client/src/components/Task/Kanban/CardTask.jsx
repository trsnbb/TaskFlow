import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import axios from "./../../../axios";
import "./card-task.css";
import failik_task from "./../../../img/icons/task/failik_task.svg";
import { AvatarsGroupForTask } from "./../AvatarsGroup/AvatarsGroup";

const CardTask = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const truncate = (str, length = 53) => {
    if (str.length > length) {
      return str.slice(0, length) + "...";
    }
    return str;
  };
  const [avatarUrls, setAvatarUrls] = useState([]);

  useEffect(() => {
    const urls = task.assignedUsers.map(user => {
      return `${axios.defaults.baseURL}${user.avatarUrl}?t=${new Date().getTime()}`;
    });
    setAvatarUrls(urls);
  }, [task.assignedUsers]);

  return (
    <div ref={drag} className={`card-task ${isDragging ? "dragging" : ""}`}>
      <div className='card_body'>
        <div className='header_task_card'>
          <span
            className={
              task.status === "completed"
                ? "priority_completed"
                : task.priority === "low"
                ? "priority_low"
                : "priority_high"
            }
          >
            {task.status === "completed"
              ? "Виконано"
              : task.priority === "low"
              ? "Низька"
              : "Висока"}
          </span>
          <p className='dot_menu'>...</p>
        </div>
        <div className='task_info'>
          <h3 className='task_name'>{task.name}</h3>
          <p className='task_text'>{truncate(task.textTask)}</p>
        </div>

        <div className='card_footer'>
          <div className='avatar_members_task'>
            <AvatarsGroupForTask avatars={avatarUrls} />
          </div>
          <div className='addition'>
            <img src={failik_task} alt='failik'></img>
            {task.filesURL && task.filesURL.length > 0
              ? `${task.filesURL.length} ${
                  task.filesURL.length === 1
                    ? "файл"
                    : task.filesURL.length > 1 && task.filesURL.length < 5
                    ? "файли"
                    : "файлів"
                }`
              : "0 файлів"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTask;
