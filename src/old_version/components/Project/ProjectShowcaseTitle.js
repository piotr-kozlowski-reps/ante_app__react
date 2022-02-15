import React from "react";
import PropTypes from "prop-types";

const ProjectShowcaseTitle = ({
  lang,
  projName,
  year,
  city,
  country,
  client,
}) => {
  return (
    <div className="col-lg-12">
      <div className="project-desc">
        <p>{lang === "pl" ? "co/" : "what/"}</p>
        <h2>{projName}</h2>
        <p>{lang === "pl" ? "kiedy/gdzie/" : "when/where/"}</p>
        <h3>
          {year} / {city} [{country}]
        </h3>
        <p>{lang === "pl" ? "dla/" : "for/"}</p>
        <h4>{client}</h4>
      </div>
    </div>
  );
};

ProjectShowcaseTitle.propTypes = {
  lang: PropTypes.oneOf(["pl", "en"]),
  projName: PropTypes.string,
  year: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  client: PropTypes.string,
};

export default ProjectShowcaseTitle;

//TODO: check if everything is well rendered depending on language and props passed
