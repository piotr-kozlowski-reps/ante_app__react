import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import logoImg from "../../images/ante-logo.png";

const Footer = () => {
  ////vars
  const lang = useSelector((state) => state.language.lang);
  const [isFooterToBeMovedToBottom, setIsFooterToBeMovedToBottom] =
    useState(false);

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
  const scrollFooterHandler = (el) => {
    console.log(el);
    console.log("scdfds");
  };

  //
  const onScroll = () => {
    console.log("scroll");
    console.log(`window.innerHeight: ${window.innerHeight}`);
    console.log(
      `document.documentElement.clientHeight: ${document.documentElement.clientHeight}`
    );
    console.log(`document.body.clientHeight: ${document.body.clientHeight}`);
  };
  useEffect(() => {
    document.addEventListener("resize", onScroll, true);
    // document.addEventListener("scroll", onScroll, true);
  });

  ////jsx
  return (
    <div className="footer" id="kontakt" onScroll={scrollFooterHandler}>
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
