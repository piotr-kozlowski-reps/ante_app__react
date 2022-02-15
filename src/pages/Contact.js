import React, { useEffect, Fragment } from "react";
import { useSelector } from "react-redux";

const Contact = () => {
  ////vars
  const lang = useSelector((state) => state.language.lang);

  ////jsx
  return (
    <Fragment>
      <div data-testid="contact-page"></div>
      <div>{`Contact, language: ${lang}`}</div>
    </Fragment>
  );
};

export default Contact;

//TODO: make contact page / form / and so on
