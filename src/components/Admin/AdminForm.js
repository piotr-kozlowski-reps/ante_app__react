import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "../../shared/hooks/form-hook";
import { formActions } from "../../shared/store/form-slice";

import AdminCommon from "./AdminCommon";
import AdminFormFooter from "./AdminFormFooter";
import AdminItems from "./AdminItems";

const AdminForm = () => {
  ////vars
  const dispatch = useDispatch();
  const formStageCounter = useSelector((state) => state.form.formStageCounter);
  const genreOfProject = useSelector((state) => state.form.genreOfProject);
  const projectInputsState = useSelector((state) => state.form.projectState);
  const overallFormValidity = useSelector((state) => state.form.isFormValid);
  const [formState, inputHandler, setFormData] = useForm(
    projectInputsState,
    false
  );

  useEffect(() => {
    setFormData(projectInputsState, overallFormValidity);
  }, []);

  ////func
  //update store inputs and overallForm validity
  useEffect(() => {
    dispatch(formActions.setFormInputs(formState.inputs));
    dispatch(formActions.setFormOverallValidity(formState.isValid));
  }, [formState, dispatch]);

  ////func
  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  console.log("redux form state:");
  console.log(projectInputsState);
  console.log(overallFormValidity);

  ////jsx
  return (
    <form onSubmit={submitFormHandler}>
      {formStageCounter === 1 && (
        <AdminCommon inputHandler={inputHandler} formState={formState} />
      )}
      {formStageCounter === 2 && <AdminItems />}
      <AdminFormFooter formState={formState} isShowCancelOnly={false} />
    </form>
  );
};

export default AdminForm;
