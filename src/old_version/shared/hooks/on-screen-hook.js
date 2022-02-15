import { useState, useEffect } from "react";

export const useOnScreen = (ref) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = new IntersectionObserver(([entry]) =>
    setIsIntersecting(entry.isIntersecting)
  );

  useEffect(() => {
    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
};
