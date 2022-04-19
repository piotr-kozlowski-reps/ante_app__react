import React from "react";
import { render, screen, cleanup } from "../../shared/utils/test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { server, rest } from "../../../mocks/server";

import App from "../../App";
import { func } from "prop-types";

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

describe(`CONTACT -> tdd approach`, () => {
  it("should have div with test-id in the DOM.", () => {
    render(<MockApp />);
    goToContactPageInPl();
    expect(screen.getByTestId("contact-page")).toBeInTheDocument();
  });

  it("renders proper header in both languages.", async () => {
    render(<MockApp />);
    goToContactPageInPl();

    expect(
      screen.getByRole("heading", { name: /kontakt/i })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: /contact/i })
    ).not.toBeInTheDocument();

    changeLanguageToEn();
    expect(
      screen.queryByRole("heading", { name: /kontakt/i })
    ).not.toBeInTheDocument();

    expect(
      await screen.findByRole("heading", {
        name: /contact/i,
      })
    ).toBeInTheDocument();
  });

  it("renders proper text in both languages.", () => {
    render(<MockApp />);
    resetLanguageToPolish();
    goToContactPageInPl();

    expect(
      screen.getByText(
        /wypełnij formularz by się z nami skontaktować\. jeżeli wolisz inną formę kontaktu, w stopce strony znajduje się nasz adres e\-mail oraz telefon\./i
      )
    ).toBeInTheDocument();

    //en
    changeLanguageToEn();

    expect(
      screen.getByText(/feel free to contact us and we'll be glad to help\./i)
    ).toBeInTheDocument();
  });

  //////////////////////////////////////////

  it("should render form in both languages.", () => {
    render(<MockApp />);
    resetLanguageToPolish();
    goToContactPageInPl();

    expect(
      screen.getByRole("textbox", {
        name: /imię/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", {
        name: /nazwisko/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", {
        name: /e\-mail/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", {
        name: /numer telefonu/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", {
        name: /zapytanie/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /wyczyść/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /wyślij/i,
      })
    ).toBeInTheDocument();

    //en
    changeLanguageToEn();

    expect(
      screen.queryByRole("textbox", {
        name: /imię/i,
      })
    ).not.toBeInTheDocument();

    expect(screen.getByPlaceholderText("Your name")).toBeInTheDocument();

    expect(
      screen.queryByRole("textbox", {
        name: /nazwisko/i,
      })
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("textbox", {
        name: /surname/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", {
        name: /e\-mail/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("textbox", {
        name: /numer telefonu/i,
      })
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("textbox", {
        name: /phone number/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("textbox", {
        name: /zapytanie/i,
      })
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("textbox", {
        name: /your contact message/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: /wyczyść/i,
      })
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /clear/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: /wyślij/i,
      })
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /send/i,
      })
    ).toBeInTheDocument();
  });
});

function goToContactPageInPl() {
  userEvent.click(
    screen.getByRole("link", {
      name: /kontakt/i,
    })
  );
}

function changeLanguageToEn() {
  const langButton = screen.getByRole("button", {
    name: /en/i,
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
