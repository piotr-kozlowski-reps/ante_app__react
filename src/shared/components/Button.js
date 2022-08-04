import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { linksHoverVariants } from "../utils/framerMotionAnimationsVariants";

/**
 * Button
 * overall props:
 * props.size ->
 * props.additionalClass -> passed additionalClass
 *
 * if prop.href -> renders a href
 * {... overall.props}
 * {props.href -> href value}
 *
 * if prop.to -> renders Link to=
 * {... overall.props}
 * {props.exact -> exact}
 *
 * if !props.to && !props.href -> renders button
 * {... overall.props}
 * {props.type -> button type}
 * {props.onClick -> onClickHandler}
 * {props.disabled -> if disabled}
 */

const Button = (props) => {
  if (props.href) {
    return (
      <motion.a
        className={`button button--${props.size || "default"} ${
          props.additionalClass ? props.additionalClass : ""
        }`}
        href={props.href}
        variants={linksHoverVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        {props.children}
      </motion.a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`button button--${props.size || "default"} ${
          props.additionalClass ? props.additionalClass : ""
        }`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <motion.button
      className={`button button--${props.size || "default"} ${
        props.additionalClass ? props.additionalClass : ""
      }`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      variants={linksHoverVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {props.children}
    </motion.button>
  );
};

Button.propTypes = {
  size: PropTypes.string,
  additionalClass: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.any.isRequired,
  to: PropTypes.string,
  exact: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
