import React from "react";
import ProjectItem from "./ProjectItem";

const ProjectsList = ({ projectsList }) => {
  if (projectsList.length === 0) {
    //TODO: no projects found to look nicely
    return <p>Np projects found</p>;
  }

  return (
    <ul>
      {projectsList.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </ul>
  );
};

export default ProjectsList;
