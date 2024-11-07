import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import Task from "./CardTask";
import add_task from "./../../../img/icons/task/add_task.svg";
import axios from "./../../../axios";
import { useLocation } from "react-router-dom";
import "./card-task.css";
import "./../../Project/CardProject/card-project.css";

const Column = ({ column, tasks, onTaskDrop }) => {
  const location = useLocation();
  const projectId = location.pathname.split("/")[2];

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => onTaskDrop(item.id, column.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const getCircleClass = () => {
    switch (column.title) {
      case "Нове":
        return "circle_status new";
      case "В процесі":
        return "circle_status in-progress";
      case "Виконано":
        return "circle_status completed";
      default:
        return "circle_status";
    }
  };

  const getBorderClass = () => {
    switch (column.title) {
      case "Нове":
        return "title_block border_new";
      case "В процесі":
        return "title_block border_in-progress";
      case "Виконано":
        return "title_block border_completed";
      default:
        return "title_block";
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateTask = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newTask = {
      name: formData.get("name"),
      textTask: formData.get("textTask"),
      priority: formData.get("priority"),
      project_id: projectId,
    };


    try {
      const response = await axios.post(
        `/${newTask.project_id}/tasks`,
        newTask
      );
      onTaskDrop(response.data);
    } catch (error) {
      console.error(
        "Error creating task:",
        error.response ? error.response.data : error
      );
    } finally {
      handleCloseModal();
    }
  };

  const Modal = ({ isOpen, onClose }) => {
    useEffect(() => {
      if (isOpen) document.body.classList.add("no-scroll");
      else {
        document.body.classList.remove("no-scroll");
      }

      return () => {
        document.body.classList.remove("no-scroll");
      };
    }, [isOpen]);
    useEffect(() => {
      if (isOpen) document.body.classList.add("no-scroll");
      else {
        document.body.classList.remove("no-scroll");
      }

      return () => {
        document.body.classList.remove("no-scroll");
      };
    }, [[isOpen]]);
    if (!isOpen) return null;
    return (
      <div className='modal_overlay' onClick={onClose}>
        <div className='modal_content' onClick={(e) => e.stopPropagation()}>
          <h2>Добавити завдання</h2>
          <form onSubmit={handleCreateTask}>
            <input
              type='text'
              placeholder='Тема завдання'
              name='name'
              required
            />
            <textarea
              placeholder='Опис завдання'
              name='textTask'
              required
            ></textarea>
            <div className='select_input'>
              <label htmlFor='priority'>Приоритетність</label>
              <select name='priority' required>
                <option value='low'>Низька</option>
                <option value='high'>Висока</option>
              </select>
            </div>

            <button type='submit'>Відправити</button>
          </form>
          <span onClick={onClose}>&times;</span>
        </div>
      </div>
    );
  };

  return (
    <>
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={handleCloseModal} />}
      <div ref={drop} className={`column ${isOver ? "over" : ""}`}>
        <div className={getBorderClass()}>
          <div className='title_block'>
            <div className={getCircleClass()}></div>
            <h2>{column.title}</h2>
            <div className='circle_count'>
              {tasks.filter((task) => task.status === "new").length ||
                tasks.filter((task) => task.status === "completed").length ||
                tasks.filter((task) => task.status === "in-progress").length}
            </div>
          </div>
          <div>
            {column.title === "Нове" && (
              <img
                src={add_task}
                alt='Add Task'
                className='add_task_icon'
                onClick={handleOpenModal}
              />
            )}
          </div>
        </div>
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </div>
    </>
  );
};

export default Column;