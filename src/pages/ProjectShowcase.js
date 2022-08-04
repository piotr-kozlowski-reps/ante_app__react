import React, { Fragment, useState, useEffect } from "react";
import genre from "../shared/utils/genre";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useParams } from "react-router-dom";

import ProjectShowcaseTitle from "../components/Project/ProjectShowcaseTitle";
import ProjectShowcaseImage from "../components/Project/ProjectShowcaseImage";
import ProjectShowcaseVideo from "../components/Project/ProjectShowcaseVideo";
import ProjectShowcaseApp from "../components/Project/ProjectShowcaseApp";
import ProjectShowcasePanorama from "../components/Project/ProjectShowcasePanorama";
import ProjectShowcaseFooter from "../components/Project/ProjectShowcaseFooter";
import ErrorModal from "../shared/components/ErrorModal";
import LoadingSpinner from "../shared/components/LoadingSpinner";
import { motion } from "framer-motion";
import { containerVariants } from "../shared/utils/framerMotionAnimationsVariants";

const ProjectShowcase = () => {
  ////vars
  const [project, setProject] = useState({});
  const lang = useSelector((state) => state.language.lang);
  const params = useParams();
  const projectId = params.projectId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //fetch project
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}api/projects/${projectId}`
        );
        setProject(responseData.project);
        // console.log(responseData.project);
      } catch (error) {}
    };
    fetchProject();
  }, [sendRequest, projectId]);

  const isProjectFetched = Object.keys(project).length > 0;
  const projectsGenre = project.genre;
  const projectDateAsObject = new Date(project.completionDate);

  ////jsx
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {isProjectFetched && (
        <div id="project-site" className="container">
          <div className="row">
            <div className="col-lg-12">
              <ProjectShowcaseTitle
                lang={lang}
                projName={
                  lang === "pl" ? project.projNamePl : project.projNameEn
                }
                year={format(projectDateAsObject, "yyyy")}
                city={lang === "pl" ? project.cityPl : project.cityEn}
                country={lang === "pl" ? project.countryPl : project.countryEn}
                client={lang === "pl" ? project.clientPl : project.clientEn}
              />

              {projectsGenre === genre.GRAPHIC && (
                <div className="img-gallery">
                  {project.images.map((image) => (
                    <ProjectShowcaseImage
                      key={image.imageSourceFull}
                      imageSource={image.imageSourceFull}
                      imageAlt={
                        lang === "pl"
                          ? `${format(projectDateAsObject, "MM.yyyy")}r. ${
                              project.projNamePl
                            }, ${project.cityPl}. Kraj: ${project.countryPl}. ${
                              image.imageAltPl
                            }`
                          : `${format(projectDateAsObject, "LLLL, yyyy")}. ${
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
                  appImage={project.appInfo.appImageFull}
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
      )}

      <ProjectShowcaseFooter lang={lang} />

      {/* <Footer /> */}
    </motion.div>
  );
};

export default ProjectShowcase;
