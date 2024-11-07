import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../AuthContext.js";
import { fetchSingleProject, renameProject } from "../../slices/project.js";
import Loading from "./../Project/CardProject/Loading.jsx";
import { useParams } from "react-router-dom";
import "./task.css";
import link from "./../../img/icons/task/link.svg";
import pencil from "./../../img/icons/task/pencil.svg";
import add_members from "./../../img/icons/task/add_members.svg";
import axios from "./../../axios.js";
import { IconContext } from "react-icons";
import { CiTrash } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { AvatarsGroup } from "./AvatarsGroup/AvatarsGroup.jsx";
import KanbanBoard from "./Kanban/KanbanBoard.jsx";

const Task = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const { singleProject, singleProjectStatus } = useSelector(
    (state) => state.project.project
  );

  const [isEditing, setIsEditing] = useState(false);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchSingleProject(projectId));
    }
  }, [dispatch, projectId, isAuthenticated]);

  useEffect(() => {
    if (singleProject) {
      setProjectName(singleProject.name);
    }
  }, [singleProject]);

  const handleRenameClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`/project/${projectId}`);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleNameSubmit = async () => {
    setIsEditing(false);

    try {
      await axios.patch(`/project/${projectId}`, {
        name: projectName,
      });

      dispatch(renameProject({ id: projectId, name: projectName }));
    } catch (error) {
      console.error("Error updating project name:", error);
    }
  };

  const handleBlur = () => {
    handleNameSubmit();
  };

  const isProjectLoading = singleProjectStatus === "loading";

  const getAvatars = () => {
    if (singleProject) {
      const allMembers = [
        singleProject.owner,
        singleProject.projectManager,
        ...(singleProject.members || []),
      ].filter(Boolean);

      const avatarUrls = allMembers.map(
        (member) =>
          `${axios.defaults.baseURL}${
            member.avatarUrl
          }?t=${new Date().getTime()}`
      );

      return avatarUrls;
    }
    return [];
  };

  return (
    <div className='container_task_project_page'>
      {isProjectLoading ? (
        <Loading />
      ) : singleProject ? (
        <>
          <div className='header_project_task'>
            <div className='title_icon'>
              {isEditing ? (
                <input
                  type='text'
                  value={projectName}
                  onChange={handleNameChange}
                  onBlur={handleBlur}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleNameSubmit();
                  }}
                  className='title_project_task_input'
                  autoFocus
                />
              ) : (
                <span id='project_name' className='title_project_task'>
                  {projectName}
                </span>
              )}
              <div className='icons_project_task'>
                <img
                  id='edit_button'
                  className='rename_project'
                  src={pencil}
                  alt='pencil'
                  onClick={handleRenameClick}
                />
                <button
                  className='button_delete_project'
                  onClick={() => {
                    handleDeleteClick();
                    navigate(`/tasks`);
                  }}
                >
                  <CiTrash />
                  Видалити
                </button>
              </div>
            </div>
            <div className='members_project'>
              <img
                src={add_members}
                alt='add_members'
                className='add_members_icon'
              />
              <div>Запросити</div>
              {singleProject && (
                <AvatarsGroup avatars={getAvatars()} maxVisible={4} />
              )}
            </div>
          </div>
          <KanbanBoard />
        </>
      ) : (
        <p>Проєкт не знайдено</p>
      )}
    </div>
  );
};

export default Task;
