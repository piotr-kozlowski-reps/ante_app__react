import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fadeFromRight } from "../../shared/utils/animations";

import slider1 from "../../images/slider_001.png";
import slider1_pl from "../../images/slider_001_pl.png";
import slider1_en from "../../images/slider_001_en.png";

import slider2 from "../../images/slider_002.png";
import slider2_pl from "../../images/slider_002_pl.png";
import slider2_en from "../../images/slider_002_en.png";

import slider3 from "../../images/slider_003.png";
import slider3_pl from "../../images/slider_003_pl.png";
import slider3_en from "../../images/slider_003_en.png";

import slider4 from "../../images/slider_004.png";
import slider4_pl from "../../images/slider_004_pl.png";
import slider4_en from "../../images/slider_004_en.png";

import slider5 from "../../images/slider_005.png";
import slider5_pl from "../../images/slider_005_pl.png";
import slider5_en from "../../images/slider_005_en.png";

import slider6 from "../../images/slider_006.png";
import slider6_pl from "../../images/slider_006_pl.png";
import slider6_en from "../../images/slider_006_en.png";
import CarouselItem from "./CarouselItem";

const carouselPL = [
  [slider1, slider1_pl, "slider konkursy"],
  [slider2, slider2_pl, "slider wnętrza"],
  [slider3, slider3_pl, "slider zewnętrza"],
  [slider4, slider4_pl, "slider animacje"],
  [slider5, slider5_pl, "slider modele3d"],
  [slider6, slider6_pl, "slider panoramy"],
];

const carouselEN = [
  [slider1, slider1_en, "slider competitions"],
  [slider2, slider2_en, "slider interiors"],
  [slider3, slider3_en, "slider exteriors"],
  [slider4, slider4_en, "slider animations"],
  [slider5, slider5_en, "slider 3dmodels"],
  [slider6, slider6_en, "slider panoramas"],
];

const Carousel = () => {
  //
  //vars
  const lang = useSelector((state) => state.language.lang);
  const [currentArrayByLanguage, setCurrentArrayByLanguage] = useState(
    lang === "pl" ? carouselPL : carouselEN
  );
  const [carouselCurrentItem, setCarouselCurrentItem] = useState(
    currentArrayByLanguage[0]
  );

  useLayoutEffect(() => {
    let index = 1;
    const changeSlide = () => {
      const itemsAmount = currentArrayByLanguage.length;

      if (index < itemsAmount - 1) {
        setCarouselCurrentItem(currentArrayByLanguage[index]);
        index++;
      } else {
        setCarouselCurrentItem(currentArrayByLanguage[index]);
        index = 0;
      }
    };
    const changeSlideInterval = setInterval(changeSlide, 200);

    return () => {
      clearInterval(changeSlideInterval);
    };
  }, [currentArrayByLanguage]);

  useEffect(() => {
    setCurrentArrayByLanguage(lang === "pl" ? carouselPL : carouselEN);
  }, [lang]);

  //
  //jsx
  return (
    <div id="gallery">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              id="galleryCarousel"
              className="carousel slide carousel-fade"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="item active">
                  <CarouselItem carouselCurrentItem={carouselCurrentItem} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
