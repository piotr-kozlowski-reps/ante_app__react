export function changeDesiredFieldNameToAppropriateThumbnail(name) {
  if (!name.includes(".")) {
    switch (name) {
      case "icoImgFull":
        return "icoImgThumb";

      case "videoSourceThumb":
        return "videoSourceThumb";

      default:
        throw new Error(
          "Bad name provided in changeDesiredFieldNameToAppropriateThumbnail function (ImageUpdateFormik)"
        );
    }
  }

  const namesSplitByDotArray = name.split("."); //?
  let lastNameCorrectedToBeThumbnail = "";

  switch (namesSplitByDotArray[namesSplitByDotArray.length - 1]) {
    case "appImageFull":
      lastNameCorrectedToBeThumbnail = "appImageThumb";
      break;
    case "imageSourceFull":
      lastNameCorrectedToBeThumbnail = "imageSourceThumb";
      break;
    case "panoramaIcoFull":
      lastNameCorrectedToBeThumbnail = "panoramaIcoThumb";
      break;
    case "panoramaImageSourceFull":
      lastNameCorrectedToBeThumbnail = "panoramaImageSourceFullThumb";
      break;

    default:
      throw new Error(
        "Bad name provided in changeDesiredFieldNameToAppropriateThumbnail function (ImageUpdateFormik)"
      );
  }

  let result = "";
  namesSplitByDotArray.forEach((el, index) => {
    const isFirst = index === 0;
    const isLast = index === namesSplitByDotArray.length - 1;
    const isNotFirstAndNotLast = index > 0 && !isLast;

    if (isFirst) result += `${el}`;
    if (isNotFirstAndNotLast) result += `.${el}`;
    if (isLast) result += `.${lastNameCorrectedToBeThumbnail}`;
  });

  return result; //?
}
