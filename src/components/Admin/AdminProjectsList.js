import React from "react";
import Button from "../../shared/components/Button";
import AdminProjectItem from "./AdminProjectItem";

const AdminProjectsList = (props) => {
  ////vars

  return (
    <div id="portfolio" className="container">
      <div className="row" id="parent">
        <div className="row create-project-button">
          <div className="raw box-outer col-lg-9 col-md-9 col-sm-9 col-xs-12 col-xxxs-12"></div>

          <Button
            additionalClass="btn-portfolio"
            to="/api/projects/new-project"
          >
            CREATE NEW PROJECT
          </Button>
        </div>

        <div className="row">
          <ol>
            {props.projectsList.map((project) => (
              <AdminProjectItem
                key={project.id}
                id={project.id}
                projNamePl={project.projNamePl}
                projNameEn={project.projNameEn}
                completionDate={project.completionDate}
                cityPL={project.cityPL}
                cityEn={project.cityEn}
                countryPL={project.countryPL}
                countryEn={project.countryEn}
                icoImgThumb={project.icoImgThumb}
              />
            ))}
          </ol>
        </div>
      </div>
    </div>

    //     <div id="portfolio" class="container">
    //     <div class="row" id="parent">

    //         <div class="row create-project-button">
    //             <div class="raw box-outer col-lg-9 col-md-9 col-sm-9 col-xs-12 col-xxxs-12" style="margin-bottom: 12px"></div>

    //             <div class="lang" >
    //                 <a th:href="@{/admin/create}" class="btn-portfolio">CREATE NEW PROJECT</a>
    //             </div>
    //         </div>

    //         <pl.ante.portfolioanteapp.model.projection.ProjectSimpleInfoReadModel>"
    //         <div class="row">
    //                 <ol>

    //                     <!-- li - every project list - START-->
    //                     <li  th:each="project : ${projects}">
    //                         <div class="project-text">
    //                             <h3 th:text="${project.getName()}">Project Name</h3>
    //                             <p th:text="|id: ${project.getId()}&nbsp;&nbsp;&nbsp;&nbsp;${project.getYear()}-${project.getMonth()}&nbsp;&nbsp;&nbsp;${project.getCity()} &#91;${project.getCountry()}&#93;|">project info</p>
    //                         </div>

    //                         <div class="lang buttons-edit-delete">
    //                             <a href="#" th:href="@{/admin/edit/__${project.getId()}__}" class="btn-portfolio">EDIT</a>
    //                             <a href="#"  th:href="@{/admin/delete/__${project.getId()}__}" class="btn-portfolio btn-delete">DELETE</a>
    //                         </div>
    //                     </li>
    //                     <!-- li - every project list - END-->

    //                 </ol>
    //         </div>

    //     </div><!--end row-->
    // </div>
  );
};

export default AdminProjectsList;
