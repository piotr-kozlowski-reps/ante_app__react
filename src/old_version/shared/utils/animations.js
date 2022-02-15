import { gsap } from "gsap";

export const backgroundRevealDown = (duration, ...elements) => {
  gsap.from(elements, {
    duration: duration,
    height: 0,
    ease: "power3.inOut",
    stagger: {
      amount: 0.13,
    },
  });
};

export const fadeInUp = (
  duration,
  delay = 0,
  yAmount = 60,
  staggerAmount = 0.1,
  ...elements
) => {
  gsap.from(elements, {
    duration: duration,
    y: yAmount,
    delay: delay,
    ease: "power3.inOut",
    opacity: 0,
    stagger: {
      amount: staggerAmount,
    },
  });
};

export const fadeFromRight = (
  duration,
  delay = 0,
  xAmount = 10,
  staggerAmount = 0.1,
  ...elements
) => {
  gsap.from(elements, {
    duration: duration,
    x: xAmount,
    delay: delay,
    ease: "power3.inOut",
    opacity: 0,
    stagger: {
      amount: staggerAmount,
    },
  });
};

export const fadeFromRightPlusScale = (
  duration,
  delay = 0,
  xAmount = 10,
  scale = 110,
  staggerAmount = 0.1,
  ...elements
) => {
  gsap.from(elements, {
    duration: duration,
    x: xAmount,
    delay: delay,
    ease: "power3.inOut",
    opacity: 0,
    scale: scale,
    stagger: {
      amount: staggerAmount,
    },
  });
};

export const fadeOutToLeft = (
  duration,
  delay = 0,
  xAmount = -10,
  staggerAmount = 0.1,
  ...elements
) => {
  gsap.to(elements, {
    duration: duration,
    x: xAmount,
    delay: delay,
    ease: "power3.inOut",
    opacity: 0,
    stagger: {
      amount: staggerAmount,
    },
  });
};
