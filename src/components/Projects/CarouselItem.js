import React, {
  Fragment,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";

import { fadeFromRight } from "../../shared/utils/animations";

const CarouselItem = ({ carouselCurrentItem }) => {
  //
  //vars
  const [slide, slideWithDescription, description] = carouselCurrentItem;
  const [isVisibleOverlay, setIsVisibleOverlay] = useState(false);
  //refs
  let slider1 = useRef(null);

  //content
  let content = null;
  if (!carouselCurrentItem) content = null;
  else
    content = (
      <img
        // style={{ opacity: 0 }}
        ref={(el) => (slider1 = el)}
        src={isVisibleOverlay ? slide : slideWithDescription}
        alt={description}
        style={{ opacity: 0 }}
        // onMouseEnter={changeGraphicToFullHandler}
        // onMouseLeave={changeGraphicToNameHandler}
      />
    );

  //
  //logic

  function changeGraphicToFullHandler() {
    console.log("changeGraphicToFullHandler");
    setIsVisibleOverlay(true);
  }
  function changeGraphicToNameHandler() {
    console.log("changeGraphicToNameHandler");
    setIsVisibleOverlay(false);
  }

  //
  //jsx
  return <Fragment>{content}</Fragment>;
};

export default CarouselItem;
