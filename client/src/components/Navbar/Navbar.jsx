import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./style_nav.css";

import icon_home from "./../../img/icons/navbar/icon_home.svg";
import icon_message from "./../../img/icons/navbar/icon_message.svg";
import icon_task from "./../../img/icons/navbar/icon_task.svg";
import icon_friend from "./../../img/icons/navbar/icon_friend.svg";
import icon_seting from "./../../img/icons/navbar/icon_seting.svg";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject } from "../../slices/project";
import { useAuth } from "./../../AuthContext.js";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const { project } = useSelector((state) => state.project);
  const isProjectLoading = project.status === "loading";

  useEffect(() => {
    if (user && !project.items.length) {
      dispatch(fetchProject(user._id));
    }
  }, [dispatch, user, project.items.length]);

  return (
    <div className='wrapper'>
      <div className='navigation_wrapper'>
        <div className='navigation'>
          <NavLink to='/' className='item_navigation' activeClassName='active'>
            <div className='icons_navigation'>
              <img src={icon_home} alt='icon home' />
            </div>
            Головна
          </NavLink>
          <NavLink
            to='/messages'
            className='item_navigation'
            activeClassName='active'
          >
            <div className='icons_navigation'>
              <img src={icon_message} alt='icon message' />
            </div>
            Повідомлення
          </NavLink>
          <NavLink
            to='/tasks'
            className='item_navigation'
            activeClassName='active'
          >
            <div className='icons_navigation'>
              <img src={icon_task} alt='icon task' />
            </div>
            Мої проєкти
          </NavLink>
          <NavLink
            to='/friends'
            className='item_navigation'
            activeClassName='active'
          >
            <div className='icons_navigation'>
              <img src={icon_friend} alt='icon friend' />
            </div>
            Друзі
          </NavLink>
          <NavLink
            to='/settings'
            className='item_navigation'
            activeClassName='active'
          >
            <div className='icons_navigation'>
              <img src={icon_seting} alt='icon settings' />
            </div>
            Налаштування
          </NavLink>
        </div>
      </div>

      <div className='navigation_project'>
        <div className='title_project'>
          <NavLink to='/tasks'>
            <p className='title_project_nav'>
            Мої проєкти
        
            </p>
          </NavLink>
        </div>
        <div className='my_project'>
          {isProjectLoading ? (
            <div>Загрузка</div>
          ) : (
            project.items.map((project, index) => (
              <div
                key={index}
                className={`project ${
                  project._id === projectId ? "active_project" : ""
                }`}
                onClick={() => {
                  const newUrl = `/tasks/${project._id}`;
                  navigate(newUrl);
                }}
                style={{ cursor: "pointer" }}
              >
                <div
                  className='circle'
                  style={{ backgroundColor: project.color }}
                ></div>
                <span className='project_name'>{project.name}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
