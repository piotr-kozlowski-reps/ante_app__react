import React from "react";

const ProjectItem = ({ project }) => {
  const { projNamePl } = project;

  return <li>{projNamePl}</li>;
};

export default ProjectItem;
