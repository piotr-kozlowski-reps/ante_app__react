import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./shared/store/auth-slice";

import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Header from "./shared/navigation/Header";
import MainNavigation from "./shared/navigation/MainNavigation";
import BackgroundTopElements from "./shared/components/BackgroundTopElements";
import ProjectShowcase from "./pages/ProjectShowcase";
import NewProject from "./pages/NewProject";
import UpdateProject from "./pages/UpdateProject";
import AdminProjects from "./pages/AdminProjects";
import Footer from "./shared/components/Footer";

let logoutTimer;

function App(props) {
  ////vars
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);
  const tokenExpirationDate = useSelector(
    (state) => state.auth.tokenExpirationDate
  );
  const dispatch = useDispatch();
  const location = useLocation();

  const refresh = useCallback(() => {
    // checkIfFooterHasToBeMovedHandler();
    makeStickyPortfolioIfNeeded();
  });

  //sticky portfolio
  //TODO: check after tests if it really works well when more projects will be provided
  function makeStickyPortfolioIfNeeded() {
    const stickyNavigation = document.querySelector("#the-sticky-div");
    const divAfterStickyNavigationWithPy = document.querySelector(
      "#the-sticky-div > .py-admin"
    );

    if (stickyNavigation) {
      const stickyDivPosition =
        stickyNavigation.getBoundingClientRect().top + window.pageYOffset;
      const windowOffsetInY = window.pageYOffset;

      if (windowOffsetInY > stickyDivPosition) {
        stickyNavigation.classList.add("sticky");
        // if (divAfterStickyNavigationWithPy)
        //   divAfterStickyNavigationWithPy.classList.remove("py-admin");
      } else {
        stickyNavigation.classList.remove("sticky");
        // if (divAfterStickyNavigationWithPy)
        //   divAfterStickyNavigationWithPy.classList.add("py-admin");
      }
    }
  }

  //footer positioning vars
  let refDivTriggerFooterMovement = useRef();
  let refDivFooter = useRef();
  // const [footerHeight, setFooterHeight] = useState(0);
  // const [divTriggerFooterHPosition, setDivTriggerFooterHPosition] = useState(0);
  const [isToMoveFooter, setIsToMoveFooter] = useState(false);
  // const bodyElement = document.querySelector("body");

  //moving footer to bottom if needed
  // const checkIfFooterHasToBeMovedHandler = useCallback(() => {
  //   const windowHeight = window.innerHeight;
  //   const marginTopFromFooterClass = 120;

  //   refDivTriggerFooterMovement.current.offsetTop +
  //     footerHeight -
  //     marginTopFromFooterClass <
  //   windowHeight
  //     ? moveFooterToBottom()
  //     : unMoveFooterToBottom();

  //   function moveFooterToBottom() {
  //     bodyElement.className = "body-height-to-move-footer";
  //     setIsToMoveFooter(true);
  //   }

  //   function unMoveFooterToBottom() {
  //     bodyElement.className = "";
  //     setIsToMoveFooter(false);
  //   }
  // }, [bodyElement, footerHeight]);

  // useEffect(() => {
  //   if (
  //     !refDivFooter ||
  //     !refDivFooter.current ||
  //     !refDivFooter.current.clientHeight
  //   )
  //     return;

  //   if (
  //     !refDivTriggerFooterMovement ||
  //     !refDivTriggerFooterMovement.current ||
  //     !refDivTriggerFooterMovement.current.offsetTop
  //   )
  //     return;

  //   if (footerHeight !== refDivFooter.current.clientHeight) {
  //     setFooterHeight(refDivFooter.current.clientHeight);
  //   }
  //   if (
  //     divTriggerFooterHPosition !==
  //     refDivTriggerFooterMovement.current.offsetTop
  //   ) {
  //     setDivTriggerFooterHPosition(
  //       refDivTriggerFooterMovement.current.offsetTop
  //     );
  //   }

  //   checkIfFooterHasToBeMovedHandler();
  // }, [
  //   footerHeight,
  //   checkIfFooterHasToBeMovedHandler,
  //   divTriggerFooterHPosition,
  //   refDivFooter,
  //   refDivTriggerFooterMovement,
  //   location,
  // ]);

  // window.addEventListener("resize", refresh, true);
  // window.addEventListener("scroll", refresh, true);
  // useEffect(() => {
  //   refresh();
  // }, [refresh]);

  function logoutPostponed() {
    dispatch(authActions.logout());
  }

  //check if logged in - token in localStorage is present and data didn't expire
  ////TESTED
  useEffect(() => {
    const localStorageUserDataObj = JSON.parse(
      localStorage.getItem("userData")
    );

    if (
      !localStorageUserDataObj ||
      !localStorageUserDataObj.token ||
      !localStorageUserDataObj.expiration ||
      !localStorageUserDataObj.login
    ) {
      return;
    }

    if (
      localStorageUserDataObj &&
      localStorageUserDataObj.token &&
      new Date(localStorageUserDataObj.expiration) > new Date()
    ) {
      dispatch(
        authActions.login({
          login: localStorageUserDataObj.login,
          token: localStorageUserDataObj.token,
          expirationDate: new Date(
            localStorageUserDataObj.expiration
          ).toISOString(),
        })
      );
    }
  }, [dispatch]);

  //logout when time expires
  ////TESTED
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        new Date(tokenExpirationDate).getTime() - new Date().getTime();

      logoutTimer = setTimeout(logoutPostponed, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationDate, dispatch]);

  ////content
  let routes;
  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<Navigate to={`/pl/projects`} />} />
        <Route path="/pl/projects" element={<Projects />} />
        <Route path="/en/projects" element={<Projects />} />
        <Route path="/en/projects/:projectId" element={<ProjectShowcase />} />
        <Route path="/pl/projects/:projectId" element={<ProjectShowcase />} />
        <Route path="/pl/contact" element={<Contact />} />
        <Route path="/en/contact" element={<Contact />} />
        <Route path="/pl/about" element={<About />} />
        <Route path="/en/about" element={<About />} />
        <Route path="/api/projects/new-project" element={<NewProject />} />
        <Route path="/api/projects/:projectId" element={<UpdateProject />} />
        <Route path="/api/projects" element={<AdminProjects />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Navigate to={`/pl/projects`} />} />
        <Route path="/pl/projects" element={<Projects />} />
        <Route path="/en/projects" element={<Projects />} />
        <Route path="/en/projects/:projectId" element={<ProjectShowcase />} />
        <Route path="/pl/projects/:projectId" element={<ProjectShowcase />} />
        <Route path="/pl/contact" element={<Contact />} />
        <Route path="/en/contact" element={<Contact />} />
        <Route path="/pl/about" element={<About />} />
        <Route path="/en/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  ////jsx
  return (
    <Fragment>
      <BackgroundTopElements />

      <nav className="navbar">
        <Header>
          <MainNavigation />
        </Header>
      </nav>

      {routes}
      <div id="footer-move-trigger" ref={refDivTriggerFooterMovement}></div>
      <Footer ref={refDivFooter} isToMoveFooter={isToMoveFooter} />
    </Fragment>
  );
}

export default App;
