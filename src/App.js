import React, { Fragment, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./shared/store/auth-slice";
import authSlice from "./shared/store/auth-slice";
import footerPositionSlice from "./shared/store/footer-position-slice";
import { logoutPostponed } from "./shared/store/auth-slice";

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

let logoutTimer;

function App(props) {
  ////vars
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isFooterToBeMovedToBottom = useSelector(
    (state) => state.footerPosition.isFooterToBeMovedToBottom
  );
  const token = useSelector((state) => state.auth.token);
  const tokenExpirationDate = useSelector(
    (state) => state.auth.tokenExpirationDate
  );
  const dispatch = useDispatch();

  console.log({ token });
  console.log({ tokenExpirationDate });

  //moving footer to bottom if needed
  const bodyElement = document.querySelector("body");
  if (isFooterToBeMovedToBottom)
    bodyElement.className = "body-height-to-move-footer";
  else bodyElement.className = "";

  //check if logged in - token in localStorage is present
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      dispatch(
        authActions.login({
          login: storedData.login,
          token: storedData.token,
          expirationDate: new Date(storedData.expiration),
        })
      );
    }
  }, [dispatch]);

  //logout when time expires
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        new Date(tokenExpirationDate).getTime() - new Date().getTime();

      // setTimeout(() => dispatch(authActions.logout, 5000));

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
    </Fragment>
  );
}

export default App;
