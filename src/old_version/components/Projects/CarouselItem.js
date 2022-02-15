import React, {
  Fragment,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
} from "react";
import { CSSTransition } from "react-transition-group";



const CarouselItem = ({ carouselCurrentItem }) => {
  //
  //vars
  const [isShowSlide, setIsShowSlide] = useState(false);
  const [slide, slideWithDescription, description] = carouselCurrentItem;
  // const [isVisibleOverlay, setIsVisibleOverlay] = useState(false);
  //refs
  let slider1 = useRef(null);

  useLayoutEffect(() => {
    setIsShowSlide(true);
  }, [])

  // useEffect(() => {
  //   setIsShowSlide(false);
  // }, [carouselCurrentItem])

  //content
  let content = null;
  if (!carouselCurrentItem) content = null;
  else
    content = (
      <CSSTransition in={isShowSlide} timeout={4000} classNames="slide-transition">
      <img
        // style={{ opacity: 0 }}
        ref={(el) => (slider1 = el)}
        src={slideWithDescription}
        alt={description}
        // style={{ opacity: 0 }}
        // onMouseEnter={changeGraphicToFullHandler}
        // onMouseLeave={changeGraphicToNameHandler}
      />
      </CSSTransition>
    );

  //
  //logic

  // function changeGraphicToFullHandler() {
  //   console.log("changeGraphicToFullHandler");
  //   setIsVisibleOverlay(true);
  // }
  // function changeGraphicToNameHandler() {
  //   console.log("changeGraphicToNameHandler");
  //   setIsVisibleOverlay(false);
  // }

  //
  //jsx
  return <Fragment>{content}</Fragment>;
};

export default CarouselItem;
