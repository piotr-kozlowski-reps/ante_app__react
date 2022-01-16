import React, { Fragment } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Header from "./shared/Navigation/Header";
import MainNavigation from "./shared/Navigation/MainNavigation";
import BackgroundTopElements from "./shared/components/BackgroundTopElements";
import Login from "./pages/Login";
import ProjectShowcase from "./pages/ProjectShowcase";
import NewProject from "./pages/NewProject";

function App(props) {
  //
  //jsx
  return (
    <Fragment>
      <BackgroundTopElements />

      <nav className="navbar">
        <Header>
          <MainNavigation />
        </Header>
      </nav>

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
        <Route path="/login" element={<Login />} />
        <Route path="/admin/new-project" element={<NewProject />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
}

export default App;
