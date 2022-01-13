import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "../../../shared/utils/test-utils";

import ProjectsList from "../ProjectsList";

const MOCKED_PROJECTS = [
  {
    id: "4",
    projName: "projNameEn4",
    completionDate: new Date("2021-4"),
    city: "cityEn4",
    country: "countryEn4",
    icoImg:
      "/static/media/2020_07_osiedle_mieszkaniowe_aachen_niemcy_ico.08a263eb1e48f7736fa5.jpg",
  },
  {
    id: "3",
    projName: "projNameEn3",
    completionDate: new Date("2020-11"),
    city: "cityEn3",
    country: "countryEn3",
    icoImg:
      "/static/media/2020_07_osiedle_mieszkaniowe_aachen_niemcy_ico.08a263eb1e48f7736fa5.jpg",
  },

  {
    id: "2",
    projName: "projNameEn2",
    completionDate: new Date("2018-11"),
    city: "cityEn2",
    country: "countryEn2",
    icoImg:
      "/static/media/2020_07_osiedle_mieszkaniowe_aachen_niemcy_ico.08a263eb1e48f7736fa5.jpg",
  },
  {
    id: "5",
    projName: "projNameEn5",
    completionDate: new Date("2014-4"),
    city: "cityEn5",
    country: "countryEn5",
    icoImg:
      "/static/media/2020_07_osiedle_mieszkaniowe_aachen_niemcy_ico.08a263eb1e48f7736fa5.jpg",
  },

  {
    id: "6",
    projName: "projNameEn6",
    completionDate: new Date("2012-4"),
    city: "cityEn6",
    country: "countryEn6",
    icoImg:
      "/static/media/2020_07_osiedle_mieszkaniowe_aachen_niemcy_ico.08a263eb1e48f7736fa5.jpg",
  },
  {
    id: "7",
    projName: "projNameEn7",
    completionDate: new Date("2012-4"),
    city: "cityEn7",
    country: "countryEn7",
    icoImg:
      "/static/media/2020_07_osiedle_mieszkaniowe_aachen_niemcy_ico.08a263eb1e48f7736fa5.jpg",
  },
];

const MockProjectsList = () => {
  return (
    <BrowserRouter>
      <ProjectsList projectsList={MOCKED_PROJECTS} />
    </BrowserRouter>
  );
};

describe("MockProjectsList", () => {
  it("renders as many projects as passed with prop: projectsList", () => {
    render(<MockProjectsList />);
    const allProjectsRendered = screen.getAllByRole("link");
    expect(allProjectsRendered.length).toEqual(6);
  });

  it("renders all titles/cities/countries information", () => {
    render(<MockProjectsList />);
    const allTitles = screen.getAllByText(/PROJNAMEEN/i);
    const allCities = screen.getAllByText(/CITYEN/i);
    const allCountries = screen.getAllByText(/COUNTRYEN/i);
    const allImages = screen.getAllByRole("img");
    expect(allTitles.length).toEqual(6);
    expect(allCities.length).toEqual(6);
    expect(allCountries.length).toEqual(6);
    expect(allImages.length).toEqual(6);
  });
});
