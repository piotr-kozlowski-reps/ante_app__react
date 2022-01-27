import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import logoImg from "../../images/ante-logo.png";

const Footer = () => {
  ////vars
  const lang = useSelector((state) => state.language.lang);
  const [isFooterToBeMovedToBottom, setIsFooterToBeMovedToBottom] =
    useState(false);
  let footerRef = useRef(null);

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
  const checkIfFooterHasToBeMovedHandler = () => {
    if (footerRef) {
      // const { scrollTop } = footerRef.current;

      const windowHeight = window.innerHeight;
      const bottomOfFooter = footerRef.getBoundingClientRect().bottom;

      if (windowHeight > bottomOfFooter + 10) {
        setIsFooterToBeMovedToBottom(true);
      } else {
        setIsFooterToBeMovedToBottom(false);
      }
      console.log(`windowHeight: ${windowHeight}`);
      console.log(`bottomOfFooter: ${bottomOfFooter}`);
      console.log(isFooterToBeMovedToBottom);

      //   console.log(`footerRef: ${footerRef.getBoundingClientRect().bottom}`);
      // }

      // console.log(
      //   `document.documentElement.clientHeight: ${document.documentElement.clientHeight}`
      // );
      // console.log(`document.body.clientHeight: ${document.body.clientHeight}`);
    }
  };
  useEffect(() => {
    checkIfFooterHasToBeMovedHandler();
    window.addEventListener("resize", checkIfFooterHasToBeMovedHandler, true);
    window.addEventListener("scroll", checkIfFooterHasToBeMovedHandler, true);
  });

  ////jsx
  return (
    <div
      className={`footer ${isFooterToBeMovedToBottom ? "footer-bottom" : ""}`}
      id="kontakt"
      ref={(el) => (footerRef = el)}
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
};

export default Footer;
