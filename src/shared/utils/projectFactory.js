import genre from "./genre";

const commonData = {
  projNamePl: "",
  projNameEn: "",
  completionDate: null,
  cityPl: "",
  cityEn: "",
  countryPl: "",
  countryEn: "",
  clientPL: "",
  clientEn: "",
  icoImgFull: "",
  icoImgThumb: "",
  type: [],
};

export const generateProject = (projectGenre) => {
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
