import genre from "./genre";

const commonData = {
  projNamePl: {
    value: "test1",
    isValid: false,
  },
  projNameEn: {
    value: "",
    isValid: false,
  },
  cityPl: {
    value: "",
    isValid: false,
  },
  cityEn: {
    value: "",
    isValid: false,
  },
  countryPL: {
    value: "",
    isValid: false,
  },
  countryEn: {
    value: "",
    isValid: false,
  },
  clientPL: {
    value: "",
    isValid: false,
  },
  clientEn: {
    value: "",
    isValid: false,
  },
  completionDate: {
    value: null,
    isValid: false,
  },
  icoImgFull: {
    value: "",
    isValid: false,
  },
  icoImgThumb: {
    value: "",
    isValid: false,
  },
  type: {
    value: [],
    isValid: false,
  },
};

export const generateProjectForForm = (projectGenre) => {
  switch (projectGenre) {
    case genre.GRAPHIC:
      return {
        genre: {
          value: projectGenre,
          isValid: true,
        },
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
        genre: {
          value: projectGenre,
          isValid: true,
        },
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
        genre: {
          value: projectGenre,
          isValid: true,
        },
        ...commonData,
        videoSource: "",
        videoSourceThumb: "",
      };
    case genre.PANORAMA:
      return {
        genre: {
          value: projectGenre,
          isValid: true,
        },
        ...commonData,
        panoramas: [
          {
            panoramaTitle: "",
            panoramaIcoFull: "",
            panoramaIcoThumb: "",
            panoramaImageSourceFull: "",
            panoramaImageSourceFullThumb: "",
          },
        ],
      };
    default:
      return {};
  }
};
