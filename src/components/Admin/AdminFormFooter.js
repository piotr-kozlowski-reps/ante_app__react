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
  const formInputsStates = useSelector((state) => state.form.projectState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowModal, setIsShowModal] = useState(false);

  ////func
  const cancelCancelWarningHandler = () => {
    setIsShowModal(false);
  };
  const confirmCancelWarningHandler = () => {
    navigate("../../api/projects");
  };

  ////func
  const cancelHandler = () => {
    setIsShowModal(true);
  };
  const backHandler = () => {
    dispatch(formActions.setPreviousStage());
  };
  const nextHandler = () => {
    dispatch(formActions.setNextStage());
  };

  //next button activness
  let isNextActive = true;
  if (formStageCounter === 0) isNextActive = false;
  if (
    !formInputsStates ||
    !formInputsStates.projNamePl.isValid ||
    !formInputsStates.projNameEn.isValid ||
    !formInputsStates.cityPl.isValid ||
    !formInputsStates.cityEn.isValid ||
    !formInputsStates.countryPL.isValid ||
    !formInputsStates.countryEn.isValid ||
    !formInputsStates.clientPL.isValid ||
    !formInputsStates.clientEn.isValid ||
    !formInputsStates.completionDate.isValid ||
    !formInputsStates.type.isValid
  )
    isNextActive = false;

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
            <Fragment>
              <div className="div-center-no-py">
                <div className="separator"></div>
              </div>
              <div className="text-center my-bottom">
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
                  // onClick={isNextActive ? nextHandler : null}
                  onClick={nextHandler}
                  className={`button button--default`}
                  disabled={formStageCounter === 2}
                >
                  NEXT
                </button>

                <button
                  type="submit"
                  onClick={isNextActive ? nextHandler : null}
                  className={`button button--default`}
                >
                  SUBMIT
                </button>
              </div>
            </Fragment>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AdminFormFooter.propTypes = {
  formState: PropTypes.object,
  isShowCancelOnly: PropTypes.bool,
};

export default AdminFormFooter;

//TODO: next -> when possible stage1 -> stage2
//TODO: submit -> disable until overall submission
