it("testing splitting function in backend", () => {
  const inputArray = [
    "https://res.cloudinary.com/dn8l30dkf/image/upload/v1651560269/ante_portfolio_images/2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_pjblrk.jpg",
    "https://res.cloudinary.com/dn8l30dkf/image/upload/v1651560270/ante_portfolio_images/2019_08_obiekt_biurowy_leverkusen_niemcy_ico_gc9nsy.jpg",
    "https://res.cloudinary.com/dn8l30dkf/image/upload/v1651560270/ante_portfolio_images/2020_07_osiedle_mieszkaniowe_aachen_niemcy_ico_egyidp.jpg",
    "https://res.cloudinary.com/dn8l30dkf/image/upload/v1651560270/ante_portfolio_images/2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_hpkmvc.jpg",
    "https://res.cloudinary.com/dn8l30dkf/image/upload/v1651561255/ante_portfolio_images/2013_08_osiedle_mieszkaniowe_dusseldorf_niemcy_ico01_s2yqle.jpg",
  ];

  const extractedIDisArrayFromPath = extractIDisFromPath(inputArray); //?

  function extractIDisFromPath(fullPathsArray) {
    const resultArray = fullPathsArray.map((path) => {
      let result = "";
      result = path.match(/ante_portfolio_images\/.+\.([A-Za-z]){3}$/i)[0];
      // result = result.slice(22, result.length);
      result = result.split(".")[0];
      return result;
    });

    return resultArray;
  }
});
