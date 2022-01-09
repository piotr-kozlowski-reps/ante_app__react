import React, { Fragment } from "react";

const CarouselItem = ({ carouselCurrentItem }) => {
  if (!carouselCurrentItem) return <Fragment></Fragment>;
  const [slide, slideWithDescription, description] = carouselCurrentItem;

  return (
    <Fragment>
      <img
        // style={{ opacity: 0 }}
        // ref={(el) => (slider1 = el)}
        src={slideWithDescription}
        alt={description}
      />
      {/* TODO: make nice animations in slider with gsap*/}
    </Fragment>
  );
};

export default CarouselItem;
