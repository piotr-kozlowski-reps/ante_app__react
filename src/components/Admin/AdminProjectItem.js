import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";

import Button from "../../shared/components/Button";

const AdminProjectItem = (props) => {
  ////vars
  const {
    id,
    projNamePl,
    projNameEn,
    completionDate,
    cityPL,
    cityEn,
    countryPL,
    countryEn,
    icoImgThumb,
  } = props;

  ////jsx
  return (
    <li>
      <div className="thumbnail-admin">
        <img src={icoImgThumb} alt={projNamePl}></img>
      </div>

      <div className="project-text">
        <h3>{`${projNamePl}/${projNameEn}`}</h3>
        <p>
          {`id: ${id}`}
          <br />
          {`${format(completionDate, "yyyy")}-${format(completionDate, "MM")}`}
          <br />
          {`${cityPL}/${cityEn}`} <br /> {`${countryPL}/${countryEn}`}
        </p>
      </div>

      <div className="lang buttons-edit-delete">
        <Button to="./" additionalClass="btn-portfolio">
          EDIT
        </Button>
        <Button
          to="./"
          additionalClass="btn-portfolio btn-delete warning-color"
        >
          DELETE
        </Button>
      </div>
    </li>
  );
};

AdminProjectItem.propsTypes = {
  id: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
  projNamePl: PropTypes.string.isRequired,
  projNameEn: PropTypes.string.isRequired,
  completionDate: PropTypes.objectOf(Date).isRequired,
  cityPL: PropTypes.string.isRequired,
  cityEn: PropTypes.string.isRequired,
  countryPL: PropTypes.string.isRequired,
  countryEn: PropTypes.string.isRequired,
  icoImgThumb: PropTypes.string.isRequired,
};

export default AdminProjectItem;
