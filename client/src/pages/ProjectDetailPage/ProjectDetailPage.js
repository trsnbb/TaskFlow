import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Task from "../../components/Task/Task";

const ProjectDetailPage = () => {
  return (
    <>
      <Header />
      <div className="navbar-wrapper">
        <Navbar />
      </div>
      <div className="main-content">
        <Task />
      </div>
    </>
  );
};

export default ProjectDetailPage;
