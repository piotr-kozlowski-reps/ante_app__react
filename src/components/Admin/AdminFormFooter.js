import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../../shared/store/form-slice";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import Button from "../../shared/components/Button";
import Modal from "../../shared/components/Modal";

const AdminFormFooter = (props) => {
  ////vars
  const formStageCounter = useSelector((state) => state.form.formStageCounter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowModal, setIsShowModal] = useState(false);
  const { isSubmitActive, isNextActive, isOnlyCancel, resetForm } = props;

  ////func
  const cancelCancelWarningHandler = () => {
    setIsShowModal(false);
  };
  const confirmCancelWarningHandler = () => {
    dispatch(formActions.resetGenreOfProjectToNull());
    navigate("../../api/projects");
    resetForm();
  };

  const cancelHandler = () => {
    setIsShowModal(true);
  };
  const backHandler = () => {
    dispatch(formActions.setPreviousStage());
  };
  const nextHandler = () => {
    dispatch(formActions.setNextStage());
  };

  ////content
  let content;
  if (isOnlyCancel) {
    content = (
      <Fragment>
        <button
          type="button"
          onClick={confirmCancelWarningHandler}
          className={`button button--default`}
          style={{ fontSize: "16px" }}
        >
          CANCEL
        </button>
      </Fragment>
    );
  } else {
    content = (
      <Fragment>
        <button
          type="button"
          onClick={cancelHandler}
          className={`button button--default`}
        >
          CANCEL
        </button>
        <button
          type="button"
          onClick={backHandler}
          className={`button button--default`}
          disabled={formStageCounter === 0}
        >
          BACK
        </button>
        <button
          type="button"
          onClick={isNextActive ? nextHandler : null}
          className={`button button--default`}
          disabled={formStageCounter === 2 || !isNextActive}
        >
          NEXT
        </button>

        <button
          type="submit"
          className={`button button--default`}
          disabled={isSubmitActive}
        >
          SUBMIT
        </button>
      </Fragment>
    );
  }

  ////jsx
  return (
    <Fragment>
      {/* modal - start */}
      <Modal
        header="Are you sure?"
        headerClass="modal-header-mine__show-header"
        footer={
          <div className="text-center">
            <Button onClick={cancelCancelWarningHandler}>CANCEL</Button>
            <Button
              additionalClass="warning-color"
              onClick={confirmCancelWarningHandler}
            >
              CONFIRM
            </Button>
          </div>
        }
        show={isShowModal}
        onCancel={cancelCancelWarningHandler}
      >
        <p className="text-center modal-mine__content">
          Do you really want to proceed? You will loose all data you entered
          into the form.
        </p>
      </Modal>
      {/* modal - end */}

      <div id="portfolio" className="container">
        <div className="row" id="parent">
          <div className="text-center my-top">
            <div className="div-center-no-py">
              <div className="separator"></div>
            </div>
            <div className="text-center my-bottom">{content}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AdminFormFooter.propTypes = {
  isNextActive: PropTypes.bool,
  isSubmitActive: PropTypes.bool,
  isOnlyCancel: PropTypes.bool,
};

export default AdminFormFooter;
