import React from "react";
import { render, screen, cleanup } from "../../../shared/utils/test-utils";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import App from "../../../App";

const MockApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

afterEach(() => {
  cleanup();
});

describe("ProjectsTypeNavigation", () => {
  it("renders title PORTFOLIO", () => {
    render(<MockApp />);
    expect(
      screen.getByRole("heading", {
        name: /portfolio/i,
      })
    ).toBeInTheDocument();
  });

  it("renders links in proper language", () => {
    render(<MockApp />);

    expect(screen.getByText("Wszystkie")).toBeInTheDocument();
    expect(screen.getByText("Konkursy")).toBeInTheDocument();
    expect(screen.getByText("Wnętrza")).toBeInTheDocument();
    expect(screen.getByText("Zewnętrza")).toBeInTheDocument();
    expect(screen.getByText("Animacje")).toBeInTheDocument();
    expect(screen.getByText("Modelowanie produktów")).toBeInTheDocument();
    expect(screen.getByText("Panoramy 360°")).toBeInTheDocument();
    expect(screen.getByText("AR apps")).toBeInTheDocument();

    //en
    changeLanguageToEn();

    expect(screen.queryByText("Wszystkie")).not.toBeInTheDocument();
    expect(screen.queryByText("Konkursy")).not.toBeInTheDocument();
    expect(screen.queryByText("Wnętrza")).not.toBeInTheDocument();
    expect(screen.queryByText("Zewnętrza")).not.toBeInTheDocument();
    expect(screen.queryByText("Animacje")).not.toBeInTheDocument();
    expect(screen.queryByText("Modelowanie produktów")).not.toBeInTheDocument();
    expect(screen.queryByText("Panoramy 360°")).not.toBeInTheDocument();

    expect(screen.getByText("all")).toBeInTheDocument();
    expect(screen.getByText("competitions")).toBeInTheDocument();
    expect(screen.getByText("Interiors")).toBeInTheDocument();
    expect(screen.getByText("Exteriors")).toBeInTheDocument();
    expect(screen.getByText("Animations")).toBeInTheDocument();
    expect(screen.getByText("Products Modeling")).toBeInTheDocument();
    expect(screen.getByText(/360° panoramas/i)).toBeInTheDocument();
    expect(screen.getByText("AR apps")).toBeInTheDocument();
  });

  it("renders link with active class when needed", () => {
    render(<MockApp />);
    resetLanguageToPolish();

    expect(screen.getByText("Wszystkie")).toHaveAttribute(
      "class",
      "main-nav-link  main-nav-link-active active"
    );
    expect(screen.getByText("Konkursy")).toHaveAttribute(
      "class",
      "main-nav-link active"
    );
    expect(screen.getByText("Wnętrza")).toHaveAttribute(
      "class",
      "main-nav-link active"
    );
    expect(screen.getByText("Zewnętrza")).toHaveAttribute(
      "class",
      "main-nav-link active"
    );
    expect(screen.getByText("Animacje")).toHaveAttribute(
      "class",
      "main-nav-link active"
    );
    expect(screen.getByText("Modelowanie produktów")).toHaveAttribute(
      "class",
      "main-nav-link active"
    );
    expect(screen.getByText("Panoramy 360°")).toHaveAttribute(
      "class",
      "main-nav-link active"
    );
    expect(screen.getByText("AR apps")).toHaveAttribute(
      "class",
      "main-nav-link active"
    );

    //when wnętrza clicked
    userEvent.click(screen.getByText("Wnętrza"));

    expect(screen.getByText("Wszystkie")).toHaveAttribute(
      "class",
      "main-nav-link active"
    );
    expect(screen.getByText("Konkursy")).toHaveAttribute(
      "class",
      "main-nav-link active"
    );
    expect(screen.getByText("Wnętrza")).toHaveAttribute(
      "class",
      "main-nav-link  main-nav-link-active active"
    );
    expect(screen.getByText("Zewnętrza")).toHaveAttribute(
      "class",
      "main-nav-link active"
    );
    expect(screen.getByText("Animacje")).toHaveAttribute(
      "class",
      "main-nav-link active"
    );
    expect(screen.getByText("Modelowanie produktów")).toHaveAttribute(
      "class",
      "main-nav-link active"
    );
    expect(screen.getByText("Panoramy 360°")).toHaveAttribute(
      "class",
      "main-nav-link active"
    );
    expect(screen.getByText("AR apps")).toHaveAttribute(
      "class",
      "main-nav-link active"
    );

    //when ar_apps clicked
    userEvent.click(screen.getByText("AR apps"));

    expect(screen.getByText("Wszystkie")).toHaveAttribute(
      "class",
      "main-nav-link active"
    );
    expect(screen.getByText("Konkursy")).toHaveAttribute(
      "class",
      "main-nav-link active"
    );
    expect(screen.getByText("Wnętrza")).toHaveAttribute(
      "class",
      "main-nav-link active"
    );
    expect(screen.getByText("Zewnętrza")).toHaveAttribute(
      "class",
      "main-nav-link active"
    );
    expect(screen.getByText("Animacje")).toHaveAttribute(
      "class",
      "main-nav-link active"
    );
    expect(screen.getByText("Modelowanie produktów")).toHaveAttribute(
      "class",
      "main-nav-link active"
    );
    expect(screen.getByText("Panoramy 360°")).toHaveAttribute(
      "class",
      "main-nav-link active"
    );
    expect(screen.getByText("AR apps")).toHaveAttribute(
      "class",
      "main-nav-link  main-nav-link-active active"
    );
  });

  it(`renders correct amount of projects when "konkursy" - clicked`, async () => {
    render(<MockApp />);
    resetLanguageToPolish();

    userEvent.click(
      screen.getByRole("link", {
        name: /konkursy/i,
      })
    );

    const findprojects = async () =>
      await screen.findAllByTestId("project-item");
    const projects = await findprojects();

    expect(projects.length).toBe(7);
  });

  it(`renders correct amount of projects when "wnętrza" - clicked`, async () => {
    render(<MockApp />);
    resetLanguageToPolish();

    userEvent.click(screen.getByText("Wnętrza"));

    const findprojects = async () =>
      await screen.findAllByTestId("project-item");
    const projects = await findprojects();

    expect(projects.length).toBe(6);
  });

  it(`renders correct amount of projects when "zewnętrza" - clicked`, async () => {
    render(<MockApp />);
    resetLanguageToPolish();

    userEvent.click(
      screen.getByRole("link", {
        name: /zewnętrza/i,
      })
    );

    const findprojects = async () =>
      await screen.findAllByTestId("project-item");
    const projects = await findprojects();

    expect(projects.length).toBe(5);
  });

  it(`renders correct amount of projects when "animacje" - clicked`, async () => {
    render(<MockApp />);
    resetLanguageToPolish();

    userEvent.click(
      screen.getByRole("link", {
        name: /animacje/i,
      })
    );

    const findprojects = async () =>
      await screen.findAllByTestId("project-item");
    const projects = await findprojects();

    expect(projects.length).toBe(4);
  });

  it(`renders correct amount of projects when "modelowanie produktów" - clicked`, async () => {
    render(<MockApp />);
    resetLanguageToPolish();

    userEvent.click(
      screen.getByRole("link", {
        name: /modelowanie produktów/i,
      })
    );

    const findprojects = async () =>
      await screen.findAllByTestId("project-item");
    const projects = await findprojects();

    expect(projects.length).toBe(3);
  });

  it(`renders correct amount of projects when "panoramy 360" - clicked`, async () => {
    render(<MockApp />);
    resetLanguageToPolish();

    userEvent.click(
      screen.getByRole("link", {
        name: /panoramy 360°/i,
      })
    );

    const findprojects = async () =>
      await screen.findAllByTestId("project-item");
    const projects = await findprojects();

    expect(projects.length).toBe(2);
  });

  it(`renders correct amount of projects when "AR APPS" - clicked`, async () => {
    render(<MockApp />);
    resetLanguageToPolish();

    userEvent.click(
      screen.getByRole("link", {
        name: /ar apps/i,
      })
    );

    const findprojects = async () =>
      await screen.findAllByTestId("project-item");
    const projects = await findprojects();

    expect(projects.length).toBe(1);
  });
});

////
//utils
function changeLanguageToEn() {
  const langButton = screen.getByRole("button", {
    name: "EN",
  });
  userEvent.click(langButton);
}

function resetLanguageToPolish() {
  if (
    !screen.queryByRole("link", {
      name: /o nas/i,
    })
  ) {
    const langButton = screen.queryByRole("button", {
      name: /pl/i,
    });
    userEvent.click(langButton);
  }
}
