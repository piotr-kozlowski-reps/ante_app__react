import React, { Fragment } from "react";

import imageFourOFour from "../images/404.png";

const NotFound = () => {
  return (
    <Fragment>
      <div data-testid="404-page"></div>
      <div id="gallery">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div id="galleryCarouselFourOFour">
                <div className="itemFourOFour active absolute-carousel">
                  <img
                    src={imageFourOFour}
                    alt="404 error. There's no such a route."
                    // className="carousel-img-transform-in"
                  />
                  <div className="center">sdfvsdfv</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ErrorModal
        error={error}
        onClear={clearError}
        headerClass="modal-header-mine__show-header-login"
      />
      {isLoading && <LoadingSpinner asOverlay />}
      <Carousel />
      <ProjectsTypeNavigation title="Portfolio" />
      {!isLoading && (
        <ProjectsList
          projectsList={projectsPaginated}
          lang={lang}
          isShowMoreButtonShown={isShowMoreButtonShown}
        />
      )} */}
    </Fragment>
  );
};

export default NotFound;

//TODO: make 404 page
