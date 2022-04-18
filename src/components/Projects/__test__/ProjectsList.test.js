import React from "react";
import {
  render,
  screen,
  cleanup,
  within,
} from "../../../shared/utils/test-utils";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { server, rest } from "../../../../mocks/server";

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

describe("ProjectsList", () => {
  it("shows text [NO PROJECTS FOUND] when json returns empty projects array", async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_BACKEND_URL}api/projects`,
        async (req, res, ctx) => {
          return res.once(ctx.status(200), ctx.json({ projects: [] }));
        }
      )
    );
    render(<MockApp />);

    // await screen.findByRole("");

    expect(
      await screen.findByRole("heading", {
        name: /no projects found/i,
      })
    ).toBeInTheDocument();
  });

  it("shows all projects at the beginning", async () => {
    render(<MockApp />);
    resetLanguageToPolish();

    expect(await (await screen.findAllByTestId("project-item")).length).toBe(7);
  });

  it("shows appropriate amount of projectswhen links are clicked", async () => {
    render(<MockApp />);
    resetLanguageToPolish();

    //wszystkie
    userEvent.click(screen.getByText("Wszystkie"));
    expect(await (await screen.findAllByTestId("project-item")).length).toBe(7);

    //Konkursy
    userEvent.click(screen.getByText("Konkursy"));
    expect(await (await screen.findAllByTestId("project-item")).length).toBe(7);

    //Wnętrza
    userEvent.click(screen.getByText("Wnętrza"));
    expect(await (await screen.findAllByTestId("project-item")).length).toBe(6);

    //Zewnętrza
    userEvent.click(screen.getByText("Zewnętrza"));
    expect(await (await screen.findAllByTestId("project-item")).length).toBe(5);

    //Animacje
    userEvent.click(screen.getByText("Animacje"));
    expect(await (await screen.findAllByTestId("project-item")).length).toBe(4);

    //Animacje
    userEvent.click(screen.getByText("Modelowanie produktów"));
    expect(await (await screen.findAllByTestId("project-item")).length).toBe(3);

    //Animacje
    userEvent.click(screen.getByText("Panoramy 360°"));
    expect(await (await screen.findAllByTestId("project-item")).length).toBe(2);

    //Animacje
    userEvent.click(screen.getByText("AR apps"));
    expect(await (await screen.findAllByTestId("project-item")).length).toBe(1);

    ////en
    changeLanguageToEn();

    //wszystkie
    userEvent.click(screen.getByText("all"));
    expect(await (await screen.findAllByTestId("project-item")).length).toBe(7);

    //Konkursy
    userEvent.click(screen.getByText("competitions"));
    expect(await (await screen.findAllByTestId("project-item")).length).toBe(7);

    //Wnętrza
    userEvent.click(screen.getByText("Interiors"));
    expect(await (await screen.findAllByTestId("project-item")).length).toBe(6);

    //Zewnętrza
    userEvent.click(screen.getByText("Exteriors"));
    expect(await (await screen.findAllByTestId("project-item")).length).toBe(5);

    //Animacje
    userEvent.click(screen.getByText("Animations"));
    expect(await (await screen.findAllByTestId("project-item")).length).toBe(4);

    //Animacje
    userEvent.click(screen.getByText("Products Modeling"));
    expect(await (await screen.findAllByTestId("project-item")).length).toBe(3);

    //Animacje
    userEvent.click(screen.getByText(/360° panoramas/i));
    expect(await (await screen.findAllByTestId("project-item")).length).toBe(2);

    //Animacje
    userEvent.click(screen.getByText("AR apps"));
    expect(await (await screen.findAllByTestId("project-item")).length).toBe(1);
  });

  it("shows appropriate language of projects", async () => {
    render(<MockApp />);
    resetLanguageToPolish();

    //Animacje
    userEvent.click(screen.getByText("AR apps"));
    expect(await (await screen.findAllByTestId("project-item")).length).toBe(1);
    expect(
      await await screen.findByTestId("project-item-name")
    ).toHaveTextContent(/PROJNAMEPl/i);
    expect(
      await await screen.findByTestId("project-item-date-city-country")
    ).toHaveTextContent(/2010\/ CITYPL \[COUNTRYPL\]/i);

    ////en
    changeLanguageToEn();

    userEvent.click(screen.getByText("AR apps"));
    expect(
      await await screen.findByTestId("project-item-name")
    ).toHaveTextContent(/PROJNAMEEN/i);
    expect(
      await await screen.findByTestId("project-item-date-city-country")
    ).toHaveTextContent(/2010\/ CITYEN \[COUNTRYEN\]/i);
  });
});

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
