import React, {
  useRef,
  forwardRef,
  Fragment,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import logoImg from "../../images/ante-logo.png";

const Footer = forwardRef((props, ref) => {
  ////vars
  const lang = useSelector((state) => state.language.lang);
  let grayFillDiv = useRef();
  const [grayFillDivResultHeight, setGrayFillDivResultHeight] = useState(0);

  // console.log({ grayFillDiv });

  //topOfGrayFillDiv height;
  useEffect(() => {
    let topOfGrayFillDiv;
    let fullHeightOfWindow;

    if (grayFillDiv && grayFillDiv.current) {
      topOfGrayFillDiv = grayFillDiv.current.offsetTop;
      fullHeightOfWindow = window.innerHeight;
      const resultHeigh = fullHeightOfWindow - topOfGrayFillDiv;
      setGrayFillDivResultHeight(resultHeigh);
    }
  }, [grayFillDiv, grayFillDivResultHeight]);

  // console.log(body.offsetHeight);
  // console.log(window.innerHeight);

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

  ////jsx
  return (
    <Fragment>
      <div
        ref={ref}
        className={`footer ${props.isToMoveFooter ? "footer-bottom" : ""}`}
        id="kontakt"
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
      {/* <div
        className="last-div-fill"
        ref={grayFillDiv}
        style={{ height: `${grayFillDivResultHeight}px` }}
      ></div> */}
    </Fragment>
  );
});

Footer.propTypes = {
  isToMoveFooter: PropTypes.bool,
};

export default Footer;
