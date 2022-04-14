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

describe(`ABOUT -> tdd approach`, () => {
  it("should have div with test-id in the DOM.", () => {
    render(<MockApp />);
    goToAboutPageInPl();
    expect(screen.getByTestId("about-page")).toBeInTheDocument();
  });

  it("renders proper header in both languages.", async () => {
    render(<MockApp />);
    goToAboutPageInPl();
    expect(screen.getByRole("heading", { name: /o nas/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /about/i })
    ).not.toBeInTheDocument();

    changeLanguageToEn();
    expect(
      screen.queryByRole("heading", { name: /o nas/i })
    ).not.toBeInTheDocument();

    expect(
      await screen.findByRole("heading", {
        name: /about/i,
      })
    ).toBeInTheDocument();
  });

  it("renders proper text in both languages.", () => {
    render(<MockApp />);
    resetLanguageToPolish();
    goToAboutPageInPl();

    expect(
      screen.getByText(
        /firma ante została założona w 2000 roku\. naszą specjalnością jest grafika trójwymiarowa\./i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /główna część naszej działalności związana jest z architekturą\. wykonujemy wizualizacje konkursowe, fotorealistyczne wizualizacje budynków i ich wnętrz, panoramy 360°, animacje \(standardowe jak i animacje 360°\), wirtualne spacery \(w oparciu o silniki unity \/ unreal\)\./i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /równie chętnie podejmujemy się projektów o innym charakterze\. przykładem może być wykonanie modeli oraz renderingów produktowych \(packshoty\), wykonywanie modeli w postaci 3dmappingu z użyciem drona, modeli do aplikacji mobilnych, modeli do wypalenia w krysztale itp\.,itd\./i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /zapraszamy do zapoznania się z listą naszych klientów oraz do kontaktu z nami:/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /zapraszamy do zapoznania się z listą naszych klientów oraz do kontaktu z nami:/i
      )
    ).toBeInTheDocument();

    expect(screen.getByTestId("contact-in-about-page")).toBeInTheDocument();

    //en
    changeLanguageToEn();

    expect(
      screen.getByText(
        /ante started in 2000 and our core business is 3d imaging\. from full architecture projects visualizations to 360° animations, our portfolio has been growing ever since\./i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /a set of trusted co\-workers and effective render farm gives us opportunity to answer to extremely short deadlines and an increasing demand for the best image quality available\. we've done hundreds of projects and, most important, we've raised to meet expectations of our clients throughout the world\./i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /being a solution provider, we've been exploring most areas of 3d imaging and cgi\. competition visualisations, photorealistic exteriors and interiors, animations \(standard as well as 360degrees\), virtual walks \(unity\/unreal engine\), pack\-shots and 3d\-models in any form \(3dmapping using drones, models for mobile apps, models for crystal burning, etc\.\.\.\) or any graphic project that you think we may be up to\./i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(/feel free to contact us and we'll be glad to help\./i)
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("contact-in-about-page", { name: "CONTACT" })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /meanwhile, check our clients list, visit our portfolio and enjoy it\./i
      )
    ).toBeInTheDocument();
  });

  it("should render proper image in both languages.", () => {
    render(<MockApp />);
    resetLanguageToPolish();
    goToAboutPageInPl();

    expect(
      screen.getByRole("heading", {
        name: /blend/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /\[portugalia\]/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /EDICOM/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getAllByRole("heading", {
        name: /\[POLSKA\]/i,
      }).length
    ).toBe(12);

    expect(
      screen.getByRole("heading", {
        name: /hermanowicz rewski architekci/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /JEMS ARCHITEKCI/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /JOCA FARIA/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /\[MOZAMBIK\]/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /KEBETH STUDIO/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /MĄKA-SOJKA ARCHITEKCI/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /METRI/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /MKC ARCHITEKCI/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /PM GROUP POLSKA/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /POLITECHNIKA ŚLĄSKA/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /REMOBUD/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /SGI/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /TANGRAM KITTERY/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /\[USA\]/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /TEVA/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /THE VISIONARY WORKS COMPANY/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /\[IRLANDIA\]/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /UNSER STROHHAUS/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /\[AUSTRIA\]/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /VIRTUELL FORMAT/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /\[NIEMCY\]/i,
      })
    ).toBeInTheDocument();

    //en
    changeLanguageToEn();

    expect(
      screen.getByRole("heading", {
        name: /blend/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /\[PORTUGAL\]/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /EDICOM/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getAllByRole("heading", {
        name: /\[POLAND\]/i,
      }).length
    ).toBe(12);

    expect(
      screen.getByRole("heading", {
        name: /hermanowicz rewski architekci/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /JEMS ARCHITEKCI/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /JOCA FARIA/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /\[MOZAMBIQUE\]/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /KEBETH STUDIO/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /MĄKA-SOJKA ARCHITEKCI/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /METRI/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /MKC ARCHITEKCI/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /PM GROUP POLSKA/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /POLITECHNIKA ŚLĄSKA/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /REMOBUD/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /SGI/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /TANGRAM KITTERY/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /\[USA\]/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /TEVA/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /THE VISIONARY WORKS COMPANY/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /\[IRELAND\]/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /UNSER STROHHAUS/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /\[AUSTRIA\]/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /VIRTUELL FORMAT/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /\[GERMANY\]/i,
      })
    ).toBeInTheDocument();
  });
});

function goToAboutPageInPl() {
  userEvent.click(
    screen.getByRole("link", {
      name: /o nas/i,
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
