import React, { useState, useEffect } from "react";
import CardProject from "./CardProject/CardProject.jsx";
import "./project.css";
import CreateCardProject from "./CardProject/CreateCardProject.jsx";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./CardProject/Loading.jsx";
import { useAuth } from "../../AuthContext.js";
import Modal from "../Modal/Modal.jsx";
import { useNavigate } from "react-router-dom";

const Project = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth();
  const { project } = useSelector((state) => state.project);
  const isProjectLoading = project.status === "loading";
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {}, [dispatch, user, project.items.length]);

  return (
    <>
      {!isAuthenticated && (
        <div className="text_auth">
          <span onClick={openModal} style={{ cursor: "pointer" }} className="link_modal_auth">
            Авторизуйтесь
          </span>
          , щоб побачити свої проєкти
        </div>
      )}
      {isAuthenticated && (
        <div className='container_task_page'>
          <p className='title_task_page'>
            Оберіть проєкт, щоб переглянути свої завдання:
          </p>
          <div className='grid_container'>
            {isProjectLoading ? null : <CreateCardProject />}

            {isProjectLoading ? (
              <Loading />
            ) : (
              project.items.map((project, index) => (
                <div key={index} onClick={() => navigate(`/tasks/${project._id}`)} style={{ cursor: "pointer" }}>
                  <CardProject
                    title={project.name}
                    color={project.color}
                    description={project.description} 
                  />
                </div>
              ))
            )}
          </div>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Project;
