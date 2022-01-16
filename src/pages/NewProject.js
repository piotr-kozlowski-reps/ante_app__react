import React from "react";
import AdminTitle from "../shared/components/AdminTitle";

const NewProject = () => {
  return <AdminTitle title="Portfolio" />;
};

export default NewProject;

// <div className="row menu">
//   <div className="col-lg-12">
//     <div className="collapse navbar-collapse" id="defaultNavbar1">
//       <ul className="nav navbar-nav">
//         <li className="cat">
//           <NavLink
//             ref={(el) => (link1 = el)}
//             to={`?type=all`}
//             className={
//               queryTypeExtracted === "all"
//                 ? "main-nav-link  main-nav-link-active"
//                 : "main-nav-link"
//             }
//           >
//             {lang === "pl" ? "Wszystkie" : "all"}
//           </NavLink>
//         </li>

//         <li className="cat">
//           <NavLink
//             ref={(el) => (link2 = el)}
//             to={`?type=competitions`}
//             className={
//               queryTypeExtracted === "competitions"
//                 ? "main-nav-link  main-nav-link-active"
//                 : "main-nav-link"
//             }
//           >
//             {lang === "pl" ? "Konkursy" : "competitions"}
//           </NavLink>
//         </li>

//         <li className="cat">
//           <NavLink
//             ref={(el) => (link3 = el)}
//             to={`?type=interiors`}
//             className={
//               queryTypeExtracted === "interiors"
//                 ? "main-nav-link  main-nav-link-active"
//                 : "main-nav-link"
//             }
//           >
//             {lang === "pl" ? "Wnętrza" : "Interiors"}
//           </NavLink>
//         </li>

//         <li className="cat">
//           <NavLink
//             ref={(el) => (link4 = el)}
//             to={`?type=exteriors`}
//             className={
//               queryTypeExtracted === "exteriors"
//                 ? "main-nav-link  main-nav-link-active"
//                 : "main-nav-link"
//             }
//           >
//             {lang === "pl" ? "Zewnętrza" : "Exteriors"}
//           </NavLink>
//         </li>

//         <li className="cat">
//           <NavLink
//             ref={(el) => (link5 = el)}
//             to={`?type=animations`}
//             className={
//               queryTypeExtracted === "animations"
//                 ? "main-nav-link  main-nav-link-active"
//                 : "main-nav-link"
//             }
//           >
//             {lang === "pl" ? "Animacje" : "Animations"}
//           </NavLink>
//         </li>

//         <li className="cat">
//           <NavLink
//             ref={(el) => (link6 = el)}
//             to={`?type=3dmodeling`}
//             className={
//               queryTypeExtracted === "3dmodeling"
//                 ? "main-nav-link  main-nav-link-active"
//                 : "main-nav-link"
//             }
//           >
//             {lang === "pl" ? "Modelowanie produktów" : "Products Modeling"}
//           </NavLink>
//         </li>

//         <li className="cat">
//           <NavLink
//             ref={(el) => (link7 = el)}
//             to={`?type=panoramas`}
//             className={
//               queryTypeExtracted === "panoramas"
//                 ? "main-nav-link  main-nav-link-active"
//                 : "main-nav-link"
//             }
//           >
//             {lang === "pl" ? "Panoramy 360°" : "360° Panoramas"}
//           </NavLink>
//         </li>

//         <li className="cat">
//           <NavLink
//             ref={(el) => (link8 = el)}
//             to={`?type=apps`}
//             className={
//               queryTypeExtracted === "apps"
//                 ? "main-nav-link  main-nav-link-active"
//                 : "main-nav-link"
//             }
//           >
//             {lang === "pl" ? "AR apps" : "AR apps"}
//           </NavLink>
//         </li>
//       </ul>
//     </div>
//   </div>
// </div>
