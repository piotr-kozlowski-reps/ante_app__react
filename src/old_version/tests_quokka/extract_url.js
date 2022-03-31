const name = "images.0.imageSourceFull";
let urlResult = "";

if (name.includes(".")) {
  const urlElements = name.split(".");
  console.log(urlElements);
  urlElements.forEach((el, index) => {
    if (isNaN(el)) urlResult += `.${el}`;
    if (!isNaN(el)) urlResult += `[${el}]`;
  });
}

if (!name.includes(".")) {
  urlResult += `.${name}`;
}

console.log(urlResult);

// const urlResult = "";

// if (name.includes(".")) {
//   const urlElements = name.split(".");
// }

// const fieldName = formikProps.values[name];
// console.log({ fieldName });
// const urlPartGotFromForm = formikProps.values[name];

// if (fieldName.includes(".")) {
//   console.log("dfsv");
// }

// const valueTest = eval(`formikProps.values[images][1][imageSourceFull]`);

// console.log("eval", valueTest);

// // console.log({ urlPartGotFromForm });
// console.log({ name });
// console.log({ urlResult });

// setPreviewUrl(urlResult);
