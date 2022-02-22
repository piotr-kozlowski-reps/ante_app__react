import { useEffect, useState } from "react";
import type from "../utils/type";

////main-hook
export const useTypeFiltering = (
  typeGotFromQuery,
  currentProjectsArray = []
) => {
  ////vars
  const [currentType, setCurrentType] = useState(type.ALL);

  ////func
  //setting current type of projects to be shown
  useEffect(() => {
    switch (typeGotFromQuery) {
      case "competitions":
        setCurrentType(type.COMPETITION);
        break;
      case "interiors":
        setCurrentType(type.INTERIOR);
        break;
      case "exteriors":
        setCurrentType(type.EXTERIOR);
        break;
      case "animations":
        setCurrentType(type.ANIMATION);
        break;
      case "3dmodeling":
        setCurrentType(type.PRODUCT_MODELING);
        break;
      case "panoramas":
        setCurrentType(type.PANORAMA);
        break;
      case "apps":
        setCurrentType(type.APP);
        break;
      default:
        setCurrentType(type.ALL);
    }
  }, [typeGotFromQuery]);

  //setting array of projects with desired type
  const projectsFiltered = currentProjectsArray
    .filter((project) => {
      if (currentType === type.ALL) return true;
      if (project.type.some((type) => type === currentType)) return true;
    })
    .sort((a, b) => b.completionDate - a.completionDate);

  return projectsFiltered;
};
