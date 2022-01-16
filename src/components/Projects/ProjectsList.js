import React, { useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import PropTypes from "prop-types";

import ProjectItem from "./ProjectItem";
import Button from "../../shared/components/Button";

const ProjectsList = ({
  projectsList,
  lang,
  onClick,
  isShowMoreButtonShown,
}) => {
  const el = useRef();
  // const query = gsap.utils.selector(el);

  // const renderProjectsElements = (delay, duration) => {
  //   gsap.from(query(".box-outer"), {
  //     duration: duration,
  //     opacity: 0,
  //     x: 80,
  //     delay: delay,
  //     stagger: { amount: 0.3 },
  //   });
  // };

  // useLayoutEffect(() => {
  //   renderProjectsElements(1.2, 0.6);
  // }, []);

  // useEffect(() => {
  //   renderProjectsElements(0.5, 0.4);
  // }, [projectsList]);

  if (projectsList.length === 0) {
    //TODO: no projects found to look nicely
    return <p>Np projects found</p>;
  }

  return (
    <div id="portfolio" className="container">
      <div className="row" id="parent" ref={el}>
        {projectsList.map((project) => (
          <ProjectItem key={project.id} project={project} lang={lang} />
        ))}
      </div>
      <div className="text-center">
        {isShowMoreButtonShown && (
          <Button onClick={onClick} additionalClass="see-more-button">
            {lang === "pl" ? "ZOBACZ WIĘCEJ" : "SEE MORE"}
          </Button>
        )}
      </div>
    </div>
  );
};

ProjectsList.propTypes = {
  projectsList: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      projName: PropTypes.string,
      completionDate: PropTypes.instanceOf(Date),
      city: PropTypes.string,
      country: PropTypes.string,
      icoImg: PropTypes.string,
    })
  ).isRequired,
  lang: PropTypes.oneOf(["pl", "en"]).isRequired,
  onClick: PropTypes.func,
  isShowMoreButtonShown: PropTypes.bool,
};

export default ProjectsList;
