import React from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Project from "../../components/Project/Project";

const TaskPage = () => {
  return (
    <>
    <Header />
      <div className="navbar-wrapper">
        <Navbar />
      </div>
      <div className="main-content">
        <Project />
      </div>
    </>
  );
};

export default TaskPage;
