import React from "react";
import ProjectItem from "./ProjectItem";

const ProjectsList = ({ projectsList }) => {
  if (projectsList.length === 0) {
    //TODO: no projects found to look nicely
    return <p>Np projects found</p>;
  }

  return (
    <div id="portfolio" className="container">
      <div className="row" id="parent">
        {projectsList.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;
