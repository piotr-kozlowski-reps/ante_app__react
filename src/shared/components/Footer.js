import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  forwardRef,
} from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { footerPositionActions } from "../store/footer-position-slice";

import logoImg from "../../images/ante-logo.png";

const Footer = forwardRef((props, ref) => {
  ////vars
  const lang = useSelector((state) => state.language.lang);
  //-------start
  // const isFooterToBeMovedToBottom = useSelector(
  //   (state) => state.footerPosition.isFooterToBeMovedToBottom
  // );
  // const dispatch = useDispatch();
  // let footerRef = useRef(null);
  //-------end

  console.log(props.isToMoveFooter);
  ////content
  let companyName, companyAddress, companyPhone;
  if (lang === "pl") {
    companyName = "firma Ante Piotr Kozłowski";
    companyAddress = ",  ul. Hagera 41, 41-800 Zabrze";
    companyPhone = "691 235 259";
  } else {
    companyName = "ANTE Piotr Kozlowski";
    companyAddress = ", Hagera 41, 41-800 Zabrze, Poland";
    companyPhone = "0048 691 235 259";
  }

  ////func
  //handling scrolling to check if footer is on bottom of page
  //-------start
  // const checkIfFooterHasToBeMovedHandler = useCallback(() => {
  //   if (footerRef.current) {
  //     const windowHeight = window.innerHeight;
  //     const bottomOfFooter = footerRef.current.getBoundingClientRect().bottom;

  //     if (windowHeight - 1 > bottomOfFooter) {
  //       dispatch(footerPositionActions.setFooterToBeMovedToBottom());
  //       dispatch(footerPositionActions.setWindowHeight(windowHeight));
  //     } else {
  //       dispatch(footerPositionActions.setFooterNotToBeMovedToBottom());
  //     }
  //   }
  // }, [dispatch, footerRef]);
  // //triggers
  // useEffect(() => {
  //   window.addEventListener("resize", checkIfFooterHasToBeMovedHandler, true);
  //   window.addEventListener("scroll", checkIfFooterHasToBeMovedHandler, true);
  // });
  // useEffect(() => {
  //   checkIfFooterHasToBeMovedHandler();
  // }, []);
  //-------end

  ////jsx
  return (
    <div
      ref={ref}
      className={`footer ${props.isToMoveFooter ? "footer-bottom" : ""}`}
      // className={`footer`}
      id="kontakt"
      // ref={footerRef}
    >
      <div className="container">
        <div className="row">
          <div className="text-center col-lg-12">
            <div className="logo-bottom text-center">
              <img src={logoImg} alt="Ante logo" />
            </div>
            <p>
              © <strong>{companyName}</strong>
              {companyAddress}
              <br />
              tel: <strong>{companyPhone}</strong> / e-mail:{" "}
              <script type="text/javascript">
                user = 'info';site = 'ante.pl';document.write('
                <strong>' + user + '@' + site + '</strong>');
              </script>
              <strong>info@ante.pl</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

Footer.propTypes = {
  isToMoveFooter: PropTypes.bool,
};

export default Footer;
