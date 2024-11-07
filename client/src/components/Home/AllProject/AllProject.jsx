import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject } from "../../../slices/project";
import "./all_project.css";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useAuth } from "../../../AuthContext";
import Modal from "./../../Modal/Modal";
import { format } from "date-fns";
import { uk } from "date-fns/locale";

Chart.register(ArcElement, Tooltip, Legend);

const AllProject = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.project.project);
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const userId = 1;
    dispatch(fetchProject(userId));
  }, [dispatch]);

  const truncate = (str, length = 25) => {
    if (str.length > length) {
      return str.slice(0, length) + "...";
    }
    return str;
  };

  const shortenMonth = (fullMonth) => {
    const monthMap = {
      січня: "січ.",
      лютого: "лют.",
      березня: "бер.",
      квітня: "квіт.",
      травня: "трав.",
      червня: "чер.",
      липня: "лип.",
      серпня: "серп.",
      вересня: "вер.",
      жовтня: "жовт.",
      листопада: "лист.",
      грудня: "груд.",
    };
    return monthMap[fullMonth] || fullMonth;
  };

  const formatWithShortMonths = (date) => {
    const formattedDate = format(date, "d MMMM yyyy", { locale: uk });
    const [day, month, year] = formattedDate.split(" ");
    return `${day} ${shortenMonth(month)} ${year}`;
  };

  const progress = (createdAt, deadline) => {
    const today = new Date();
    const createdDate = new Date(createdAt);
    const deadlineDate = new Date(deadline);

    const duration = deadlineDate - createdDate;
    const progressTime = today - createdDate;

    return Math.min((progressTime / duration) * 100, 100);
  };

  const options = {
    cutout: "75%",
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
    hover: {
      mode: null,
    },
  };

  return (
    <div className='all_project'>
      <p className='p_all_project'> Всі проєкти</p>
      {!isAuthenticated && (
        <>
          <div className='title_all_project'>
            <div className='name_project flex_gap'>
              <p>Назва</p>
            </div>
            <div className='subtitle_project'>
              <div className='manager_project no_stroke flex_gap'>
                <p>Проєкт - менедж.</p>
              </div>
              <div className='deadline_project no_stroke flex_gap'>
                <p>Дедлайн</p>
              </div>
              <div className='status_project no_stroke project_center_item flex_gap_status'>
                <p className='title_status'>Статус</p>
              </div>
              <div className='score_project no_stroke project_center_item'>
                <p className='title_score'>Прогрес</p>
              </div>
            </div>
          </div>
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
        </>
      )}
      {isAuthenticated && (
        <div className='title_all_project'>
          <div className='name_project flex_gap'>
            <p>Назва</p>
            {items.map((project) => (
              <p key={project.id} title={project.name}>
                {truncate(project.name)}
              </p>
            ))}
          </div>
          <div className='subtitle_project'>
            <div className='manager_project no_stroke flex_gap'>
              <p>Проєкт - менедж.</p>
              {items.map((project) => (
                <p key={project.id}>
                  {project.projectManager
                    ? project.projectManager.fullName
                    : "‏"}
                </p>
              ))}
            </div>
            <div className='deadline_project no_stroke flex_gap'>
              <p>Дедлайн</p>
              {items.map((project) => {
                const deadline = new Date(project.deadline);
                return (
                  <p key={project.id}>
                    {isNaN(deadline)
                      ? "Не вказано"
                      : formatWithShortMonths(deadline)}
                  </p>
                );
              })}
            </div>
            <div className='status_project no_stroke project_center_item flex_gap_status'>
              <p className='title_status'>Статус</p>
              {items.map((project) => {
                const projectProgress = progress(
                  project.createdAt,
                  project.deadline
                );

                return (
                  <p
                    key={project.id}
                    className={`item_status status_ ${
                      projectProgress > 94
                        ? "status_task_finish"
                        : projectProgress <= 35
                        ? "status_task_start"
                        : "status_task_in_progress"
                    }`}
                  >
                    {projectProgress > 94
                      ? "Фініш"
                      : projectProgress <= 35
                      ? "Почався"
                      : "Триває"}
                  </p>
                );
              })}
            </div>
            <div className='score_project no_stroke project_center_item'>
              <p className='title_score'>Прогрес</p>
              {items.map((project) => {
                const projectProgress = progress(
                  project.createdAt,
                  project.deadline
                );
                const data = {
                  datasets: [
                    {
                      data: [projectProgress, 100 - projectProgress],
                      backgroundColor: [
                        projectProgress > 94
                          ? "#1e902f"
                          : projectProgress <= 35
                          ? "#e5a906"
                          : "#da612d",
                        "#D6D8D6",
                      ],
                      borderWidth: 0,
                    },
                  ],
                };
                return (
                  <div className='item_score' key={project.id}>
                    <Doughnut data={data} options={options} />
                    <div className='text_center_score'>
                      {Math.round(projectProgress)}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default AllProject;
