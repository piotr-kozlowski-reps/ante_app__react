import React from "react";
import {
  render,
  screen,
  cleanup,
  waitFor,
  debug,
  act,
} from "../../shared/utils/test-utils";
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

describe(`CONTACT: `, () => {
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

  it("should render form in both languages.", () => {
    render(<MockApp />);
    resetLanguageToPolish();
    goToContactPageInPl();

    expect(getFormField("imię")).toBeInTheDocument();
    expect(getFormField("nazwisko")).toBeInTheDocument();
    expect(queryFormField("surname")).not.toBeInTheDocument();
    expect(getFormField("e-mail")).toBeInTheDocument();
    expect(getFormField("numer telefonu")).toBeInTheDocument();
    expect(getFormField("zapytanie")).toBeInTheDocument();
    expect(getFormField("numer telefonu")).toBeInTheDocument();

    expect(getButton("wyczyść")).toBeInTheDocument();
    expect(getButton("wyślij")).toBeInTheDocument();

    //en
    changeLanguageToEn();

    expect(queryFormField("imię")).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your name")).toBeInTheDocument();
    expect(queryFormField("nazwisko")).not.toBeInTheDocument();
    expect(getFormField("surname")).toBeInTheDocument();
    expect(getFormField("e-mail")).toBeInTheDocument();
    expect(queryFormField("numer telefonu")).not.toBeInTheDocument();
    expect(getFormField("phone number")).toBeInTheDocument();
    expect(queryFormField("zapytanie")).not.toBeInTheDocument();
    expect(getFormField("your contact message")).toBeInTheDocument();
    expect(queryButton("wyczyść")).not.toBeInTheDocument();
    expect(getButton("clear")).toBeInTheDocument();
    expect(queryButton("wyślij")).not.toBeInTheDocument();
    expect(getButton("send")).toBeInTheDocument();
  });

  it("Contact Form -> Happy Path - should be sent when all fields are filled", async () => {
    render(<MockApp />);
    resetLanguageToPolish();
    goToContactPageInPl();
    const onSubmit = jest.fn();

    userEvent.type(getFormField("imię"), "Imię");
    userEvent.type(getFormField("nazwisko"), "Nazwisko");
    userEvent.type(getFormField("e-mail"), "test@test.pl");
    userEvent.type(getFormField("numer telefonu"), "9649234");
    userEvent.type(getFormField("zapytanie"), "Zapytanie jakieś tutaj");

    userEvent.click(getButton("wyślij"));

    // await waitFor(() => {
    //   expect(onSubmit).toHaveBeenCalledWith({ lazy: true });
    // });

    // await waitFor(() => {
    //   expect(onSubmit).toHaveBeenCalledTimes(1);
    // });
    //TODO: how to check if there was submission
  });

  it("should show all errors when empty form is sent", async () => {
    render(<MockApp />);
    resetLanguageToPolish();
    goToContactPageInPl();

    userEvent.click(getButton("wyślij"));

    expect(
      await screen.findByText(/entering name is required\./i)
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/entering surname is required\./i)
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/entering e\-mail is required\./i)
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/entering your contact message is required\./i)
    ).toBeInTheDocument();
  });
});

describe("email field", () => {
  it("shows error when wrong email is provided", async () => {
    render(<MockApp />);
    resetLanguageToPolish();
    goToContactPageInPl();

    userEvent.type(getFormField("e-mail"), "test");
    userEvent.click(getButton("wyślij"));

    expect(
      await screen.findByText(/enter valid e\-mail, please\./i)
    ).toBeInTheDocument();

    userEvent.type(getFormField("e-mail"), "test@test");
    userEvent.click(getButton("wyślij"));

    expect(
      await screen.findByText(/enter valid e\-mail, please\./i)
    ).toBeInTheDocument();

    userEvent.type(getFormField("e-mail"), "@test.pl");
    userEvent.click(getButton("wyślij"));

    expect(
      await screen.findByText(/enter valid e\-mail, please\./i)
    ).toBeInTheDocument();

    userEvent.type(getFormField("e-mail"), "test.pl");
    userEvent.click(getButton("wyślij"));

    expect(
      await screen.findByText(/enter valid e\-mail, please\./i)
    ).toBeInTheDocument();
  });
});

describe("Zapytanie field", () => {
  it("shows error when less than 10 chars are provided", async () => {
    render(<MockApp />);
    resetLanguageToPolish();
    goToContactPageInPl();

    userEvent.type(getFormField("zapytanie"), "123456789");
    userEvent.click(getButton("wyślij"));

    expect(
      await screen.findByText(/textcontent must be at least 10 characters/i)
    ).toBeInTheDocument();
  });

  it("shows error when less none char is provided", async () => {
    render(<MockApp />);
    resetLanguageToPolish();
    goToContactPageInPl();

    userEvent.type(getFormField("zapytanie"), "");
    userEvent.click(getButton("wyślij"));

    expect(
      await screen.findByText(/entering your contact message is required/i)
    ).toBeInTheDocument();
  });
});

//utils
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

function getFormField(fieldName) {
  const regex = new RegExp(fieldName, "i");
  return screen.getByRole("textbox", {
    name: regex,
  });
}

function queryFormField(fieldName) {
  const regex = new RegExp(fieldName, "i");
  return screen.queryByRole("textbox", {
    name: regex,
  });
}

function getButton(buttonName) {
  const regex = new RegExp(buttonName, "i");
  return screen.getByRole("button", {
    name: regex,
  });
}

function queryButton(buttonName) {
  const regex = new RegExp(buttonName, "i");
  return screen.queryByRole("button", {
    name: regex,
  });
}
