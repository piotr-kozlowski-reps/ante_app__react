import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "../../../shared/utils/test-utils";
import userEvent from "@testing-library/user-event";

import ProjectsTypeNavigation from "../ProjectsTypeNavigation";

const MockProjectsTypeNavigation = () => {
  return (
    <BrowserRouter>
      <ProjectsTypeNavigation />
    </BrowserRouter>
  );
};

describe("MainNavigation", () => {
  it("renders all links in proper language when state.lang === 'pl' (initial state)", () => {
    render(<MockProjectsTypeNavigation />);
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
});
