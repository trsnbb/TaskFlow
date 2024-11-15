import React from 'react';
import "./achievement.css";

import task_completed from "./../../../img/icons/homePage/achiv/task_completed.svg";
import all_project_achiv from "./../../../img/icons/homePage/achiv/all_project_achiv.svg";
import help_achiv from "./../../../img/icons/homePage/achiv/help_achiv.svg";
import self_achiv from "./../../../img/icons/homePage/achiv/self_achiv.svg";
import { useAuth } from "../../../AuthContext";

const Achievement = () => {
  const { isAuthenticated, user } = useAuth();
  
  const completedTaskCount = isAuthenticated ? user.completedTaskCount : 0;
  const completedProjectsCount = isAuthenticated ? user.completedProjectsCount : 0;
  const involvedProjectsCount = isAuthenticated ? user.involvedProjectsCount : 0;
  const createdOrAdminProjectsCount = isAuthenticated ? user.createdOrAdminProjectsCount : 0;

  return (
    <div className='achievement'>
      <div className='all_task_completed'>
        <img src={task_completed} alt='task_completed' />
        Всі виконані завдання
        <line className='line_achievement'></line>
        <div className='count_achievement'>{completedTaskCount}</div>
      </div>
      <div className='all_task_completed'>
        <img src={all_project_achiv} alt='all_project_achiv' />
        Загалом проєктів
        <line className='line_achievement'></line>
        <div className='count_achievement'>{completedProjectsCount}</div>
      </div>
      <div className='all_task_completed'>
        <img src={help_achiv} alt='help_achiv' />
        Допомога учасникам
        <line className='line_achievement'></line>
        <div className='count_achievement'>{involvedProjectsCount}</div>
      </div>
      <div className='all_task_completed'>
        <img src={self_achiv} alt='self_achiv' />
        Власні проєкти
        <line className='line_achievement'></line>
        <div className='count_achievement'>{createdOrAdminProjectsCount}</div>
      </div>
    </div>
  );
};

export default Achievement;
