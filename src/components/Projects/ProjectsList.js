import React, { useRef, useLayoutEffect, useEffect } from "react";
import ProjectItem from "./ProjectItem";

import gsap from "gsap";

const ProjectsList = ({ projectsList }) => {
  const el = useRef();
  const query = gsap.utils.selector(el);

  const renderProjectsElements = (delay, duration) => {
    gsap.from(query(".box-outer"), {
      duration: duration,
      opacity: 0,
      x: 80,
      delay: delay,
      stagger: { amount: 0.3 },
    });
  };

  useLayoutEffect(() => {
    renderProjectsElements(1.2, 0.6);
  }, []);

  useEffect(() => {
    renderProjectsElements(0.5, 0.4);
  }, [projectsList]);

  if (projectsList.length === 0) {
    //TODO: no projects found to look nicely
    return <p>Np projects found</p>;
  }

  return (
    <div id="portfolio" className="container">
      <div className="row" id="parent" ref={el}>
        {projectsList.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;
