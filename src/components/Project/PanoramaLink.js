import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import URL_BASE from "../../shared/utils/url-base";

import Button from "../../shared/components/Button";
import Modal from "../../shared/components/Modal";
import PanoramaFullView from "./PanoramaFullView";

const PanoramaLink = ({
  panoramaIco,
  panoramaTitle,
  panoramaImageSource,
  lang,
}) => {
  ////vars
  const [isShowPanorama, setIsShowPanorama] = useState(false);

  ////func
  const openPanoramaModalHandler = () => setIsShowPanorama(true);
  const closePanoramaModalHandler = () => setIsShowPanorama(false);

  ////jsx
  return (
    <Fragment>
      <Modal
        show={isShowPanorama}
        onCancel={closePanoramaModalHandler}
        // header={panoramaTitle}
        headerClass="modal-header-mine__panorama"
        footer={
          <div className="text-center">
            <Button onClick={closePanoramaModalHandler}>Close</Button>
          </div>
        }
      >
        <PanoramaFullView
          panoramaImageSource={panoramaImageSource}
          panoramaTitle={panoramaTitle}
        />
      </Modal>

      <div className="box-outer col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxxs-12">
        <div className="box">
          <img src={`${URL_BASE}${panoramaIco}`} alt={panoramaTitle}></img>
          <div className="more">
            <div className="project">
              <div onClick={openPanoramaModalHandler} className="link">
                <div className="desc">
                  <h3>{panoramaTitle}</h3>
                  <h4>
                    {lang === "pl"
                      ? "[kliknij by powiększyć]"
                      : "[click to enlarge]"}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PanoramaLink;

//TODO: animation of Modal
