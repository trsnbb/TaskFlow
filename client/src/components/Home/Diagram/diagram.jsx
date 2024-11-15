import "./diagram.css";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { fetchTasksForUser, selectUserTasks } from "../../../slices/task";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../AuthContext";
import React, { useEffect } from "react";

Chart.register(ArcElement, Tooltip, Legend);

const Diagram = () => {
  const tasks = useSelector(selectUserTasks);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;
  const notComletedTasks = tasks.filter((task) => task.status === "new").length;

  useEffect(() => {
    if (user) {
      dispatch(fetchTasksForUser(user._id));
    }
  }, [dispatch, user]);

  const data = {
    datasets: [
      {
        data: [completedTasks, inProgressTasks, notComletedTasks],
        backgroundColor: ["#7EB085", "#F4D88B", "#F69A73"],
        cutout: 90,
      },
    ],
  };
  const options = {
    plugins: {
      tooltip: {},
      legend: {
        display: false,
      },
    },

    elements: {
      arc: {
        borderColor: "#EDF0EC",
        borderRadius: 10,
      },
    },
    hover: {
      mode: null,
    },
  };

  return (
    <div className='diagram'>
      <div className='title_container'>
        <p className='title_diagram'>Ваші завдання</p>
        <line className='line_diagram'></line>
      </div>

      <div className='chart_container'>
        {!isAuthenticated && <div className='diagram_not_auth'></div>}

        {isAuthenticated && <Doughnut data={data} options={options} />}
        <div className='chart_center_text'>{totalTasks}</div>
      </div>
      <div className='custom_legend'>
        <div className='legend_item'>
          <div className='legend_circle legend_completed'></div>
          Виконані
        </div>
        <div className='legend_item'>
          <div className='legend_circle legend_process'></div>В процесі
        </div>
        <div className='legend_item '>
          <div className='legend_circle legend_not_completed'></div>
          Не виконані
        </div>
      </div>
    </div>
  );
};

export default Diagram;
