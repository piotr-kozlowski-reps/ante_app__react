import { useEffect, useState } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);

  const handleWindowResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    }

    if (window.innerWidth > 768) {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return isMobile;
}
