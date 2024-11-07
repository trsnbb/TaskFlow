import React from "react";
import "./card-project.css";

const ProjectCard = (props) => {
  return (
    <>
      <div className="container_card">
        <div
          className="line_color_project"
          style={{ backgroundColor: props.color }}
        ></div>
        <span>{props.title}</span>
        <p>{props.description}</p>
      </div>
    </>
  );
};

export default ProjectCard;
