import genre from "./genre";
import * as Yup from "yup";

const commonData = {
  projNamePl: "fgb",
  projNameEn: "dfgb",
  cityPl: "dfgb",
  cityEn: "dfgb",
  countryPl: "dfgb",
  countryEn: "dfgb",
  clientPl: "dfgb",
  clientEn: "dfgb",
  completionDate: new Date("2010-10-10"),
  projectType: ["COMPETITION"],
  icoImgFull: undefined,
};

const commonValidation = {
  projNamePl: Yup.string().required("Entering 'Project Name' is required."),
  projNameEn: Yup.string().required("Entering 'Project Name' is required."),
  cityPl: Yup.string().required("Entering 'City Name' is required."),
  cityEn: Yup.string().required("Entering 'City Name' is required."),
  countryPl: Yup.string().required("Entering 'Country Name' is required."),
  countryEn: Yup.string().required("Entering 'Country Name' is required."),
  clientPl: Yup.string().required("Entering 'Client Name' is required."),
  clientEn: Yup.string().required("Entering 'Client Name' is required."),
  // completionDate: Yup.date()
  //   .required("Entering 'Date' is required.")
  //   .min(new Date("01-01-1990"), "Date should be after: 12.12.1989")
  //   .max(new Date("01-01-2050"), "Date should be before: 12.12.2049")
  //   .nullable(),
  completionDate: Yup.string().required("Entering date is required."),
  projectType: Yup.array()
    .required("At least one choosen genre is required")
    .min(1, "Choose at least one project genre."),
  icoImgFull: Yup.mixed().test(
    "image type or string",
    "Uploading icon image is required. Image can only be in format -> .jpg/.jpeg/.png/.gif",
    (value) => {
      if (!value) return;
      if (Object.prototype.toString.call(value) === "[object String]") {
        const isNotEmpty = value.trim().length > 0 ? true : false;
        return isNotEmpty;
      }
      return (
        value.type === "image/jpeg" ||
        value.type === "image/png" ||
        value.type === "image/jpg" ||
        value.type === "image/gif"
      );
    }
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
        videoSource: "https://www.youtube.com/embed/ljUUT4BJ_7M",
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
            panoramaImageSourceFull: "",
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
            imageSourceFull: Yup.mixed().test(
              "image type or string",
              "Entering image is required. Image can only be in format -> .jpg/.jpeg/.png/.gif",
              (value) => {
                if (!value) return;
                if (
                  Object.prototype.toString.call(value) === "[object String]"
                ) {
                  const isNotEmpty = value.trim().length > 0 ? true : false;
                  return isNotEmpty;
                }
                return (
                  value.type === "image/jpeg" ||
                  value.type === "image/png" ||
                  value.type === "image/jpg" ||
                  value.type === "image/gif"
                );
              }
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
          appImageFull: Yup.mixed().test(
            "image type or string",
            "Uploading aplication image is required. Image can only be in format -> .jpg/.jpeg/.png/.gif",
            (value) => {
              if (!value) return;
              if (Object.prototype.toString.call(value) === "[object String]") {
                const isNotEmpty = value.trim().length > 0 ? true : false;
                return isNotEmpty;
              }
              return (
                value.type === "image/jpeg" ||
                value.type === "image/png" ||
                value.type === "image/jpg" ||
                value.type === "image/gif"
              );
            }
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
        videoSourceThumb: Yup.mixed().test(
          "image type or string",
          "Entering video thumbnail is required. Image can only be in format -> .jpg/.jpeg/.png/.gif",
          (value) => {
            if (!value) return;
            if (Object.prototype.toString.call(value) === "[object String]") {
              return value.trim().length > 0 ? true : false;
            }
            return (
              value.type === "image/jpeg" ||
              value.type === "image/png" ||
              value.type === "image/jpg" ||
              value.type === "image/gif"
            );
          }
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
            panoramaIcoFull: Yup.mixed().test(
              "image type or string",
              "Entering panorama image icon is required. Image can only be in format -> .jpg/.jpeg/.png/.gif",
              (value) => {
                if (!value) return;
                if (
                  Object.prototype.toString.call(value) === "[object String]"
                ) {
                  return value.trim().length > 0 ? true : false;
                }
                return (
                  value.type === "image/jpeg" ||
                  value.type === "image/png" ||
                  value.type === "image/jpg" ||
                  value.type === "image/gif"
                );
              }
            ),
            panoramaImageSourceFull: Yup.mixed().test(
              "image type or string",
              "Entering panorama image is required. Image can only be in format -> .jpg/.jpeg/.png/.gif",
              (value) => {
                if (!value) return;
                if (
                  Object.prototype.toString.call(value) === "[object String]"
                ) {
                  return value.trim().length > 0 ? true : false;
                }
                return (
                  value.type === "image/jpeg" ||
                  value.type === "image/png" ||
                  value.type === "image/jpg" ||
                  value.type === "image/gif"
                );
              }
            ),
          })
        ),
      });
    default:
      return null;
  }
};
