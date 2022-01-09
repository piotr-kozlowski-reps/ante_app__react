import React from "react";
import { format } from "date-fns";

const ProjectItem = ({ project }) => {
  const { id, projName, completionDate, city, country, icoImg } = project;

  const alt = `${format(
    completionDate,
    "MM-yyyy"
  )}. ${projName}, ${city}, ${country}.`;

  return (
    <div className="box-outer col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxxs-12 ext">
      <div className="box">
        <img src={icoImg} alt={alt} />
        <div className="more">
          <div className="project">
            <a
              href="en_2020_07_housing_estate_aachen_germany.html"
              className="link"
            >
              <div className="desc">
                <h3>{projName.toUpperCase()}</h3>
                <h4>
                  {`${format(
                    completionDate,
                    "yyyy"
                  )}/ ${city.toUpperCase()} [${country.toUpperCase()}]`}
                </h4>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;

//  <div class="box-outer col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxxs-12 ext">
//    <div class="box">
//      <img
//        src="images/2020_07_osiedle_mieszkaniowe_aachen_niemcy_ico.jpg"
//        alt="April, 2019. Housing estate, Aachen, Germany."
//      />
//      <div class="more">
//        <div class="project">
//          <a
//            href="en_2020_07_housing_estate_aachen_germany.html"
//            class="link"
//          >
//            <div class="desc">
//              <h3>HOUSING ESTATE</h3>
//              <h4>2020/ AACHEN [GERMANY]</h4>
//            </div>
//          </a>
//        </div>
//      </div>
//    </div>
//  </div>;
