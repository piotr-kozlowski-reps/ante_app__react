import { changeDesiredFieldNameToAppropriateThumbnail } from "../general-utils";

describe("general-utils", () => {
  it("checks changeDesiredFieldNameToAppropriateThumbnail function", () => {
    let input1 = "icoImgFull";
    let result = changeDesiredFieldNameToAppropriateThumbnail(input1);
    expect(result).toEqual("icoImgThumb");

    input1 = "videoSourceThumb";
    result = changeDesiredFieldNameToAppropriateThumbnail(input1);
    expect(result).toEqual("videoSourceThumb");

    input1 = "appInfo.appImageFull";
    result = changeDesiredFieldNameToAppropriateThumbnail(input1);
    expect(result).toEqual("appInfo.appImageThumb");

    input1 = "images.0.imageSourceFull";
    result = changeDesiredFieldNameToAppropriateThumbnail(input1);
    expect(result).toEqual("images.0.imageSourceThumb");

    input1 = "panoramas.0.panoramaIcoFull";
    result = changeDesiredFieldNameToAppropriateThumbnail(input1);
    expect(result).toEqual("panoramas.0.panoramaIcoThumb");

    input1 = "panoramas.1.panoramaIcoFull";
    result = changeDesiredFieldNameToAppropriateThumbnail(input1);
    expect(result).toEqual("panoramas.1.panoramaIcoThumb");

    input1 = "panoramas.0.panoramaImageSourceFull";
    result = changeDesiredFieldNameToAppropriateThumbnail(input1);
    expect(result).toEqual("panoramas.0.panoramaImageSourceFullThumb");

    input1 = "panoramas.1.panoramaImageSourceFull";
    result = changeDesiredFieldNameToAppropriateThumbnail(input1);
    expect(result).toEqual("panoramas.1.panoramaImageSourceFullThumb");
  });
});
