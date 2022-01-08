import React, { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Header from "./shared/Navigation/Header";
import MainNavigation from "./shared/Navigation/MainNavigation";
import BackgroundTopElements from "./components/BackgroundTopElements";

function App() {
  //
  //jsx
  return (
    <Fragment>
      <BackgroundTopElements />

      <nav className="navbar">
        <Header>
          <MainNavigation />
        </Header>

        {/* stare */}

        {/* 
    <div id="gallery">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div id="galleryCarousel" class="carousel slide carousel-fade" data-ride="carousel">
              <!-- Kontener dla slajdów -->
              <div class="carousel-inner">
                <div class="item active">
                  <img src="images/slider_pl_001.png" alt="slider konkursy opis" />
                </div>
                <div class="item">
                  <img src="images/slider_pl_002.png" alt="slider konkursy" />
                </div>
				<div class="item">
                  <img src="images/slider_pl_003.png" alt="slider wnętrza opis" />
                </div>
				<div class="item">
                  <img src="images/slider_pl_004.png" alt="slider wnętrza" />
                </div>
				<div class="item">
                  <img src="images/slider_pl_005.png" alt="slider zewnętrza opis" />
                </div>
				<div class="item">
                  <img src="images/slider_pl_006.png" alt="slider zewnętrza">
                </div>
				<div class="item">
                  <img src="images/slider_pl_007.png" alt="slider animacje opis">
                </div>
				<div class="item">
                  <img src="images/slider_pl_008.png" alt="slider animacje">
                </div>
				<div class="item">
                  <img src="images/slider_pl_009.png" alt="slider modele3d opis">
                </div>
				<div class="item">
                  <img src="images/slider_pl_010.png" alt="slider modele3d">
                </div>
				<div class="item">
                  <img src="images/slider_pl_011.png" alt="slider packshoty opis">
                </div>
				<div class="item">
                  <img src="images/slider_pl_012.png" alt="slider packshoty">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}

        {/* <div id="the-sticky-div" class="container"> 
      <div class="row">
        <div class="col-lg-12">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#defaultNavbar1"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
          </div>
          <h2>Portfolio</h2>
  
        </div>
  
      </div>
      <div class="row menu">
        <div class="col-lg-12">
          <div class="collapse navbar-collapse" id="defaultNavbar1">
            <ul class="nav navbar-nav">
              <li class="active cat" id="all"><a href="#wszystkie">Wszystkie<span class="sr-only">(current)</span></a></li>
              <li class="cat" id="comp"><a href="#konkursy">Konkursy</a></li>
              <li class="cat" id="int"><a href="#wnetrza">Wnętrza</a></li>
              <li class="cat" id="ext"><a href="#zewnetrza">Zewnętrza</a></li>
              <li class="cat" id="anim"><a href="#animacje">Animacje</a></li>
              <li class="cat" id="3dmod"><a href="#modele3d">Modelowanie produktów</a></li>
              <li class="cat" id="pano"><a href="#panoramy360">Panoramy 360°</a></li>
			  <li class="cat" id="arapps"><a href="#arapps">AR apps</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div> */}
        {/* <div id="my-bg"></div> */}
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to={`/pl/projects`} />} />
        <Route path="/pl/projects" element={<Projects />} />
        <Route path="/en/projects" element={<Projects />} />
        <Route path="/pl/contact" element={<Contact />} />
        <Route path="/en/contact" element={<Contact />} />
        <Route path="/pl/about" element={<About />} />
        <Route path="/en/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
}

export default App;
