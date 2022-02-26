import PropTypes from "prop-types";

import PanoramaLink from "./PanoramaLink";

const ProjectShowcasePanorama = ({ lang, panoramas }) => {
  ////jsx
  return (
    <div id="project-site" className="container">
      <div className="row">
        <div className="col-lg-12">
          <div id="portfolio">
            <div className="row" id="parent">
              {panoramas.map((panorama) => (
                <PanoramaLink
                  key={panorama.panoramaTitleEn}
                  panoramaIco={panorama.panoramaIcoFull}
                  panoramaTitle={
                    lang === "pl"
                      ? panorama.panoramaTitlePl
                      : panorama.panoramaTitleEn
                  }
                  lang={lang}
                  panoramaImageSource={panorama.panoramaImageSourceFull}
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
      panoramaTitlePl: PropTypes.string,
      panoramaTitleEn: PropTypes.string,
      panoramaIcoFull: PropTypes.string,
      panoramaIcoThumb: PropTypes.string,
      panoramaImageSourceFull: PropTypes.string,
      panoramaImageSourceFullThumb: PropTypes.string,
      id: PropTypes.string,
      _id: PropTypes.string,
    })
  ),
};

export default ProjectShowcasePanorama;

//TODO: lang to do
