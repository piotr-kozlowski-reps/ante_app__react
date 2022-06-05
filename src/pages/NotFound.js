import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import ProjectShowcaseFooter from "../components/Project/ProjectShowcaseFooter";

import imageFourOFour from "../images/404.png";

const NotFound = () => {
  ////vars
  const lang = useSelector((state) => state.language.lang);

  const polishInfo = (
    <h2 className="center text-fourOFour">
      Podstrona o podanym adresie nie istnieje,
      <br /> albo zostałeś automatycznie wylogowany po 1 godzinie.
    </h2>
  );

  const englishInfo = (
    <h2 className="center text-fourOFour">
      Desired route does not exist
      <br /> or you were automatically logout after 1 hour.
    </h2>
  );

  ////jsx
  return (
    <Fragment>
      <div data-testid="404-page"></div>
      <div id="gallery">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="galleryCarouselFourOFour">
                <div className="carousel-inner">
                  <div className="itemFourOFour">
                    <img
                      src={imageFourOFour}
                      alt="404 error. There's no such a route."
                    />
                  </div>
                </div>
                {lang === "pl" ? polishInfo : englishInfo}
                <ProjectShowcaseFooter lang={lang} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NotFound;
