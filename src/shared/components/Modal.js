import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";

const ModalOverlay = (props) => {
  const content = (
    <div
      className={`modal--mine ${props.className ? props.className : ""}`}
      style={props.style}
      data-testid="modal"
    >
      <header
        className={`modal__header--mine ${
          props.headerClass ? props.headerClass : ""
        }`}
      >
        <h2>{props.header}</h2>
      </header>
      {/* <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      > */}
      <div className="modal-content">
        <div
          className={`modal__content--mine ${
            props.contentClass ? props.contentClass : ""
          }`}
        >
          {props.children}
        </div>
        <footer
          className={`modal__footer--mine ${
            props.footerClass ? props.footerClass : ""
          }`}
        >
          {props.footer}
        </footer>
      </div>
      {/* </form> */}
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </Fragment>
  );
};

ModalOverlay.propTypes = {
  className: PropTypes.string, //optional: additional class to ModalOverlay
  style: PropTypes.object, //optional: additional styles to ModalOverlay
  headerClass: PropTypes.string, //optional: additional class to 'header' in ModalOverlay
  header: PropTypes.string, //'header' text content
  onSubmit: PropTypes.func, //optional: onSubmit function to Form in ModalOverlay (if Form needed)
  contentClass: PropTypes.string, //optional: class to content of ModalOverlay
  children: PropTypes.node, // content of ModalOverlay
  footerClass: PropTypes.string, //optional: class for footer of ModalOverlay
  footer: PropTypes.node, // content of footer in ModalOverlay
};

Modal.propTypes = {
  show: PropTypes.bool, // shows the modal
  onCancel: PropTypes.func, // function to be triggered when Cancel clicked
};

export default Modal;
