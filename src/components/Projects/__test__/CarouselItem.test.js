import React from "react";
import { render, screen, cleanup } from "../../../shared/utils/test-utils";

import CarouselItem from "../CarouselItem";

import slider1 from "../../../images/slider_001.png";
import slider1_pl from "../../../images/slider_001_pl.png";
import slider1_en from "../../../images/slider_001_en.png";

afterEach(() => {
  cleanup();
});

describe("CarouselItem", () => {
  it("renders proper 2 images when props provided", () => {
    render(
      <CarouselItem
        carouselCurrentItem={[slider1, slider1_pl, "slider konkursy"]}
      />
    );
    expect(screen.getByTestId("carousel-base-img")).toHaveAttribute(
      "src",
      "slider_001.png"
    );
    expect(screen.getByTestId("carousel-description-img")).toHaveAttribute(
      "src",
      "slider_001_pl.png"
    );
  });
});
