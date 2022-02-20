import React from "react";

import Modal from "./Modal";
import Button from "./Button";
import Separator from "./Separator";

const ErrorModal = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      headerClass={props.headerClass ? props.headerClass : ""}
      show={!!props.error}
      // footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <div id="login">
        <Separator additionalClass="py-bottom2_5" />
        <div className="project-details center">
          <p>{props.error}</p>
        </div>
      </div>
      <div className="center">
        <Button onClick={props.onClear}>OK</Button>
      </div>
    </Modal>
  );
};

export default ErrorModal;
