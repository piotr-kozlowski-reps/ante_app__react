import React from "react";
import { render, screen, cleanup } from "../../shared/utils/test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import App from "../../App";

afterEach(() => {
  cleanup();
});

describe("404 (NotFound)", () => {
  it("should have div with test-id in the DOM.", () => {
    goToNonExistingRoute();
    expect(screen.getByTestId("404-page")).toBeInTheDocument();
  });

  it("should render image of 404", () => {
    goToNonExistingRoute();
    const imageOfError = screen.getByRole("img", {
      name: "404 error. There's no such a route.",
    });
    expect(imageOfError).toBeInTheDocument();
    expect(imageOfError).toHaveAttribute(
      "alt",
      "404 error. There's no such a route."
    );
  });

  it("should show info text in both languages", () => {
    goToNonExistingRoute();
    expect(
      screen.getByRole("heading", {
        name: /podstrona o podanym adresie nie istnieje, albo zostałeś automatycznie wylogowany po 1 godzinie\./i,
      })
    ).toBeInTheDocument();

    //en
    changeLanguageToEn();
    expect(
      screen.queryByRole("heading", {
        name: /podstrona o podanym adresie nie istnieje, albo zostałeś automatycznie wylogowany po 1 godzinie\./i,
      })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /desired route does not exist or you were automatically logout after 1 hour\./i,
      })
    ).toBeInTheDocument();
  });

  it("should show BACK... button in both languages", () => {
    goToNonExistingRoute();
    expect(
      screen.getByRole("button", {
        name: /powrót do projektów/i,
      })
    ).toBeInTheDocument();

    //en
    changeLanguageToEn();
    expect(
      screen.queryByRole("button", {
        name: /powrót do projektów/i,
      })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /back to projects/i,
      })
    ).toBeInTheDocument();
  });
});

////utils
function goToNonExistingRoute() {
  const history = createMemoryHistory();
  history.push("/some/bad/route");
  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
  );
}

function changeLanguageToEn() {
  const langButton = screen.getByRole("button", {
    name: /en/i,
  });
  userEvent.click(langButton);
}
