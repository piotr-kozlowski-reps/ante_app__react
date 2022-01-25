import React, { Fragment, useState } from "react";

import Modal from "../shared/components/Modal";
import Button from "../shared/components/Button";
import AdminTitle from "../components/Admin/AdminTitle";
import ProjectsTypeNavigation from "../components/Projects/ProjectsTypeNavigation";

const AdminProjectsList = () => {
  //
  //vars
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  //
  //func
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteWarningHandler = () => {
    setShowConfirmModal(false);
  };
  const confirmProjectDelete = () => {
    setShowConfirmModal(false);
    console.log("deleted!");
  };

  //
  //jsx
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
      {/* <AdminTitle title="PROJECTS LIST" /> */}
      <ProjectsTypeNavigation title="PROJECTS LIST" />

      <div>
        project 1
        <Button onClick={showDeleteWarningHandler}>DELETE PROJECT</Button>
      </div>
      <div>project 1</div>
      <div>project 1</div>
      <div>project 1</div>
      <div>project 1</div>
    </Fragment>
  );
};

export default AdminProjectsList;
