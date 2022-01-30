import React, { Fragment, useState, useEffect } from "react";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_COMPLETION_DATE,
} from "../../shared/utils/validators";
import PropTypes from "prop-types";

import Input from "../../shared/components/Input";
import type from "../../shared/utils/type";

const AdminCommon = (props) => {
  ////vars
  //checkListStates
  const [isCompetitionChecked, setIsCompetitionChecked] = useState(false);
  const [isInteriorChecked, setIsInteriorChecked] = useState(false);
  const [isExteriorChecked, setIsExteriorChecked] = useState(false);
  const [isAnimationChecked, setIsAnimationChecked] = useState(false);
  const [isProductmodelChecked, setIsCProductmodelChecked] = useState(false);
  const [isPanoramaChecked, setIsPanoramaChecked] = useState(false);
  const [isArappChecked, setIsArappChecked] = useState(false);

  const typeArray = props.formState.inputs.type.value;
  console.log(typeArray);

  ////func
  const typeCompetitionHandler = (event) => {
    setIsCompetitionChecked((beforeState) => !beforeState);
  };
  //update form state array
  useEffect(() => {
    if (isCompetitionChecked) {
      const isCompetitionSet = typeArray.find((t) => t === type.COMPETITION);
      if (!isCompetitionSet) typeArray.push(type.COMPETITION);
    } else {
      typeArray = typeArray.filter((t) => t !== type.COMPETITION);
    }
  }, [isCompetitionChecked, typeArray]);

  ////jsx
  return (
    <Fragment>
      <div id="portfolio" className="container">
        <div className="row" id="parent">
          <p className="text-center title-new-project">COMMON DATA</p>
        </div>

        <div className="row" id="parent">
          <div className="form-row">
            <div className="project-details">
              <Input
                id="projNamePl"
                element="input"
                type="text"
                label="Nazwa projektu (po polsku)."
                placeholder="wpisz nazwę projektu"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Enter a valid 'Project Name' (at least 1 character), please."
                onInput={props.inputHandler}
              />
            </div>

            <div className="project-details">
              <Input
                id="projNameEn"
                element="input"
                type="text"
                label="Project name (in English)"
                placeholder="enter project name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Enter a valid 'Project Name' (at least 1 character), please."
                onInput={props.inputHandler}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="project-details">
              <Input
                id="cityPl"
                element="input"
                type="text"
                label="Miejscowość (po polsku)"
                placeholder="wpisz miejscowość gdzie wykonano projekt"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Enter a valid city (at least 1 character), please."
                onInput={props.inputHandler}
              />
            </div>

            <div className="project-details">
              <Input
                id="cityEn"
                element="input"
                type="text"
                label="City (in English)"
                placeholder="enter city name where project was build"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Enter a valid city (at least 1 character), please."
                onInput={props.inputHandler}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="project-details">
              <Input
                id="countryPL"
                element="input"
                type="text"
                label="Kraj (po polsku)"
                placeholder="wpisz kraj, w którym wykonano projekt"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Enter a valid country name (at least 1 character), please."
                onInput={props.inputHandler}
              />
            </div>

            <div className="project-details">
              <Input
                id="countryEn"
                element="input"
                type="text"
                label="Country (in English)"
                placeholder="enter country name where project was build"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Enter a valid country name (at least 1 character), please."
                onInput={props.inputHandler}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="project-details">
              <Input
                id="clientPL"
                element="input"
                type="text"
                label="Klient (po polsku)"
                placeholder="wpisz nazwę klienta"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Enter a valid client name (at least 1 character), please."
                onInput={props.inputHandler}
              />
            </div>

            <div className="project-details">
              <Input
                id="clientEn"
                element="input"
                type="text"
                label="Client (in English)"
                placeholder="enter client name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Enter a valid client name (at least 1 character), please."
                onInput={props.inputHandler}
              />
            </div>
          </div>

          <div className="div-center-no-py">
            <div class="separator"></div>
          </div>

          <div className="form-row small-my">
            <div className="project-details">
              <Input
                id="completionDate"
                element="input"
                type="date"
                label="Completion date "
                placeholder="enter date of completion the project"
                validators={[VALIDATOR_COMPLETION_DATE()]}
                errorText="Enter a valid date (between 2000 and 2050), please."
                onInput={props.inputHandler}
              />
            </div>
          </div>

          <div className="div-center-no-py">
            <div class="separator"></div>
          </div>

          <div className="row" id="parent">
            <p className="text-center title-new-project-between">
              CHOOSE PROJECT TYPE
            </p>
          </div>

          <div class="project-types">
            <div class="checbox-container">
              <input
                type="checkbox"
                id="competition"
                value="COMPETITION"
                onChange={typeCompetitionHandler}
                checked={isCompetitionChecked}
              />
              <label htmlFor="competition">COMPETITION</label>
            </div>

            <div class="checbox-container">
              <input type="checkbox" id="interior" />
              <label htmlFor="interior">INTERIOR</label>
            </div>

            <div class="checbox-container">
              <input type="checkbox" id="exterior" />
              <label htmlFor="exterior">EXTERIOR</label>
            </div>

            <div class="checbox-container">
              <input type="checkbox" id="animation" />
              <label htmlFor="animation">ANIMATION</label>
            </div>

            <div class="checbox-container">
              <input type="checkbox" id="productmodel" />
              <label htmlFor="productmodel">PRODUCT_MODEL</label>
            </div>

            <div class="checbox-container">
              <input type="checkbox" id="panorama" />
              <label htmlFor="panorama">PANORAMA</label>
            </div>

            <div class="checbox-container">
              <input type="checkbox" id="arapp" />
              <label htmlFor="arapp">AR_APP</label>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AdminCommon.propTypes = {
  inputHandler: PropTypes.func,
  formState: PropTypes.object,
};
export default AdminCommon;

{
  /* <div class="separator"></div>

            <div class="project-details">
                <div class="input-box">
                    <span class="details">Year</span>
                    <input type="text" placeholder="Year" required>
                </div>
            </div>

            <div class="project-details">
                <div class="input-box">
                    <span class="details">Month</span>
                    <input type="text" placeholder="Month" required>
                </div>
            </div>

            <div class="project-details">
                <div class="input-box">
                    <span class="details">Client</span>
                    <input type="text" placeholder="Client" required>
                </div>
            </div>

            <div class="separator"></div>

            <!-- types part -->
            <div class="project-details">
                    <span class="details-title">Category types</span>
            </div>

            <div class="project-types">

                <div class="checbox-container">
                    <input type="checkbox" id="competition" />
                    <label for="competition">COMPETITION</label>
                </div>

                <div class="checbox-container">
                    <input type="checkbox" id="interior" />
                    <label for="interior">INTERIOR</label>
                </div>

                <div class="checbox-container">
                    <input type="checkbox" id="exterior" />
                    <label for="exterior">EXTERIOR</label>
                </div>

                <div class="checbox-container">
                    <input type="checkbox" id="animation" />
                    <label for="animation">ANIMATION</label>
                </div>

                <div class="checbox-container">
                    <input type="checkbox" id="productmodel" />
                    <label for="productmodel">PRODUCT_MODEL</label>
                </div>

                <div class="checbox-container">
                    <input type="checkbox" id="panorama" />
                    <label for="panorama">PANORAMA</label>
                </div>

                <div class="checbox-container">
                    <input type="checkbox" id="arrapp" />
                    <label for="arrapp">AR_APP</label>
                </div>

            </div>


            <div class="separator"></div> */
}

// <body data-spy="scroll" data-target="#myScrollspy" data-offset="125">

// <nav class="navbar">
//     <div class="container">
//         <div class="row menu-top">
//             <div class="col-xs-2">
//                 <div class="lang">
// <!--                    <a th:href="@{/main(lang='EN',type=${type})}" th:if="${lang} == 'PL'">EN</a>-->
// <!--                    <a th:href="@{/main(lang='PL',type=${type})}" th:if="${lang} == 'EN'">PL</a>-->
//                 </div>
//             </div>
//             <div class="col-xs-10">
//                 <ul class="nav top-nav">
//                     <li><a th:href="@{/admin(type='0')}">BACK TO PROJECTS LIST</a></li>
//                 </ul>
//             </div>
//         </div>
//         <div class="row">
//             <div class="logo-top text-center" style="padding-bottom: 130px">
//                 <img th:src="@{/images/ante-logo.png}" alt="Ante logo">
//             </div>
//         </div>
//     </div>

//     <div id="the-sticky-div" class="container">
//         <!-- Brand and toggle get grouped for better mobile display -->

//         <div class="row">

//             <div class="row">
//                 <div class="col-lg-12">
//                     <h2>CREATE NEW PROJECT</h2>
//                 </div>
//             </div>

//             <div class="row">
//                 <div class="col-lg-12 title-header"></div>
//             </div>

//         </div>

//     </div>
//     <!-- /.container-fluid -->
// </nav>

// <div id="portfolio" class="container">
//     <div class="row" id="parent">

//         <!--FORM START-->
//         <!--/*@thymesVar id="project" type="pl.ante.portfolioanteapp.model.projection.ProjectWriteModel"*/-->
//         <form action="#" method="post" th:action="@{/admin}" th:object="${project}">

//             <div class="form-row">
//                 <div class="project-details">
//                     <div class="input-box">
//                         <span class="details">Name (in Polish)</span>
//                         <input type="text" th:field="*{namePl}" placeholder="Name (in Polish)" required>
//                     </div>
//                 </div>

//                 <div class="project-details">
//                     <div class="input-box">
//                         <span class="details">Name (in English)</span>
//                         <input type="text" th:field="*{nameEn}" placeholder="Name (in English)" required>
//                     </div>
//                 </div>
//             </div>

//             <div class="form-row">
//                 <div class="project-details">
//                     <div class="input-box">
//                         <span class="details">City (in Polish)</span>
//                         <input type="text" th:field="*{cityPl}" placeholder="City (in Polish)" required>
//                     </div>
//                 </div>

//                 <div class="project-details">
//                     <div class="input-box">
//                         <span class="details">City (in English)</span>
//                         <input type="text" th:field="*{cityEn}" placeholder="City (in English)" required>
//                     </div>
//                 </div>
//             </div>

//             <div class="form-row">
//                 <div class="project-details">
//                     <div class="input-box">
//                         <span class="details">Country (in Polish)</span>
//                         <input type="text" th:field="*{countryPl}" placeholder="Country (in Polish)" required>
//                     </div>
//                 </div>

//                 <div class="project-details">
//                     <div class="input-box">
//                         <span class="details">Country (in English)</span>
//                         <input type="text" th:field="*{countryEn}" placeholder="Country (in English)" required>
//                     </div>
//                 </div>
//             </div>

//             <div class="separator"></div>   <!--            separator-->

//             <div class="project-details">
//                 <div class="input-box">
//                     <span class="details">Year</span>
//                     <input type="text" th:field="*{year}" placeholder="Year" required>
//                 </div>
//             </div>

//             <div class="project-details">
//                 <div class="input-box">
//                     <span class="details">Month</span>
//                     <input type="text" th:field="*{month}" placeholder="Month" required>
//                 </div>
//             </div>

//             <div class="project-details">
//                 <div class="input-box">
//                     <span class="details">Client</span>
//                     <input type="text" th:field="*{client}" placeholder="Client" required>
//                 </div>
//             </div>

//             <div class="separator"></div>   <!--            separator-->

//             <!-- types part -->
//             <div class="project-details">
//                 <span class="details-title">Category types</span>
//             </div>

//             <div class="project-types">

// <!--                &lt;!&ndash;/*@thymesVar id="types" type="java.util.List<pl.ante.portfolioanteapp.model.Type>"*/&ndash;&gt;-->
// <!--                <div class="checbox-container" th:each="everyType : ${types}">-->
// <!--                    <input type="checkbox" th:field="*{types}" th:value="${everyType.id}" />-->
// <!--                    <label th:for="${#ids.prev('types')}" th:text="${everyType.type}">...</label>-->
// <!--                </div>-->

//                     <!-- types -->
//                     <label>Category types
//                         <!--/*@thymesVar id="types" type="java.util.List<pl.ante.portfolioanteapp.model.Type>"*/-->
//                         <input type="checkbox" name="types"
//                         th:each="everyType : ${types}"
//                         th:text="${everyType.type}"
//                         th:value="${everyType.id}"
//                         th:field="*{types}"
//                         />
//                     </label>

//             </div>

//             <div class="separator"></div>   <!--            separator-->

//             <div class="project-details">
//                 <span class="details-title">Project main graphic</span>
//             </div>

//             <div class="form-row">
//                 <div class="project-details">
//                     <div class="input-box">
//                         <span class="details">Project main graphic alt (in Polish)</span>
//                         <input type="text" placeholder="Project main graphic (in Polish)" required>
//                     </div>
//                 </div>

//                 <div class="project-details">
//                     <div class="input-box">
//                         <span class="details">Project main graphic alt (in English)</span>
//                         <input type="text" placeholder="Project main graphic alt (in English)" required>
//                     </div>
//                 </div>

//             </div>

//             <div class="file-upload-container">
//                 <input type="file" name="" id="" class="upload-button">
//             </div>

//             <!-- <input type="file" id="real-file"/>
//             <button type="button" id="custom-button" class="btn-portfolio">CHOOSE A FILE</button> -->

//             <div class="separator"></div>   <!--            separator-->

// <!--            <div class="project-details">-->
// <!--                <span class="details-types">Project icon</span>-->
// <!--            </div>-->

// <!--            <div class="project-details">-->
// <!--                <div class="input-box">-->
// <!--                    <span class="details">Icon alt in Polish</span>-->
// <!--                    <input type="text" placeholder="Icon alt in Polish" required>-->
// <!--                </div>-->
// <!--            </div>-->

// <!--            <div class="project-details">-->
// <!--                <div class="input-box">-->
// <!--                    <span class="details">Icon alt in English</span>-->
// <!--                    <input type="text" placeholder="Icon alt in Polish" required>-->
// <!--                </div>-->
// <!--            </div>-->

// <!--            <input type="file" id="real-file"/>-->

//             <br /><br /><br />
//             <div class="button">
//                 <input type="submit" value="SUBMIT!!!">
//             </div>

//             <!-- private Set<ProjectImage> images; -->

//         </form>
//         <!--FORM END-->

//     </div><!--end row-->
// </div><!--end container-->

// <div class="footer" id="kontakt">
//     <div class="container">
//         <div class="row">

//             <!--PL-->
//             <div class="text-center col-lg-12">
//                 <div class="logo-bottom text-center">
//                     <img th:src="@{/images/ante-logo.png}" alt="Ante logo">
//                 </div>
//                 <p>&copy; <strong>firma Ante Piotr Kozłowski</strong>,  ul. Hagera 41, 41-800 Zabrze<br>
//                     tel: <strong>691 235 259</strong>   /   e-mail: <script type="text/javascript">user = 'info';site = 'ante.pl';document.write('<strong>' + user + '@' + site + '</strong>');</script>
//                 </p>
//             </div>
//             <!--PL end-->

//         </div>
//     </div>
// </div>
// <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
// <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
// <!-- Include all compiled plugins (below), or include individual files as needed -->
// <script th:src="@{/js/jquery.mobile.custom.min.js}"></script>
// <script th:src="@{/js/bootstrap.js}"></script>

// <script type="text/javascript"th:src="@{/js/jquery.interactive_bg.js}"></script>
// <script type="text/javascript">
//     $(".bg").interactive_bg();
// </script>

// <!--cookies info start-->
// <script type="text/javascript" src="http://ciasteczka.eu/cookiesEU-latest.min.js"></script>

// <script type="text/javascript">
//     jQuery(document).ready(function(){
//         jQuery.fn.cookiesEU({
//             text: 'Nasza strona internetowa używa plików cookies (tzw. ciasteczka) w celach statystycznych, reklamowych oraz funkcjonalnych. Dzięki nim możemy indywidualnie dostosować stronę do Twoich potrzeb. Każdy może zaakceptować pliki cookies albo ma możliwość wyłączenia ich w przeglądarce, dzięki czemu nie będą zbierane żadne informacje. <a href="../static/polityka-prywatnosci.html">Dowiedz się więcej na temat naszej polityki prywatności oraz sposobu wyłączenia plików cookies.</a>',
//             close: 'x',
//             test: false,
//             box_class: 'cookies-info-box-bottom',
//             animation: 'fade',
//             time: '500',
//             auto_accept: false
//         });
//     });
// </script>
// <!--cookies info end-->

// <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
// <script>
//     var $btns = $('.cat').click(function() {
//         if (this.id == 'all') {
//             $('#parent > div').removeClass('gray');
//         } else {
//             var $el = $('.' + this.id).removeClass('gray');
//             $('#parent > div').not($el).addClass('gray');
//         }
//         $btns.removeClass('active');
//         $(this).addClass('active');
//     })
// </script>
// <script>
//     jQuery('.carousel').carousel({
//         interval: 6000
//     })
// </script>
// <script>
//     // ------------------------------
//     // http://twitter.com/mattsince87
//     // ------------------------------

//     function scrollNav() {
//         $('.nav li a').click(function(){
//             //Animate
//             $('html, body').stop().animate({
//                 scrollTop: $( $(this).attr('href') ).offset().top
//             }, 1000);
//             return true; //bylo false
//         });
//         $('.scrollTop a').scrollTop();
//     }
//     scrollNav();
// </script>
// <script>
//     var $window = $(window),
//         $stickyEl = $('#the-sticky-div'),
//         elTop = $stickyEl.offset().top;

//     $window.scroll(function() {
//         $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
//     });
// </script>

// </body>
// </html>
