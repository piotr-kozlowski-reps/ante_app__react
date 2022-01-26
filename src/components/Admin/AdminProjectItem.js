import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import Button from "../../shared/components/Button";
import Modal from "../../shared/components/Modal";

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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();

  ////func
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteWarningHandler = () => {
    setShowConfirmModal(false);
  };
  const confirmProjectDelete = () => {
    setShowConfirmModal(false);
    console.log(`project deleted! Id: ${id}`);
  };
  const navigatoToEditProject = () => {
    navigate(`/api/projects/${id}`);
  };

  ////jsx
  return (
    <Fragment>
      {/* modal delete - start */}
      <Modal
        header="Are you sure?"
        headerClass="modal-header-mine__show-header"
        footer={
          <div className="text-center">
            <Button onClick={cancelDeleteWarningHandler}>CANCEL</Button>
            <Button
              additionalClass="warning-color"
              onClick={confirmProjectDelete}
            >
              DELETE
            </Button>
          </div>
        }
        show={showConfirmModal}
        onCancel={cancelDeleteWarningHandler}
      >
        <p className="text-center modal-mine__content">
          Do you really want to proceed and delete that Project?
        </p>
      </Modal>
      {/* modal delete - end */}

      <li>
        <div className="thumbnail-admin">
          <img
            src={icoImgThumb}
            alt={projNamePl}
            onClick={navigatoToEditProject}
            style={{ cursor: "pointer" }}
          ></img>
        </div>

        <div
          className="project-text"
          onClick={navigatoToEditProject}
          style={{ cursor: "pointer" }}
        >
          <h3>{`${projNamePl}/${projNameEn}`}</h3>
          <p>
            {`id: ${id}`}
            <br />
            {`${format(completionDate, "yyyy")}-${format(
              completionDate,
              "MM"
            )}`}
            <br />
            {`${cityPL}/${cityEn}`} <br /> {`${countryPL}/${countryEn}`}
          </p>
        </div>

        <div className="lang buttons-edit-delete">
          <Button
            onClick={navigatoToEditProject}
            additionalClass="btn-portfolio"
          >
            EDIT
          </Button>

          <Button
            onClick={showDeleteWarningHandler}
            additionalClass="btn-portfolio btn-delete warning-color"
          >
            DELETE
          </Button>
        </div>
      </li>
    </Fragment>
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
  onClick: PropTypes.func,
};

export default AdminProjectItem;
