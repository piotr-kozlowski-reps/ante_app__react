import React from "react";
import { BrowserRouter, Router } from "react-router-dom";
import { render, screen, cleanup } from "./shared/utils/test-utils";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";
import { authActions } from "./shared/store/auth-slice";

//mock localStorage
import { localStorageMock } from "../__testsUtils__/mock-local-storage.";

import App from "./App";

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

describe("APP => general", () => {
  it("renders projects page initialy", () => {
    render(<MockApp />);
    const projectsPage = screen.getByTestId("projects-page");
    expect(projectsPage).toBeInTheDocument();
  });
});

describe("APP => automatic logging in with localStorageData", () => {
  beforeEach(() => {
    localStorageMock.clear("userData");
  });
  it("should show links ADMIN and LOGOUT when proper data is stored in localStorage", () => {
    localStorageMock.setItem(
      "userData",
      JSON.stringify({
        login: "PEgaz",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IlBFZ2F6IiwiaWQiOiI2MjQ0MGMxMGJhMWM1YjAwNjhhMzlmOTgiLCJpYXQiOjE2NDkwMTYxMjYsImV4cCI6MTY0OTAxOTcyNn0.yq4TFV84LJ3d8CBzuIKPhV43aPCH-0NSUP6butBt3GA",
        expiration: "2150-04-03T21:02:06.736Z",
      })
    );
    render(<MockApp />);

    const loginElement = screen.queryByText(/LOGIN/i);
    const adminElement = screen.queryByText(/ADMIN/i);
    const logoutElement = screen.queryByText(/LOGOUT/i);
    expect(loginElement).not.toBeInTheDocument();
    expect(adminElement).toBeInTheDocument();
    expect(logoutElement).toBeInTheDocument();
  });

  it("should show links LOGIN and not show ADMIN and LOGOUT when no data is stored in localStorage", () => {
    render(<MockApp />);

    const loginElement = screen.queryByText(/LOGIN/i); //?
    const adminElement = screen.queryByText(/ADMIN/i); //?
    const logoutElement = screen.queryByText(/LOGOUT/i); //?
    expect(loginElement).toBeInTheDocument();
    expect(adminElement).not.toBeInTheDocument();
    expect(logoutElement).not.toBeInTheDocument();
  });

  it("should show links LOGIN and not show ADMIN and LOGOUT when data that is stored in localStorage is false (no token)", () => {
    localStorageMock.setItem(
      "userData",
      JSON.stringify({
        login: "PEgaz",
        token: null,
        expiration: "2150-04-03T21:02:06.736Z",
      })
    );

    console.log(localStorage.getItem("userData"));
    render(<MockApp />);

    const loginElement = screen.queryByText(/LOGIN/i);
    const adminElement = screen.queryByText(/ADMIN/i);
    const logoutElement = screen.queryByText(/LOGOUT/i);
    expect(loginElement).toBeInTheDocument();
    expect(adminElement).not.toBeInTheDocument();
    expect(logoutElement).not.toBeInTheDocument();
  });

  it("should show links LOGIN and not show ADMIN and LOGOUT when data that is stored in localStorage is false (no expiration data)", () => {
    localStorageMock.setItem(
      "userData",
      JSON.stringify({
        login: "PEgaz",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IlBFZ2F6IiwiaWQiOiI2MjQ0MGMxMGJhMWM1YjAwNjhhMzlmOTgiLCJpYXQiOjE2NDkwMTYxMjYsImV4cCI6MTY0OTAxOTcyNn0.yq4TFV84LJ3d8CBzuIKPhV43aPCH-0NSUP6butBt3GA",
        expiration: undefined,
      })
    );

    render(<MockApp />);

    const loginElement = screen.queryByText(/LOGIN/i);
    const adminElement = screen.queryByText(/ADMIN/i);
    const logoutElement = screen.queryByText(/LOGOUT/i);
    expect(loginElement).toBeInTheDocument();
    expect(adminElement).not.toBeInTheDocument();
    expect(logoutElement).not.toBeInTheDocument();
  });
});

describe("APP => logging out when time expires (useEffect)", () => {
  beforeEach(() => {
    localStorageMock.clear("userData");
  });

  it("should stay logged it when expiration time haven't expired.", () => {
    localStorageMock.setItem(
      "userData",
      JSON.stringify({
        login: "PEgaz",
        token: "sfvsdfvsdfvsdfvsdfv",
        expiration: "2150-04-03T21:02:06.736Z",
      })
    );

    render(<MockApp />);

    const loginElement = screen.queryByText(/LOGIN/i); //?
    const adminElement = screen.queryByText(/ADMIN/i); //?
    const logoutElement = screen.queryByText(/LOGOUT/i); //?
    expect(loginElement).not.toBeInTheDocument();
    expect(adminElement).toBeInTheDocument();
    expect(logoutElement).toBeInTheDocument();
  });

  it("should log out when expiration time has expired.", () => {
    localStorageMock.setItem(
      "userData",
      JSON.stringify({
        login: "PEgaz",
        token: "sdfvsdfvsdfvdf",
        expiration: "2019-04-03T21:02:06.736Z",
      })
    );

    render(<MockApp />);

    const loginElement = screen.queryByText(/LOGIN/i); //?
    const adminElement = screen.queryByText(/ADMIN/i); //?
    const logoutElement = screen.queryByText(/LOGOUT/i); //?
    expect(loginElement).toBeInTheDocument();
    expect(adminElement).not.toBeInTheDocument();
    expect(logoutElement).not.toBeInTheDocument();
  });
});

//TODO: testing automatic footer placement - seems not to work always
