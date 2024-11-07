import "./style_home.css";
import TaskToday from "./TaskToday/TaskToday.jsx";
import AllProject from "./AllProject/AllProject.jsx";
import Achievement from "./Achievement/Achievement.jsx";
import Diagram from "./Diagram/diagram.jsx";

const Home = () => {
  return (
    <div className='container_home'>
      <div className='container_project_diagram'>
        <div className='container_project'>
          <TaskToday />
          <AllProject />
        </div>
        <Diagram/>
      </div>
      <Achievement />
    </div>
  );
};

export default Home;
