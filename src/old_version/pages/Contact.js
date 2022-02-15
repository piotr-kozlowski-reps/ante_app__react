import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { languageActions } from "../shared/store/language-slice";

const Contact = () => {
  ////vars
  const lang = useSelector((state) => state.language.lang);
  const location = useLocation();
  const dispatch = useDispatch();

  ////logic
  //checking if someone pasted URL directly -> setting language accordingly
  useEffect(() => {
    if (location.pathname.startsWith("/pl") && lang === "en")
      dispatch(languageActions.setLanguageToPL());
    if (location.pathname.startsWith("/en") && lang === "pl")
      dispatch(languageActions.setLanguageToEN());
  }, [dispatch, lang, location.pathname]);

  ////jsx
  return (
    <Fragment>
      <div data-testid="contact-page"></div>
      <div>{`Contact, language: ${lang}`}</div>
    </Fragment>
  );
};

export default Contact;