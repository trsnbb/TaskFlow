import "./task_today.css";
import check from "./../../../img/icons/homePage/check.svg";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksForUser, selectUserTasks } from "../../../slices/task";
import { useAuth } from "../../../AuthContext";
import Modal from "./../../Modal/Modal";

const TaskToday = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth();
  const tasks = useSelector(selectUserTasks);
  const tasksStatus = useSelector((state) => state.tasks.tasks.status);
  const [filter, setFilter] = React.useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (user) {
      dispatch(fetchTasksForUser(user._id));
    }
  }, [dispatch, user]);

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div className='today_task'>
      <p className='title_today_task'>Сьогоднішні завдання</p>

      <div className='filter_today_task'>
        <div
          className='active_all filter_item'
          onClick={() => setFilter("all")}
        >
          Всі
          <div className='circle_count'>{tasks.length}</div>
        </div>
        <div className='filter_item' onClick={() => setFilter("in-progress")}>
          В процесі
          <div className='circle_count'>
            {tasks.filter((task) => task.status === "in-progress").length}
          </div>
        </div>
        <div className='filter_item' onClick={() => setFilter("new")}>
          Нове
          <div className='circle_count'>
            {tasks.filter((task) => task.status === "new").length}
          </div>
        </div>
        <div className='filter_item' onClick={() => setFilter("completed")}>
          Виконані
          <div className='circle_count'>
            {tasks.filter((task) => task.status === "completed").length}
          </div>
        </div>
        <div className='filter_item' onClick={() => setFilter("not-completed")}>
          Не виконані
          <div className='circle_count'>
            {tasks.filter((task) => task.status === "not-completed").length}
          </div>
        </div>
      </div>
      {!isAuthenticated && (
        <div className='text_auth'>
          <span
            onClick={openModal}
            style={{ cursor: "pointer" }}
            className='link_modal_auth'
          >
            Авторизуйтесь
          </span>
          , щоб побачити свої проєкти
        </div>
      )}
      {isAuthenticated && (
        <div className='task_list'>
          {tasksStatus === "loading" && <p>Завантаження завдань...</p>}


          {filteredTasks.map((task) => (
            <div className='task_item' key={task._id}>
              <div className='task'>
                <div
                  className={`circle_status ${
                    task.status === "completed"
                      ? "circle_task1"
                      : task.status === "in-progress"
                      ? "circle_task3"
                      : task.status === "new"
                      ? "circle_task4"
                      : ""
                  }`}
                >
                  {task.status === "completed" && (
                    <img src={check} alt='check' />
                  )}
                </div>
                {task.name}
              </div>
              <p
                className={`status_task ${
                  task.status === "completed"
                    ? ""
                    : task.status === "in-progress"
                    ? "status_task_yellow"
                    : "status_task_blue"
                }`}
              >
                {task.status === "completed"
                  ? "Схвалено"
                  : task.status === "in-progress"
                  ? "В процесі"
                  : "Нове"}
              </p>
            </div>
          ))}
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default TaskToday;
