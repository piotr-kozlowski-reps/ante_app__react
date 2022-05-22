import {
  checkIfIsCloudinaryUrl,
  extractAllImagesUrls,
  generateListOfImagesToBeDeleted,
} from "../UpdateProject";

describe("UpdateProject", () => {
  it("extracts correctly all images from an object", () => {
    const input = {
      _id: "6288efbd788568b4cd01f46d",
      panoramas: [
        {
          panoramaTitlePl: "gfmngh",
          panoramaTitleEn: "gfhngfhngf",
          panoramaIcoFull:
            "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141443/ante_portfolio_images/2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_pbnodd.jpg",
          panoramaIcoThumb:
            "https://res.cloudinary.com/dn8l30dkf/image/upload/c_scale,h_80,q_39,w_100/v1653141443/ante_portfolio_images/2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_pbnodd.jpg",
          panoramaImageSourceFull:
            "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141444/ante_portfolio_images/2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_002__thumb_lvjcgd.jpg",
          panoramaImageSourceFullThumb:
            "https://res.cloudinary.com/dn8l30dkf/image/upload/c_scale,h_80,q_39,w_100/v1653141444/ante_portfolio_images/2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_002__thumb_lvjcgd.jpg",
          _id: "6288efbd788568b4cd01f46e",
          id: "6288efbd788568b4cd01f46e",
        },
        {
          panoramaTitlePl: "ghnc",
          panoramaTitleEn: "ghmhjmhgjm",
          panoramaIcoFull:
            "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141445/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico_ijhvvx.jpg",
          panoramaIcoThumb:
            "https://res.cloudinary.com/dn8l30dkf/image/upload/c_scale,h_80,q_39,w_100/v1653141445/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico_ijhvvx.jpg",
          panoramaImageSourceFull:
            "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141445/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico__thumb_semnvn.jpg",
          panoramaImageSourceFullThumb:
            "https://res.cloudinary.com/dn8l30dkf/image/upload/c_scale,h_80,q_39,w_100/v1653141445/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico__thumb_semnvn.jpg",
          _id: "6288efbd788568b4cd01f46f",
          id: "6288efbd788568b4cd01f46f",
        },
      ],
      genre: "PANORAMA",
      projNamePl: "fgb",
      projNameEn: "dfgb",
      completionDate: "2010-10-10T00:00:00.000Z",
      cityPl: "dfgb",
      cityEn: "dfgb",
      clientPl: "dfgb",
      clientEn: "dfgb",
      countryPl: "dfgb",
      countryEn: "dfgb",
      icoImgFullForDuplicateTest2:
        "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141443/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico_zkd43p.jpg",
      icoImgFullForDuplicateTest:
        "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141443/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico_zkd43p.jpg",
      icoImgFull:
        "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141443/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico_zkd43p.jpg",
      icoImgThumb:
        "https://res.cloudinary.com/dn8l30dkf/image/upload/c_scale,h_80,q_39,w_100/v1653141443/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico_zkd43p.jpg",
      projectType: ["COMPETITION"],
      projectGenre: "ProjectPanorama",
      __v: 0,
      id: "6288efbd788568b4cd01f46d",
    };

    const result = extractAllImagesUrls(input);
    expect(result).toEqual([
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141443/ante_portfolio_images/2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_pbnodd.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141444/ante_portfolio_images/2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_002__thumb_lvjcgd.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141445/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico_ijhvvx.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141445/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico__thumb_semnvn.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141443/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico_zkd43p.jpg",
    ]);
  });

  it("checks if passed value is a string and is Cloudinary Url", () => {
    let value =
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141443/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico_zkd43p.jpg";
    let result = checkIfIsCloudinaryUrl(value);
    expect(result).toEqual(true);

    value = "/static/media/ante-logo.9e3afac73a5b93817b25.png";
    result = checkIfIsCloudinaryUrl(value);
    expect(result).toEqual(false);
  });

  it("generates an array of images to be deleted from cloudinary", () => {
    let array1 = [
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141443/ante_portfolio_images/2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_pbnodd.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141444/ante_portfolio_images/2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_002__thumb_lvjcgd.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141445/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico_ijhvvx.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141445/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico__thumb_semnvn.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141443/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico_zkd43p.jpg",
    ];
    let array2 = [
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141443/ante_portfolio_images/2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_pbnodd.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141444/ante_portfolio_images/2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_002__thumb_lvjcgd.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141445/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico_ijhvvx.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141445/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico__thumb_semnvn.jpg",
    ];

    let result = generateListOfImagesToBeDeleted(array1, array2);
    expect(result).toEqual([
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141443/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico_zkd43p.jpg",
    ]);

    array1 = [
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141443/ante_portfolio_images/2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_pbnodd.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141444/ante_portfolio_images/2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_002__thumb_lvjcgd.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141445/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico_ijhvvx.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141445/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico__thumb_semnvn.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141443/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico_zkd43p.jpg",
    ];
    array2 = [
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141443/ante_portfolio_images/2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_pbnodd.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141444/ante_portfolio_images/2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_002__thumb_lvjcgd.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141445/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico_ijhvvx.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141445/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico__thumb_semnvn.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141443/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico_zkd43p.jpg",
    ];
    result = generateListOfImagesToBeDeleted(array1, array2);
    expect(result).toEqual([]);

    array1 = [
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141443/ante_portfolio_images/2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_pbnodd.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141444/ante_portfolio_images/2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_002__thumb_lvjcgd.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141445/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico_ijhvvx.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141445/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico__thumb_semnvn.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141443/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico_zkd43p.jpg",
    ];
    array2 = [
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141443/ante_portfolio_images/2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_pbnodd.jpg",
    ];
    result = generateListOfImagesToBeDeleted(array1, array2);
    expect(result).toEqual([
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141444/ante_portfolio_images/2009_02_centrum_hotelowo_kongresowe_wroclaw_polska_002__thumb_lvjcgd.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141445/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico_ijhvvx.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141445/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico__thumb_semnvn.jpg",
      "https://res.cloudinary.com/dn8l30dkf/image/upload/v1653141443/ante_portfolio_images/2019_07_wnetrze_mieszkalne_essen_niemcy_ico_zkd43p.jpg",
    ]);
  });
});
