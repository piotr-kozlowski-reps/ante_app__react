import {
  checkIfDateInputIsGenerallyGood,
  checkIfDateInputIsInGoodFormat,
  checkIfDateIsLaterThan1989,
  checkIfDateIsEarlierThan2050,
} from "../generateFormDataFactory";

describe("Generate Form Data Factory", () => {
  it("checkIfDateInputIsGenerallyGood()", () => {
    let value = new Date("1998");
    expect(checkIfDateInputIsGenerallyGood(value)).toBeFalsy();

    value = "1998";
    expect(checkIfDateInputIsGenerallyGood(value)).toBeTruthy();

    value = "";
    expect(checkIfDateInputIsGenerallyGood(value)).toBeFalsy();

    value = undefined;
    expect(checkIfDateInputIsGenerallyGood(value)).toBeFalsy();
  });

  it("checkIfDateInputIsInGoodFormat()", () => {
    let value = "2022-05-11T22:00:00.000Z";
    expect(checkIfDateInputIsInGoodFormat(value)).toBeTruthy();
    value = "2022-05-11T22:00:00.000Z";
    expect(checkIfDateInputIsInGoodFormat(value)).toBeTruthy();
    value = "202-05-11T22:00:00.000Z";
    expect(checkIfDateInputIsInGoodFormat(value)).toBeFalsy();
    value = "20205-11T22:00:00.000Z";
    expect(checkIfDateInputIsInGoodFormat(value)).toBeFalsy();
    value = "2022-05-1122:00:00.000Z";
    expect(checkIfDateInputIsInGoodFormat(value)).toBeFalsy();
    value = "2022-05-11T2:00:00.000Z";
    expect(checkIfDateInputIsInGoodFormat(value)).toBeFalsy();
    value = "2022-05-11T22:0000.000Z";
    expect(checkIfDateInputIsInGoodFormat(value)).toBeFalsy();
    value = "2022-05-11T22:00:00.000Zcvf";
    expect(checkIfDateInputIsInGoodFormat(value)).toBeFalsy();
    value = "d2022-05-11T22:00:00.000Z";
    expect(checkIfDateInputIsInGoodFormat(value)).toBeFalsy();
    value = "2022-05-11T22:00:00.000z";
    expect(checkIfDateInputIsInGoodFormat(value)).toBeFalsy();
    value = "2022-05-11t22:00:00.000Z";
    expect(checkIfDateInputIsInGoodFormat(value)).toBeFalsy();
  });

  it("checkIfDateIsLaterThan1989()", () => {
    let value = new Date("01-01-1990");
    expect(checkIfDateIsLaterThan1989(value)).toBeTruthy();
    value = new Date("12-31-1989");
    expect(checkIfDateIsLaterThan1989(value)).toBeFalsy();
    value = new Date("12-31-1600");
    expect(checkIfDateIsLaterThan1989(value)).toBeFalsy();
    value = new Date("12-31-2000");
    expect(checkIfDateIsLaterThan1989(value)).toBeTruthy();
    value = new Date("12-31-2049");
    expect(checkIfDateIsLaterThan1989(value)).toBeTruthy();
  });

  it("checkIfDateIsEarlierThan2050()", () => {
    let value = new Date("01-01-1990");
    expect(checkIfDateIsEarlierThan2050(value)).toBeTruthy();
    value = new Date("01-01-2050");
    expect(checkIfDateIsEarlierThan2050(value)).toBeFalsy();
    value = new Date("01-01-2020");
    expect(checkIfDateIsEarlierThan2050(value)).toBeTruthy();
    value = new Date("12-31-2049");
    expect(checkIfDateIsEarlierThan2050(value)).toBeTruthy();
  });
});
