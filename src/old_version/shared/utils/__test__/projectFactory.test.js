import React from "react";
import { generateProject } from "../projectFactory";
import genre from '../genre'

describe{'generate project factory', ()=> {

  it('generates graphic project', () => {
    const projectGraphic = generateProject(genre.GRAPHIC)
    console.log(projectGraphic);
  });


}}