import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../../shared/store/form-slice";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import Button from "../../shared/components/Button";

const AdminFormFooter = (props) => {
  ////vars
  const formStageCounter = useSelector((state) => state.form.formStageCounter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  ////func
  const cancelHandler = () => {
    navigate("../../api/projects");
    dispatch(formActions.resetToInitialStage());
  };
  const backHandler = () => {
    dispatch(formActions.setPreviousStage());
  };
  const nextHandler = () => {
    dispatch(formActions.setNextStage());
  };

  return (
    <div id="portfolio" className="container">
      <div className="row" id="parent">
        <div className="text-center my-top">
          <div className="div-center-no-py">
            <div className="separator"></div>
          </div>
          <div className="text-center my-bottom">
            <Button onClick={cancelHandler}>CANCEL</Button>
            <Button disabled={formStageCounter === 0} onClick={backHandler}>
              BACK
            </Button>
            {/* //TODO: next disability */}
            <Button disabled={false} onClick={nextHandler}>
              NEXT
            </Button>
            <Button type="submit" disabled={!props.formState.isValid}>
              SUBMIT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

AdminFormFooter.propTypes = {
  formState: PropTypes.object,
};

export default AdminFormFooter;
