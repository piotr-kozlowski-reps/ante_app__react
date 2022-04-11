import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AdminTitle from "../components/Admin/AdminTitle";
import Footer from "../shared/components/Footer";

const About = () => {
  ////vars
  const lang = useSelector((state) => state.language.lang);

  let clientsContent = "";
  if (lang === "pl") {
    clientsContent = (
      <div id="globe_tabs">
        <div className="blok">
          <h1>BLEND</h1>
          <h2>[PORTUGALIA]</h2>
        </div>
        <div className="blok">
          <h1>EDICOM</h1>
          <h2>[POLSKA]</h2>
        </div>
        <div className="blok">
          <h1>HERMANOWICZ REWSKI ARCHITEKCI</h1>
          <h2>[POLSKA]</h2>
        </div>
        <div className="blok">
          <h1>JEMS ARCHITEKCI</h1>
          <h2>[POLSKA]</h2>
        </div>
        <div className="blok">
          <h1>JOCA FARIA</h1>
          <h2>[MOZAMBIK]</h2>
        </div>
        <div className="blok">
          <h1>KEBETH STUDIO</h1>
          <h2>[POLSKA]</h2>
        </div>
        <div className="blok">
          <h1>MĄKA-SOJKA ARCHITEKCI</h1>
          <h2>[POLSKA]</h2>
        </div>
        <div className="blok">
          <h1>METRI</h1>
          <h2>[POLSKA]</h2>
        </div>
        <div className="blok">
          <h1>MKC ARCHITEKCI</h1>
          <h2>[POLSKA]</h2>
        </div>
        <div className="blok">
          <h1>PM GROUP POLSKA</h1>
          <h2>[POLSKA]</h2>
        </div>
        <div className="blok">
          <h1>POLITECHNIKA ŚLĄSKA</h1>
          <h2>[POLSKA]</h2>
        </div>
        <div className="blok">
          <h1>REMOBUD</h1>
          <h2>[POLSKA]</h2>
        </div>
        <div className="blok">
          <h1>SGI</h1>
          <h2>[POLSKA]</h2>
        </div>
        <div className="blok">
          <h1>TANGRAM KITTERY</h1>
          <h2>[USA]</h2>
        </div>
        <div className="blok">
          <h1>TEVA</h1>
          <h2>[POLSKA]</h2>
        </div>
        <div className="blok">
          <h1>THE VISIONARY WORKS COMPANY</h1>
          <h2>[IRLANDIA]</h2>
        </div>
        <div className="blok">
          <h1>UNSER STROHHAUS</h1>
          <h2>[AUSTRIA]</h2>
        </div>
        <div className="blok">
          <h1>VIRTUELL FORMAT</h1>
          <h2>[NIEMCY]</h2>
        </div>
      </div>
    );
  }
  if (lang === "en") {
    clientsContent = (
      <div id="globe_tabs">
        <div class="blok">
          <h1>BLEND</h1>
          <h2>[PORTUGAL]</h2>
        </div>
        <div class="blok">
          <h1>EDICOM</h1>
          <h2>[POLAND]</h2>
        </div>
        <div class="blok">
          <h1>HERMANOWICZ REWSKI ARCHITEKCI</h1>
          <h2>[POLAND]</h2>
        </div>
        <div class="blok">
          <h1>JEMS ARCHITEKCI</h1>
          <h2>[POLAND]</h2>
        </div>
        <div class="blok">
          <h1>JOCA FARIA</h1>
          <h2>[MOZAMBIQUE]</h2>
        </div>
        <div class="blok">
          <h1>KEBETH STUDIO</h1>
          <h2>[POLAND]</h2>
        </div>
        <div class="blok">
          <h1>MĄKA-SOJKA ARCHITEKCI</h1>
          <h2>[POLAND]</h2>
        </div>
        <div class="blok">
          <h1>METRI</h1>
          <h2>[POLAND]</h2>
        </div>
        <div class="blok">
          <h1>MKC ARCHITEKCI</h1>
          <h2>[POLAND]</h2>
        </div>
        <div class="blok">
          <h1>PM GROUP POLSKA</h1>
          <h2>[POLAND]</h2>
        </div>
        <div class="blok">
          <h1>POLITECHNIKA ŚLĄSKA</h1>
          <h2>[POLAND]</h2>
        </div>
        <div class="blok">
          <h1>REMOBUD</h1>
          <h2>[POLAND]</h2>
        </div>
        <div class="blok">
          <h1>SGI</h1>
          <h2>[POLAND]</h2>
        </div>
        <div class="blok">
          <h1>TANGRAM KITTERY</h1>
          <h2>[USA]</h2>
        </div>
        <div class="blok">
          <h1>TEVA</h1>
          <h2>[POLAND]</h2>
        </div>
        <div class="blok">
          <h1>THE VISIONARY WORKS COMPANY</h1>
          <h2>[IRELAND]</h2>
        </div>
        <div class="blok">
          <h1>UNSER STROHHAUS</h1>
          <h2>[AUSTRIA]</h2>
        </div>
        <div class="blok">
          <h1>VIRTUELL FORMAT</h1>
          <h2>[GERMANY]</h2>
        </div>
      </div>
    );
  }

  ////jsx
  return (
    <Fragment>
      <div id="about" className="container" data-testid="about-page">
        <div className="row">
          <div className="col-lg-12">
            <AdminTitle title={lang === "pl" ? "O nas" : "About"} />
          </div>
        </div>

        <div
          id="portfolio"
          className="container"
          style={{ paddingTop: "5rem" }}
        >
          <div className="row" id="parent">
            <div className="text-center">
              <div className="div-center-no-flex bigger-text">
                <p>
                  {lang === "pl"
                    ? `Firma ANTE została założona w 2000 roku. Naszą specjalnością
                  jest grafika trójwymiarowa.
                  `
                    : `ANTE started in 2000 and our core business is 3D imaging. From full architecture projects visualizations to 360° animations, our portfolio has been growing ever since.`}
                </p>
                <p style={{ textIndent: "35px", textAlign: "justify" }}>
                  {lang === "pl"
                    ? `Główna część naszej działalności związana jest z architekturą.
                  Wykonujemy wizualizacje konkursowe, fotorealistyczne
                  wizualizacje budynków i ich wnętrz, panoramy 360°, animacje
                  (standardowe jak i animacje 360°), wirtualne spacery (w
                  oparciu o silniki Unity / Unreal).`
                    : `A set of trusted co-workers and effective render farm gives us opportunity to answer to extremely short deadlines and an increasing demand for the best image quality available. We've done hundreds of projects and, most important, we've raised to meet expectations of our clients throughout the world.`}
                </p>
                <p style={{ textIndent: "35px", textAlign: "justify" }}>
                  {lang === "pl"
                    ? `Równie chętnie podejmujemy się projektów o innym charakterze.
                  Przykładem może być wykonanie modeli oraz renderingów
                  produktowych (packshoty), wykonywanie modeli w postaci
                  3dmappingu z użyciem Drona, modeli do aplikacji mobilnych,
                  modeli do wypalenia w krysztale itp.,itd.`
                    : `Being a solution provider, we've been exploring most areas of 3D imaging and CGI. Competition visualisations, photorealistic exteriors and interiors, animations (standard as well as 360degrees), virtual walks (Unity/Unreal engine), pack-shots and 3d-models in any form (3dmapping using drones, models for mobile apps, models for crystal burning, etc...) or any graphic project that you think we may be up to.`}
                </p>
                <p
                  style={{
                    textAlign: "center",
                    paddingTop: "75px",
                    margin: "0",
                  }}
                >
                  {lang === "pl"
                    ? `Zapraszamy
                  do zapoznania się z listą naszych klientów oraz do kontaktu z
                  nami:`
                    : `Feel free to contact us and we'll be glad to help.`}
                </p>
                <div
                  className="div-center-no-flex"
                  style={{ paddingTop: "1rem" }}
                >
                  <Link
                    to={`../../${lang}/contact`}
                    data-testid="contact-in-about-page"
                  >
                    {lang === "pl" ? "KONTAKT" : "CONTACT"}
                  </Link>
                </div>
                <div className="div-center-no-flex bigger-text text-center">
                  <p>
                    {lang === "pl"
                      ? ``
                      : `Meanwhile, check our clients list, visit our portfolio and enjoy it.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {clientsContent}
      </div>
      {/* <Footer /> */}
    </Fragment>
  );
};

export default About;

//TODO: take from projects page handling of footer movement if needed
