import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import PanoramaLink from "./PanoramaLink";
import Modal from "../../shared/components/Modal";

const ProjectShowcasePanorama = ({ lang, panoramas }) => {
  return (
    <div id="project-site" className="container">
      <div className="row">
        <div className="col-lg-12">
          <div id="portfolio">
            <div className="row" id="parent">
              {panoramas.map((panorama) => (
                <PanoramaLink
                  key={panorama.panoramaTitle}
                  panoramaIco={panorama.panoramaIco}
                  panoramaTitle={panorama.panoramaTitle}
                  lang={lang}
                  panoramaImageSource={panorama.panoramaImageSource}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectShowcasePanorama.propTypes = {
  lang: PropTypes.oneOf(["pl", "en"]),
  panoramas: PropTypes.arrayOf(
    PropTypes.exact({
      panoramaTitle: PropTypes.string,
      panoramaIco: PropTypes.string,
      panoramaImageSource: PropTypes.string,
    })
  ),
};

export default ProjectShowcasePanorama;
