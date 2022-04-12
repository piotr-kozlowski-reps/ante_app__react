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

  //footer positioning vars
  let refDivTriggerFooterMovement = useRef();
  let refDivFooter = useRef();
  const [footerHeight, setFooterHeight] = useState(0);
  const [divTriggerFooterHPosition, setDivTriggerFooterHPosition] = useState(0);
  const [isToMoveFooter, setIsToMoveFooter] = useState(false);
  const bodyElement = document.querySelector("body");

  //check if logged in - token in localStorage is present and data didn't expire
  ////TESTED
  useEffect(() => {
    const localStorageUserDataObj = localStorage.getItem("userData");
    if (!localStorageUserDataObj) return;

    const storedData = JSON.parse(localStorageUserDataObj);
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      dispatch(
        authActions.login({
          login: storedData.login,
          token: storedData.token,
          expirationDate: new Date(storedData.expiration).toISOString(),
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

  //moving footer to bottom if needed
  const checkIfFooterHasToBeMovedHandler = useCallback(() => {
    const windowHeight = window.innerHeight;

    //addedAllMarginsFromFooterClasses
    const marginTopFromFooterClass = 120 + 30 + 20 + 15 + 20 + 15;

    divTriggerFooterHPosition + marginTopFromFooterClass < windowHeight
      ? moveFooterToBottom()
      : unmoveFooterToBottom();

    function moveFooterToBottom() {
      bodyElement.className = "body-height-to-move-footer";
      setIsToMoveFooter(true);
    }

    function unmoveFooterToBottom() {
      bodyElement.className = "";
      setIsToMoveFooter(false);
    }
  }, [divTriggerFooterHPosition, bodyElement]);

  useEffect(() => {
    if (
      !refDivFooter ||
      !refDivFooter.current ||
      !refDivFooter.current.clientHeight
    )
      return;

    if (
      !refDivTriggerFooterMovement ||
      !refDivTriggerFooterMovement.current ||
      !refDivTriggerFooterMovement.current.offsetTop
    )
      return;

    if (footerHeight !== refDivFooter.current.clientHeight) {
      setFooterHeight(refDivFooter.current.clientHeight);
    }
    if (
      divTriggerFooterHPosition !==
      refDivTriggerFooterMovement.current.offsetTop
    ) {
      setDivTriggerFooterHPosition(
        refDivTriggerFooterMovement.current.offsetTop
      );
    }

    checkIfFooterHasToBeMovedHandler();
  }, [
    footerHeight,
    checkIfFooterHasToBeMovedHandler,
    divTriggerFooterHPosition,
    refDivFooter,
    refDivTriggerFooterMovement,
  ]);
  window.addEventListener("resize", checkIfFooterHasToBeMovedHandler, true);
  window.addEventListener("scroll", checkIfFooterHasToBeMovedHandler, true);
  useEffect(() => {
    checkIfFooterHasToBeMovedHandler();
  }, []);

  function logoutPostponed() {
    dispatch(authActions.logout());
  }

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
