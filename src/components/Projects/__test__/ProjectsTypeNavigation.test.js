import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "../../../shared/utils/test-utils";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

import App from "../../../App";

const MockApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

// describe("MainNavigation", () => {
//   it("renders all links in proper language when state.lang === 'pl' (initial state)", () => {
//     render(<MockProjectsTypeNavigation />);
//     let linkAll = screen.getByRole("link", { name: "Wszystkie" });
//     let linkCompetition = screen.getByRole("link", { name: "Konkursy" });
//     let linkInteriors = screen.getByRole("link", { name: "Wnętrza" });
//     let linkExteriors = screen.getByRole("link", { name: "Zewnętrza" });
//     let linkAnimations = screen.getByRole("link", { name: "Animacje" });
//     let link3dmodeling = screen.getByRole("link", {
//       name: "Modelowanie produktów",
//     });
//     let linkPanoramas = screen.getByRole("link", { name: /Panoramy 360°/i });
//     let linkApps = screen.getByRole("link", { name: "AR apps" });

//     expect(linkAll).toBeInTheDocument();
//     expect(linkCompetition).toBeInTheDocument();
//     expect(linkInteriors).toBeInTheDocument();
//     expect(linkExteriors).toBeInTheDocument();
//     expect(linkAnimations).toBeInTheDocument();
//     expect(link3dmodeling).toBeInTheDocument();
//     expect(linkPanoramas).toBeInTheDocument();
//     expect(linkApps).toBeInTheDocument();

//     linkAll = screen.queryByRole("link", { name: "All" });
//     linkCompetition = screen.queryByRole("link", { name: "Competition" });
//     linkInteriors = screen.queryByRole("link", { name: "Interiors" });
//     linkExteriors = screen.queryByRole("link", { name: "Exteriors" });
//     linkAnimations = screen.queryByRole("link", { name: "Animations" });
//     link3dmodeling = screen.queryByRole("link", {
//       name: /Products/i,
//     });
//     linkPanoramas = screen.queryByRole("link", {
//       name: /panoramas/i,
//     });
//     linkApps = screen.queryByRole("link", { name: "AR apps" });

//     expect(linkAll).not.toBeInTheDocument();
//     expect(linkCompetition).not.toBeInTheDocument();
//     expect(linkInteriors).not.toBeInTheDocument();
//     expect(linkExteriors).not.toBeInTheDocument();
//     expect(linkAnimations).not.toBeInTheDocument();
//     expect(link3dmodeling).not.toBeInTheDocument();
//     expect(linkPanoramas).not.toBeInTheDocument();
//     expect(linkApps).toBeInTheDocument();
//   });
// });

describe("ProjectsTypeNavigation", () => {
  it("renders all links in proper language when state.lang === 'pl' (initial state)", () => {
    render(<MockApp />);

    const leftClick = { button: 0 };
    //go to Polish Version
    // const languageButton = screen.getByRole("button", { name: /pl/i });
    // userEvent.click(languageButton, leftClick);

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

    //TODO: test all links changing type of Projects if the query in url (?type=....) is equal to desired one
  });
});
