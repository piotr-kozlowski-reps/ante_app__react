import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "../../shared/utils/test-utils";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";

import App from "../../App";

const Projects = () => {
  return (
    <BrowserRouter>
      <Projects />
    </BrowserRouter>
  );
};

describe("App -> main links", () => {
  it("renders projects page initialy", () => {
    render(<MockApp />);
    // const projectsPage = screen.getByTestId("projects-page");
    // expect(projectsPage).toBeInTheDocument();
  });

  // it("renders about Page when link(o nas) clicked (PL version)", () => {
  //   const history = createMemoryHistory();
  //   render(
  //     <BrowserRouter history={history}>
  //       <App />
  //     </BrowserRouter>
  //   );

  //   const onasLink = screen.getByRole("link", { name: "O nas" });
  //   const leftClick = { button: 0 };

  //   userEvent.click(onasLink, leftClick);

  //   const aboutPage = screen.getByTestId("about-page");
  //   expect(aboutPage).toBeInTheDocument();
  // });

  // it("renders contact Page when link(kontakt) clicked (PL version)", () => {
  //   const history = createMemoryHistory();
  //   render(
  //     <BrowserRouter history={history}>
  //       <App />
  //     </BrowserRouter>
  //   );

  //   const kontaktLink = screen.getByRole("link", { name: /kontakt/i });
  //   const leftClick = { button: 0 };

  //   userEvent.click(kontaktLink, leftClick);

  //   const contactPage = screen.getByTestId("contact-page");
  //   expect(contactPage).toBeInTheDocument();
  // });

  // it("renders login Page when link(login) clicked (any language version)", () => {
  //   const history = createMemoryHistory();
  //   render(
  //     <BrowserRouter history={history}>
  //       <App />
  //     </BrowserRouter>
  //   );

  //   const loginLink = screen.getByRole("link", { name: /login/i });
  //   const leftClick = { button: 0 };

  //   userEvent.click(loginLink, leftClick);

  //   const loginPage = screen.getByTestId("login-page");
  //   expect(loginPage).toBeInTheDocument();
  // });

  // it("renders projects Page when link(project) clicked (PL version)", () => {
  //   const history = createMemoryHistory();
  //   render(
  //     <BrowserRouter history={history}>
  //       <App />
  //     </BrowserRouter>
  //   );

  //   const leftClick = { projectsLink: 0 };

  //   //make projects button active
  //   const loginLink = screen.getByRole("link", { name: /login/i });
  //   userEvent.click(loginLink, leftClick);

  //   const projectsLink = screen.getByRole("link", { name: /projekty/i });
  //   userEvent.click(projectsLink, leftClick);

  //   const projectsPage = screen.getByTestId("projects-page");
  //   expect(projectsPage).toBeInTheDocument();
  // });

  // //english version set
  // it("renders about Page when link(about) was clicked (EN version)", () => {
  //   const history = createMemoryHistory();
  //   render(
  //     <BrowserRouter history={history}>
  //       <App />
  //     </BrowserRouter>
  //   );

  //   const leftClick = { button: 0 };
  //   //go to English Version
  //   const languageButton = screen.getByRole("button", { name: /en/i });
  //   userEvent.click(languageButton, leftClick);

  //   const aboutLink = screen.getByRole("link", { name: /about/i });
  //   userEvent.click(aboutLink, leftClick);

  //   const aboutPage = screen.getByTestId("about-page");
  //   expect(aboutPage).toBeInTheDocument();
  // });

  // it("renders Contact page when link(contact) was clicked (EN version)", () => {
  //   const history = createMemoryHistory();
  //   render(
  //     <BrowserRouter history={history}>
  //       <App />
  //     </BrowserRouter>
  //   );

  //   const leftClick = { button: 0 };

  //   const contactLink = screen.getByRole("link", { name: /contact/i });
  //   userEvent.click(contactLink, leftClick);

  //   const contactPage = screen.getByTestId("contact-page");
  //   expect(contactPage).toBeInTheDocument();
  // });

  // it("renders projects Page when link(project) clicked (EN version)", () => {
  //   const history = createMemoryHistory();
  //   render(
  //     <BrowserRouter history={history}>
  //       <App />
  //     </BrowserRouter>
  //   );

  //   const leftClick = { projectsLink: 0 };

  //   //make projects button active
  //   const loginLink = screen.getByRole("link", { name: /login/i });
  //   userEvent.click(loginLink, leftClick);

  //   const projectsLink = screen.getByRole("link", { name: /projects/i });
  //   userEvent.click(projectsLink, leftClick);

  //   const projectsPage = screen.getByTestId("projects-page");
  //   expect(projectsPage).toBeInTheDocument();
  // });
});
