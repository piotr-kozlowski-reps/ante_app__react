import genre from "./genre";
import * as Yup from "yup";

const commonData = {
  projNamePl: "",
  projNameEn: "",
  cityPl: "",
  cityEn: "",
  countryPL: "",
  countryEn: "",
  clientPl: "",
  clientEn: "",
  completionDate: null,
  type: [],
  icoImgFull: "",
  icoImgThumb: "",
};

const commonValidation = {
  projNamePl: Yup.string().required("Entering 'Project Name' is required."),
  projNameEn: Yup.string().required("Entering 'Project Name' is required."),
  cityPl: Yup.string().required("Entering 'City Name' is required."),
  cityEn: Yup.string().required("Entering 'City Name' is required."),
  countryPL: Yup.string().required("Entering 'Country Name' is required."),
  countryEn: Yup.string().required("Entering 'Country Name' is required."),
  clientPl: Yup.string().required("Entering 'Client Name' is required."),
  clientEn: Yup.string().required("Entering 'Client Name' is required."),
  completionDate: Yup.date()
    .required("Entering 'Date' is required.")
    .min(new Date("01-01-1990"), "Date should be after: 12.12.1989")
    .max(new Date("01-01-2050"), "Date should be before: 12.12.2049")
    .nullable(),
  type: Yup.array()
    .required("At least one choosen genre is required")
    .min(1, "Choose at least one project genre."),
  icoImgFull: Yup.string().required(
    "Entering 'Main Project Icon' is required."
  ),
  icoImgThumb: Yup.string().required(
    "Entering 'Main Project Icon Thumbnail' is required."
  ),
};

export const generateInitialValues = (projectGenre) => {
  switch (projectGenre) {
    case genre.GRAPHIC:
      return {
        genre: projectGenre,
        ...commonData,
        images: [
          {
            imageSourceFull: "",
            imageSourceThumb: "",
            imageAltPl: "",
            imageAltEn: "",
            isBig: false,
          },
        ],
      };
    case genre.APP:
      return {
        genre: projectGenre,
        ...commonData,
        appInfo: {
          appNamePl: "",
          appNameEn: "",
          appImageFull: "",
          appImageThumb: "",
          appDescriptionPl: "",
          appDescriptionEn: "",
          appAndroidLink: "",
          appIOSLink: "",
        },
      };
    case genre.ANIMATION:
      return {
        genre: projectGenre,
        ...commonData,
        videoSource: "",
        videoSourceThumb: "",
      };
    case genre.PANORAMA:
      return {
        genre: projectGenre,
        ...commonData,
        panoramas: [
          {
            panoramaTitlePl: "",
            panoramaTitleEn: "",
            panoramaIcoFull: "",
            panoramaIcoThumb: "",
            panoramaImageSourceFull: "",
            panoramaImageSourceFullThumb: "",
          },
        ],
      };
    default:
      return null;
  }
};

export const generateValidation = (projectGenre) => {
  switch (projectGenre) {
    case genre.GRAPHIC:
      return Yup.object({
        ...commonValidation,
        images: Yup.array().of(
          Yup.object().shape({
            imageSourceFull: Yup.string().required(
              "Entering image source path is required."
            ),
            imageSourceThumb: Yup.string().required(
              "Entering image source thumbnail path is required."
            ),
            imageAltPl: Yup.string().required(
              "Entering image description (in polish) is required."
            ),
            imageAltEn: Yup.string().required(
              "Entering image description (in english) is required."
            ),
          })
        ),
      });

    case genre.APP:
      return Yup.object({
        ...commonValidation,
        appInfo: Yup.object().shape({
          appNamePl: Yup.string().required(
            "Entering application name is required."
          ),
          appNameEn: Yup.string().required(
            "Entering application name is required."
          ),
          appImageFull: Yup.string().required(
            "Entering application image source path is required."
          ),
          appImageThumb: Yup.string().required(
            "Entering application image source path thumbnail is required."
          ),
          appDescriptionPl: Yup.string().required(
            "Entering application description is required."
          ),
          appDescriptionEn: Yup.string().required(
            "Entering application description is required."
          ),
          appAndroidLink: Yup.string().required(
            "Entering link to android version of application is required."
          ),
          appIOSLink: Yup.string().required(
            "Entering link to iOS version of application is required."
          ),
        }),
      });
    case genre.ANIMATION:
      return Yup.object({
        ...commonValidation,
        videoSource: Yup.string().required(
          "Entering video source path is required."
        ),
        videoSourceThumb: Yup.string().required(
          "Entering video thumbnail is required."
        ),
      });
    case genre.PANORAMA:
      return Yup.object({
        ...commonValidation,
        panoramas: Yup.array().of(
          Yup.object().shape({
            panoramaTitlePl: Yup.string().required(
              "Entering panorama name (in polish) is required."
            ),
            panoramaTitleEn: Yup.string().required(
              "Entering panorama name (in English) is required."
            ),
            panoramaIcoFull: Yup.string().required(
              "Entering panorama image icon source path is required."
            ),
            panoramaIcoThumb: Yup.string().required(
              "Entering panorama image icon thumbnail source path is required."
            ),
            panoramaImageSourceFull: Yup.string().required(
              "Entering panorama image source path is required."
            ),
            panoramaImageSourceFullThumb: Yup.string().required(
              "Entering panorama image thumbnail source path is required."
            ),
          })
        ),
      });
    default:
      return null;
  }
};

// export const generateProjectForForm = (projectGenre) => {
//   switch (projectGenre) {
//     case genre.GRAPHIC:
//       return {
//         genre: {
//           value: projectGenre,
//           isValid: true,
//         },
//         ...commonData,
//         images: [
//           {
//             imageSourceFull: "",
//             imageSourceThumb: "",
//             imageAltPl: "",
//             imageAltEn: "",
//             isBig: false,
//           },
//         ],
//       };
//     case genre.APP:
//       return {
//         genre: {
//           value: projectGenre,
//           isValid: true,
//         },
//         ...commonData,
//         appInfo: {
//           appNamePl: "",
//           appNameEn: "",
//           appImageFull: "",
//           appImageThumb: "",
//           appDescriptionPl: "",
//           appDescriptionEn: "",
//           appAndroidLink: "",
//           appIOSLink: "",
//         },
//       };
//     case genre.ANIMATION:
//       return {
//         genre: {
//           value: projectGenre,
//           isValid: true,
//         },
//         ...commonData,
//         videoSource: "",
//         videoSourceThumb: "",
//       };
//     case genre.PANORAMA:
//       return {
//         genre: {
//           value: projectGenre,
//           isValid: true,
//         },
//         ...commonData,
//         panoramas: [
//           {
//             panoramaTitle: "",
//             panoramaIcoFull: "",
//             panoramaIcoThumb: "",
//             panoramaImageSourceFull: "",
//             panoramaImageSourceFullThumb: "",
//           },
//         ],
//       };
//     default:
//       return {};
//   }
// };
