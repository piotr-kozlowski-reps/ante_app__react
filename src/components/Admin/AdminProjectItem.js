import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import Button from "../../shared/components/Button";
import Modal from "../../shared/components/Modal";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import ErrorModal from "../../shared/components/ErrorModal";
import Separator from "../../shared/components/Separator";
import { adminProjectsVariants } from "../../shared/utils/framerMotionAnimationsVariants";

const AdminProjectItem = (props) => {
  // console.log(props);

  ////vars
  const {
    id,
    projNamePl,
    projNameEn,
    completionDate,
    cityPl,
    cityEn,
    countryPl,
    countryEn,
    icoImgThumb,
    onDelete,
    lang,
  } = props;
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showInformationModal, setShowInformationModal] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  ////func
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteWarningHandler = () => {
    setShowConfirmModal(false);
  };
  const confirmProjectDelete = async () => {
    setShowConfirmModal(false);

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}api/projects/${id}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setShowInformationModal(true);

      const timer = () => {
        setTimeout(() => {
          setShowInformationModal(false);
          onDelete(id);
        }, 800);
      };
      timer();
      clearTimeout(timer);

      // const timer2 = () => {
      //   setTimeout(() => {
      //     onDelete(id);
      //   }, 1700);
      // };
      // timer2();
      // clearTimeout(timer2);
      //TODO: coś tu nie działa z tym pokazywaniem okna potwiedzającego i tymi timerami - ogarnąć i poprawić
    } catch (error) {
      console.log(error);
    }
  };
  const navigateToEditProject = () => {
    navigate(`/api/projects/${id}`);
  };

  ////jsx
  return (
    <div>
      <Modal
        header="Information"
        headerClass="modal-header-mine__show-header-login"
        show={showInformationModal}
      >
        <Separator additionalClass="py-bottom2_5" />
        <div className="center">
          <p>Project deleted.</p>
        </div>
      </Modal>

      <ErrorModal
        error={error}
        onClear={clearError}
        headerClass="modal-header-mine__show-header-login"
      />
      {isLoading && <LoadingSpinner asOverlay />}
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

      <li data-testid="project-item-admin">
        <motion.div
          className="thumbnail-admin"
          variants={adminProjectsVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <img
            src={icoImgThumb}
            alt={projNamePl}
            onClick={navigateToEditProject}
            style={{ cursor: "pointer" }}
          ></img>
        </motion.div>

        <motion.div
          variants={adminProjectsVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="project-text"
          onClick={navigateToEditProject}
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
            {`${cityPl}/${cityEn}`} <br /> {`${countryPl}/${countryEn}`}
          </p>
        </motion.div>

        <div className="lang buttons-edit-delete">
          <Button
            onClick={navigateToEditProject}
            additionalClass="btn-portfolio"
          >
            {lang === "pl" ? "ZMIEŃ" : "EDIT"}
          </Button>

          <Button
            onClick={showDeleteWarningHandler}
            additionalClass="btn-portfolio btn-delete warning-color"
          >
            {lang === "pl" ? "KASUJ" : "DELETE"}
          </Button>
        </div>
      </li>
    </div>
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
  onDelete: PropTypes.func,
  lang: PropTypes.string,
};

export default AdminProjectItem;
