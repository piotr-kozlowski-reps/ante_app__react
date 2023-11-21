import React, { Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { linksHoverVariants } from "../utils/framerMotionAnimationsVariants";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLoginModal } from "../hooks/useLoginModal";
import Separator from "../components/Separator";

export default function MobileNavigation(props) {
  ////vars
  const { setHamburgerClicked, hamburgerRef } = props;
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const queryTypeExtracted = params.get("type") ? params.get("type") : "all";
  const lang = useSelector((state) => state.language.lang);
  const pixelMoveContainerAmount = 100;
  const containerVariant = {
    hidden: {
      y: `${pixelMoveContainerAmount}px`,
      opacity: 0,
    },
    visible: {
      y: 0,
      scale: 1,
      opacity: 1,
    },
    exit: {
      y: `-${pixelMoveContainerAmount}px`,
      opacity: 0,
    },
  };
  const mobileVariant = {
    hidden: {
      opacity: 0,
      x: "50%",
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      x: "50%",
    },
  };

  console.log({ location });
  const isInProjects =
    location.pathname.endsWith("/projects") ||
    /projects\?type=.+/g.test(location.pathname);
  // location.pathname.test(/projects\?type=.+/g);
  const closeMobileMenu = () => {
    // setHamburgerClicked(false);
    hamburgerRef.current.click();
  };

  ////jsx
  return (
    <motion.nav
      variants={containerVariant}
      // initial="hidden"
      // animate="visible"
      // exit="exit"
      aria-labelledby="main_navigation_heading"
    >
      <AnimatePresence mode="wait">
        <motion.div
          variants={mobileVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="mobile-menu z-10 bg-skin-main-bg "
        >
          <div className="bg-skin-fill ">
            <ul className="mobile-ul">
              <motion.li
                variants={linksHoverVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className=""
                onClick={closeMobileMenu}
              >
                <NavLink
                  to={`../../${lang}/projects`}
                  className={({ isActive }) =>
                    "main-nav-link main-mobile-nav-link " +
                    (isActive
                      ? "main-nav-link-active main-mobile-nav-link-active"
                      : "")
                  }
                >
                  {lang === "pl" ? "Projekty" : "Projects"}
                </NavLink>
              </motion.li>

              <motion.li
                variants={linksHoverVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                onClick={closeMobileMenu}
              >
                <NavLink
                  to={`../../${lang}/about`}
                  className={({ isActive }) =>
                    "main-nav-link main-mobile-nav-link" +
                    (isActive
                      ? " main-nav-link-active main-mobile-nav-link-active"
                      : "")
                  }
                >
                  {lang === "pl" ? "O nas" : "About"}
                </NavLink>
              </motion.li>

              <motion.li
                variants={linksHoverVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                onClick={closeMobileMenu}
              >
                <NavLink
                  to={`../../${lang}/contact`}
                  className={({ isActive }) =>
                    "main-nav-link main-mobile-nav-link" +
                    (isActive
                      ? " main-nav-link-active main-mobile-nav-link-active"
                      : "")
                  }
                >
                  {lang === "pl" ? "Kontakt" : "Contact"}
                </NavLink>
              </motion.li>

              {isInProjects ? (
                <Fragment>
                  <Separator />
                  <p style={{ marginBottom: "-2px" }}>PORTFOLIO</p>

                  <motion.li
                    className="cat"
                    variants={linksHoverVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    onClick={closeMobileMenu}
                  >
                    <NavLink
                      to={`?type=all`}
                      className={
                        queryTypeExtracted === "all"
                          ? "main-nav-link  main-nav-link-active main-mobile-nav-link-active"
                          : "main-nav-link main-mobile-nav-link"
                      }
                    >
                      {lang === "pl" ? "Wszystkie" : "all"}
                    </NavLink>
                  </motion.li>

                  <motion.li
                    className="cat"
                    variants={linksHoverVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    onClick={closeMobileMenu}
                  >
                    <NavLink
                      to={`?type=competitions`}
                      className={
                        queryTypeExtracted === "competitions"
                          ? "main-nav-link  main-nav-link-active main-mobile-nav-link-active"
                          : "main-nav-link main-mobile-nav-link"
                      }
                    >
                      {lang === "pl" ? "Konkursy" : "competitions"}
                    </NavLink>
                  </motion.li>

                  <motion.li
                    className="cat"
                    variants={linksHoverVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    onClick={closeMobileMenu}
                  >
                    <NavLink
                      to={`?type=interiors`}
                      className={
                        queryTypeExtracted === "interiors"
                          ? "main-nav-link  main-nav-link-active main-mobile-nav-link-active"
                          : "main-nav-link main-mobile-nav-link"
                      }
                    >
                      {lang === "pl" ? "Wnętrza" : "Interiors"}
                    </NavLink>
                  </motion.li>

                  <motion.li
                    className="cat"
                    variants={linksHoverVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    onClick={closeMobileMenu}
                  >
                    <NavLink
                      to={`?type=exteriors`}
                      className={
                        queryTypeExtracted === "exteriors"
                          ? "main-nav-link  main-nav-link-active main-mobile-nav-link-active"
                          : "main-nav-link main-mobile-nav-link"
                      }
                    >
                      {lang === "pl" ? "Zewnętrza" : "Exteriors"}
                    </NavLink>
                  </motion.li>

                  <motion.li
                    className="cat"
                    variants={linksHoverVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    onClick={closeMobileMenu}
                  >
                    <NavLink
                      to={`?type=animations`}
                      className={
                        queryTypeExtracted === "animations"
                          ? "main-nav-link  main-nav-link-active main-mobile-nav-link-active"
                          : "main-nav-link main-mobile-nav-link"
                      }
                    >
                      {lang === "pl" ? "Animacje" : "Animations"}
                    </NavLink>
                  </motion.li>

                  <motion.li
                    className="cat "
                    variants={linksHoverVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    onClick={closeMobileMenu}
                  >
                    <div>
                      <NavLink
                        to={`?type=3dmodeling`}
                        className={
                          queryTypeExtracted === "3dmodeling"
                            ? "main-nav-link  main-nav-link-active main-mobile-nav-link-active"
                            : "main-nav-link main-mobile-nav-link"
                        }
                        style={{ float: "right" }}
                      >
                        {lang === "pl"
                          ? "Modelowanie produktów"
                          : "Products Modeling"}
                      </NavLink>
                    </div>
                  </motion.li>

                  <motion.li
                    className="cat"
                    variants={linksHoverVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    onClick={closeMobileMenu}
                  >
                    <NavLink
                      to={`?type=panoramas`}
                      className={
                        queryTypeExtracted === "panoramas"
                          ? "main-nav-link  main-nav-link-active main-mobile-nav-link-active"
                          : "main-nav-link main-mobile-nav-link"
                      }
                    >
                      {lang === "pl" ? "Panoramy 360°" : "360° Panoramas"}
                    </NavLink>
                  </motion.li>

                  <motion.li
                    className="cat"
                    variants={linksHoverVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    onClick={closeMobileMenu}
                  >
                    <NavLink
                      to={`?type=apps`}
                      className={
                        queryTypeExtracted === "apps"
                          ? "main-nav-link  main-nav-link-active main-mobile-nav-link-active"
                          : "main-nav-link main-mobile-nav-link"
                      }
                    >
                      {lang === "pl" ? "AR apps" : "AR apps"}
                    </NavLink>
                  </motion.li>
                </Fragment>
              ) : null}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.nav>
  );
}
