import React from "react";
import { BrowserRouter, Router } from "react-router-dom";
import { render, screen } from "./shared/utils/test-utils";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";

import App from "./App";

const MockApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

describe("App -> main links", () => {
  it("renders projects page initialy", () => {
    render(<MockApp />);
    const projectsPage = screen.getByTestId("projects-page");
    expect(projectsPage).toBeInTheDocument();
  });

  it("renders about Page when link(o nas) clicked (PL version)", () => {
    const history = createMemoryHistory();
    render(
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    );

    const onasLink = screen.getByRole("link", { name: "O nas" });
    const leftClick = { button: 0 };

    userEvent.click(onasLink, leftClick);

    const aboutPage = screen.getByTestId("about-page");
    expect(aboutPage).toBeInTheDocument();
  });

  it("renders contact Page when link(kontakt) clicked (PL version)", () => {
    const history = createMemoryHistory();
    render(
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    );

    const kontaktLink = screen.getByRole("link", { name: /kontakt/i });
    const leftClick = { button: 0 };

    userEvent.click(kontaktLink, leftClick);

    const contactPage = screen.getByTestId("contact-page");
    expect(contactPage).toBeInTheDocument();
  });

  it("renders login Page when link(login) clicked (any language version)", () => {
    const history = createMemoryHistory();
    render(
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    );

    const loginLink = screen.getByRole("link", { name: /login/i });
    const leftClick = { button: 0 };

    userEvent.click(loginLink, leftClick);

    const loginPage = screen.getByTestId("login-page");
    expect(loginPage).toBeInTheDocument();
  });

  it("renders projects Page when link(project) clicked (PL version)", () => {
    const history = createMemoryHistory();
    render(
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    );

    const leftClick = { projectsLink: 0 };

    //make projects button active
    const loginLink = screen.getByRole("link", { name: /login/i });
    userEvent.click(loginLink, leftClick);

    const projectsLink = screen.getByRole("link", { name: /projekty/i });
    userEvent.click(projectsLink, leftClick);

    const projectsPage = screen.getByTestId("projects-page");
    expect(projectsPage).toBeInTheDocument();
  });

  //english version set
  it("renders about Page when link(about) was clicked (EN version)", () => {
    const history = createMemoryHistory();
    render(
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    );

    const leftClick = { button: 0 };
    //go to English Version
    const languageButton = screen.getByRole("button", { name: /en/i });
    userEvent.click(languageButton, leftClick);

    const aboutLink = screen.getByRole("link", { name: /about/i });
    userEvent.click(aboutLink, leftClick);

    const aboutPage = screen.getByTestId("about-page");
    expect(aboutPage).toBeInTheDocument();
  });

  it("renders Contact page when link(contact) was clicked (EN version)", () => {
    const history = createMemoryHistory();
    render(
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    );

    const leftClick = { button: 0 };

    const contactLink = screen.getByRole("link", { name: /contact/i });
    userEvent.click(contactLink, leftClick);

    const contactPage = screen.getByTestId("contact-page");
    expect(contactPage).toBeInTheDocument();
  });

  it("renders projects Page when link(project) clicked (EN version)", () => {
    const history = createMemoryHistory();
    render(
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    );

    const leftClick = { projectsLink: 0 };

    //make projects button active
    const loginLink = screen.getByRole("link", { name: /login/i });
    userEvent.click(loginLink, leftClick);

    const projectsLink = screen.getByRole("link", { name: /projects/i });
    userEvent.click(projectsLink, leftClick);

    const projectsPage = screen.getByTestId("projects-page");
    expect(projectsPage).toBeInTheDocument();
  });
});

describe("App -> links changing type", () => {
  it("renders all links in proper language when state.lang === 'pl' (initial state)", () => {
    render(<MockApp />);

    const leftClick = { button: 0 };
    //go to Polish Version
    const languageButton = screen.getByRole("button", { name: /pl/i });
    userEvent.click(languageButton, leftClick);

    let linkAll = screen.getByRole("link", { name: "Wszystkie" });
    let linkCompetition = screen.getByRole("link", { name: "Konkursy" });
    let linkInteriors = screen.getByRole("link", { name: "Wnętrza" });
    let linkExteriors = screen.getByRole("link", { name: "Zewnętrza" });
    let linkAnimations = screen.getByRole("link", { name: "Animacje" });
    let link3dmodeling = screen.getByRole("link", {
      name: "Modelowanie produktów",
    });
    let linkPanoramas = screen.getByRole("link", { name: /Panoramy 360°/i });
    let linkApps = screen.getByRole("link", { name: "AR apps" });

    expect(linkAll).toBeInTheDocument();
    expect(linkCompetition).toBeInTheDocument();
    expect(linkInteriors).toBeInTheDocument();
    expect(linkExteriors).toBeInTheDocument();
    expect(linkAnimations).toBeInTheDocument();
    expect(link3dmodeling).toBeInTheDocument();
    expect(linkPanoramas).toBeInTheDocument();
    expect(linkApps).toBeInTheDocument();

    linkAll = screen.queryByRole("link", { name: "All" });
    linkCompetition = screen.queryByRole("link", { name: "Competition" });
    linkInteriors = screen.queryByRole("link", { name: "Interiors" });
    linkExteriors = screen.queryByRole("link", { name: "Exteriors" });
    linkAnimations = screen.queryByRole("link", { name: "Animations" });
    link3dmodeling = screen.queryByRole("link", {
      name: /Products/i,
    });
    linkPanoramas = screen.queryByRole("link", {
      name: /panoramas/i,
    });
    linkApps = screen.queryByRole("link", { name: "AR apps" });

    expect(linkAll).not.toBeInTheDocument();
    expect(linkCompetition).not.toBeInTheDocument();
    expect(linkInteriors).not.toBeInTheDocument();
    expect(linkExteriors).not.toBeInTheDocument();
    expect(linkAnimations).not.toBeInTheDocument();
    expect(link3dmodeling).not.toBeInTheDocument();
    expect(linkPanoramas).not.toBeInTheDocument();
    expect(linkApps).toBeInTheDocument();
  });

  it("renders all links in proper language when state.lang === 'en' ", () => {
    render(<MockApp />);

    const leftClick = { button: 0 };
    //go to Polish Version
    const languageButton = screen.getByRole("button", { name: /en/i });
    userEvent.click(languageButton, leftClick);

    let linkAll = screen.queryByRole("link", { name: "Wszystkie" });
    let linkCompetition = screen.queryByRole("link", { name: "Konkursy" });
    let linkInteriors = screen.queryByRole("link", { name: "Wnętrza" });
    let linkExteriors = screen.queryByRole("link", { name: "Zewnętrza" });
    let linkAnimations = screen.queryByRole("link", { name: "Animacje" });
    let link3dmodeling = screen.queryByRole("link", {
      name: "Modelowanie produktów",
    });
    let linkPanoramas = screen.queryByRole("link", { name: /Panoramy 360°/i });
    let linkApps = screen.queryByRole("link", { name: "AR apps" });

    expect(linkAll).not.toBeInTheDocument();
    expect(linkCompetition).not.toBeInTheDocument();
    expect(linkInteriors).not.toBeInTheDocument();
    expect(linkExteriors).not.toBeInTheDocument();
    expect(linkAnimations).not.toBeInTheDocument();
    expect(link3dmodeling).not.toBeInTheDocument();
    expect(linkPanoramas).not.toBeInTheDocument();
    expect(linkApps).toBeInTheDocument();

    linkAll = screen.queryByRole("link", { name: /all/i });
    linkCompetition = screen.queryByRole("link", { name: /Competition/i });
    linkInteriors = screen.queryByRole("link", { name: "Interiors" });
    linkExteriors = screen.queryByRole("link", { name: "Exteriors" });
    linkAnimations = screen.queryByRole("link", { name: "Animations" });
    link3dmodeling = screen.queryByRole("link", {
      name: /Products/i,
    });
    linkPanoramas = screen.queryByRole("link", {
      name: /panoramas/i,
    });
    linkApps = screen.queryByRole("link", { name: "AR apps" });

    expect(linkAll).toBeInTheDocument();
    expect(linkCompetition).toBeInTheDocument();
    expect(linkInteriors).toBeInTheDocument();
    expect(linkExteriors).toBeInTheDocument();
    expect(linkAnimations).toBeInTheDocument();
    expect(link3dmodeling).toBeInTheDocument();
    expect(linkPanoramas).toBeInTheDocument();
    expect(linkApps).toBeInTheDocument();
  });

  it("changes query in link to type=all when link(all) clicked", async () => {
    const history = createMemoryHistory();
    render(
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    );

    let linkAll = screen.getByRole("link", { name: "Animations" });
    userEvent.click(linkAll);

    console.log(history.location.pathname);
    //TODO: test all links changing type of Projects if the query in url (?type=....) is equal to desired one
  });
});
