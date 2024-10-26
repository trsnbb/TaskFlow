import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./style_nav.css";

import icon_home from "./../../img/icons/navbar/icon_home.svg";
import icon_message from "./../../img/icons/navbar/icon_message.svg";
import icon_task from "./../../img/icons/navbar/icon_task.svg";
import icon_friend from "./../../img/icons/navbar/icon_friend.svg";
import icon_seting from "./../../img/icons/navbar/icon_seting.svg";
import add_project from "./../../img/icons/navbar/add-square.svg";

import { useDispatch, useSelector } from "react-redux"; 
import { fetchTask } from "../../slices/tasks";

const Navbar = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const isTaskLoading = tasks.status === "loading";

  React.useEffect(() => {
    dispatch(fetchTask());
  }, [dispatch]);

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
          <NavLink to='/messages' className='item_navigation' activeClassName='active'>
            <div className='icons_navigation'>
              <img src={icon_message} alt='icon message' />
            </div>
            Повідомлення
          </NavLink>
          <NavLink to='/tasks' className='item_navigation' activeClassName='active'>
            <div className='icons_navigation'>
              <img src={icon_task} alt='icon task' />
            </div>
            Мої завдання
          </NavLink>
          <NavLink to='/friends' className='item_navigation' activeClassName='active'>
            <div className='icons_navigation'>
              <img src={icon_friend} alt='icon friend' />
            </div>
            Друзі
          </NavLink>
          <NavLink to='/settings' className='item_navigation' activeClassName='active'>
            <div className='icons_navigation'>
              <img src={icon_seting} alt='icon settings' />
            </div>
            Налаштування
          </NavLink>
        </div>
      </div>

      <div className='navigation_project'>
        <div className='title_project'>
          Мої проєкти
          <img src={add_project} alt='add project' />
        </div>
        <div className='my_project'>
          {(isTaskLoading ? [...Array(4)] : tasks.items).map((project, index) =>
            isTaskLoading ? (
              <div key={index} className='project'>
                <div className={`circle circle${index + 1}`}></div>
                Завантаження...
              </div>
            ) : (
              <div key={index} className='project'>
                <div className={`circle circle${index + 1}`}></div>
                {project.name || "Без назви"}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
