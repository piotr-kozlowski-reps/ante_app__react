import React from "react";
import { render, screen, cleanup } from "../../shared/utils/test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import App from "../../App";
import NotFound from "../NotFound";

// const MockApp = () => {
//   return (
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   );
// };

afterEach(() => {
  cleanup();
});

describe("404 (NotFound)", () => {
  it("should have div with test-id in the DOM.", () => {
    render(<NotFound />);
    expect(screen.getByTestId("404-page")).toBeInTheDocument();
  });

  it("should render image of 404", () => {
    render(<NotFound />);
    const imageOfError = screen.getByRole("img", {
      name: "404 error. There's no such a route.",
    });
    expect(imageOfError).toBeInTheDocument();
    expect(imageOfError).toHaveAttribute(
      "alt",
      "404 error. There's no such a route."
    );
  });
});

// describe(`ABOUT -> tdd approach`, () => {
//

//   it("renders proper header in both languages.", async () => {
//     render(<MockApp />);
//     goToAboutPageInPl();
//     expect(screen.getByRole("heading", { name: /o nas/i })).toBeInTheDocument();
//     expect(
//       screen.queryByRole("heading", { name: /about/i })
//     ).not.toBeInTheDocument();

//     changeLanguageToEn();
//     expect(
//       screen.queryByRole("heading", { name: /o nas/i })
//     ).not.toBeInTheDocument();

//     expect(
//       await screen.findByRole("heading", {
//         name: /about/i,
//       })
//     ).toBeInTheDocument();
//   });

//   it("renders proper text in both languages.", () => {
//     render(<MockApp />);
//     resetLanguageToPolish();
//     goToAboutPageInPl();

//     expect(
//       screen.getByText(
//         /firma ante została założona w 2000 roku\. naszą specjalnością jest grafika trójwymiarowa\./i
//       )
//     ).toBeInTheDocument();

//     expect(
//       screen.getByText(
//         /główna część naszej działalności związana jest z architekturą\. wykonujemy wizualizacje konkursowe, fotorealistyczne wizualizacje budynków i ich wnętrz, panoramy 360°, animacje \(standardowe jak i animacje 360°\), wirtualne spacery \(w oparciu o silniki unity \/ unreal\)\./i
//       )
//     ).toBeInTheDocument();

//     expect(
//       screen.getByText(
//         /równie chętnie podejmujemy się projektów o innym charakterze\. przykładem może być wykonanie modeli oraz renderingów produktowych \(packshoty\), wykonywanie modeli w postaci 3dmappingu z użyciem drona, modeli do aplikacji mobilnych, modeli do wypalenia w krysztale itp\.,itd\./i
//       )
//     ).toBeInTheDocument();

//     expect(
//       screen.getByText(
//         /zapraszamy do zapoznania się z listą naszych klientów oraz do kontaktu z nami:/i
//       )
//     ).toBeInTheDocument();

//     expect(
//       screen.getByText(
//         /zapraszamy do zapoznania się z listą naszych klientów oraz do kontaktu z nami:/i
//       )
//     ).toBeInTheDocument();

//     expect(screen.getByTestId("contact-in-about-page")).toBeInTheDocument();

//     //en
//     changeLanguageToEn();

//     expect(
//       screen.getByText(
//         /ante started in 2000 and our core business is 3d imaging\. from full architecture projects visualizations to 360° animations, our portfolio has been growing ever since\./i
//       )
//     ).toBeInTheDocument();

//     expect(
//       screen.getByText(
//         /a set of trusted co\-workers and effective render farm gives us opportunity to answer to extremely short deadlines and an increasing demand for the best image quality available\. we've done hundreds of projects and, most important, we've raised to meet expectations of our clients throughout the world\./i
//       )
//     ).toBeInTheDocument();

//     expect(
//       screen.getByText(
//         /being a solution provider, we've been exploring most areas of 3d imaging and cgi\. competition visualisations, photorealistic exteriors and interiors, animations \(standard as well as 360degrees\), virtual walks \(unity\/unreal engine\), pack\-shots and 3d\-models in any form \(3dmapping using drones, models for mobile apps, models for crystal burning, etc\.\.\.\) or any graphic project that you think we may be up to\./i
//       )
//     ).toBeInTheDocument();

//     expect(
//       screen.getByText(/feel free to contact us and we'll be glad to help\./i)
//     ).toBeInTheDocument();

//     expect(
//       screen.getByTestId("contact-in-about-page", { name: "CONTACT" })
//     ).toBeInTheDocument();

//     expect(
//       screen.getByText(
//         /meanwhile, check our clients list, visit our portfolio and enjoy it\./i
//       )
//     ).toBeInTheDocument();
//   });

// function goToAboutPageInPl() {
//   userEvent.click(
//     screen.getByRole("link", {
//       name: /o nas/i,
//     })
//   );
// }

// function changeLanguageToEn() {
//   const langButton = screen.getByRole("button", {
//     name: /en/i,
//   });
//   userEvent.click(langButton);
// }

// function resetLanguageToPolish() {
//   if (
//     !screen.queryByRole("link", {
//       name: /o nas/i,
//     })
//   ) {
//     const langButton = screen.queryByRole("button", {
//       name: /pl/i,
//     });
//     userEvent.click(langButton);
//   }
// }

////utils
