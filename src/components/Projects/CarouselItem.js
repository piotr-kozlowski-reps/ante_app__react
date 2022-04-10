import React, { Fragment, useLayoutEffect, useRef, useState } from "react";

const CarouselItem = ({ carouselCurrentItem }) => {
  ////vars
  const [isShowSlide, setIsShowSlide] = useState(false);
  const [slide, slideWithDescription, description] = carouselCurrentItem;

  useLayoutEffect(() => {
    setIsShowSlide(true);
  }, []);

  ////jsx
  return (
    <Fragment>
      <div className="item active">
        <img
          data-testid="carousel-base-img"
          src={slide}
          alt={description}
          className="carousel-img-transform-in"
        />
        <img
          data-testid="carousel-description-img"
          src={slideWithDescription}
          alt={description}
          className="carousel-img-transform-out"
        />
      </div>
    </Fragment>
  );
};

export default CarouselItem;
