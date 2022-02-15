import React, { Fragment, useState } from "react";
import genre from "../shared/utils/genre";
import type from "../shared/utils/type";
import { useSelector } from "react-redux";
import { format } from "date-fns";

import ProjectShowcaseTitle from "../components/Project/ProjectShowcaseTitle";
import ProjectShowcaseImage from "../components/Project/ProjectShowcaseImage";
import ProjectShowcaseVideo from "../components/Project/ProjectShowcaseVideo";
import ProjectShowcaseApp from "../components/Project/ProjectShowcaseApp";
import Footer from "../shared/components/Footer";
import ProjectShowcasePanorama from "../components/Project/ProjectShowcasePanorama";

////temporary
import { DUMMY_PROJECT_PANORAMA } from "../shared/utils/data-models";

const ProjectShowcase = () => {
  ////vars
  const [project, setProject] = useState(DUMMY_PROJECT_PANORAMA);

  const lang = useSelector((state) => state.language.lang);
  const projectsGenre = project.genre;

  ////jsx
  return (
    <Fragment>
      <div id="project-site" className="container">
        <div className="row">
          <div className="col-lg-12">
            <ProjectShowcaseTitle
              lang={lang}
              projName={lang === "pl" ? project.projNamePl : project.projNameEn}
              year={format(project.completionDate, "yyyy")}
              city={lang === "pl" ? project.cityPl : project.cityEn}
              country={lang === "pl" ? project.countryPl : project.countryEn}
              client={lang === "pl" ? project.clientPl : project.clientEn}
            />

            {projectsGenre === genre.GRAPHIC && (
              <div className="img-gallery">
                {project.images.map((image) => (
                  <ProjectShowcaseImage
                    key={image.imageSource}
                    imageSource={image.imageSource}
                    imageAlt={
                      lang === "pl"
                        ? `${format(project.completionDate, "MM.yyyy")}r. ${
                            project.projNamePl
                          }, ${project.cityPL}. Kraj: ${project.countryPL}. ${
                            image.imageAltPl
                          }`
                        : `${format(project.completionDate, "LLLL, yyyy")}. ${
                            project.projNameEn
                          }, ${project.cityEn}. Country: ${
                            project.countryEn
                          }. ${image.imageAltEn}`
                    }
                    isBig={image.isBig}
                  />
                ))}
              </div>
            )}

            {projectsGenre === genre.ANIMATION && (
              <div className="img-gallery">
                <ProjectShowcaseVideo videoSource={project.videoSource} />
              </div>
            )}

            {project.genre === genre.APP && (
              <ProjectShowcaseApp
                lang={lang}
                appName={
                  lang === "pl"
                    ? project.appInfo.appNamePl
                    : project.appInfo.appNameEn
                }
                appImage={project.appInfo.appImage}
                appDescription={
                  lang === "pl"
                    ? project.appInfo.appDescriptionPl
                    : project.appInfo.appDescriptionEn
                }
                appAndroidLink={project.appInfo.appAndroidLink}
                appIOSLink={project.appInfo.appIOSLink}
              />
            )}

            {project.genre === genre.PANORAMA && (
              <ProjectShowcasePanorama
                lang={lang}
                panoramas={project.panoramas}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default ProjectShowcase;
