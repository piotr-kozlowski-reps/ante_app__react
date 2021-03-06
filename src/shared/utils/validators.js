const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";
const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH";
const VALIDATOR_TYPE_MIN = "MIN";
const VALIDATOR_TYPE_MAX = "MAX";
const VALIDATOR_TYPE_EMAIL = "EMAIL";
const VALIDATOR_TYPE_FILE = "FILE";
const VALIDATOR_TYPE_PASSWORD = "PASSWORD";
const VALIDATOR_TYPE_COMPLETION_DATE = "COMPLETION_DATE";
const VALIDATOR_TYPE_ARRAY_AT_LEAST_ONE = "ARRAY_AT_LEAST_ONE";

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
});
export const VALIDATOR_MAXLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});
export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = (val) => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
export const VALIDATOR_PASSWORD = (
  valDigits,
  valCapitalLetters,
  valSmallLetters,
  valSpecialCharacters
) => ({
  type: VALIDATOR_TYPE_PASSWORD,
  valDigits: valDigits,
  valCapitalLetters: valCapitalLetters,
  valSmallLetters: valSmallLetters,
  valSpecialCharacters: valSpecialCharacters,
});
export const VALIDATOR_COMPLETION_DATE = (val) => ({
  type: VALIDATOR_TYPE_COMPLETION_DATE,
});
export const VALIDATOR_ARRAY_AT_LEAST_ONE = () => ({
  type: VALIDATOR_TYPE_ARRAY_AT_LEAST_ONE,
});

export const validate = (value, validators) => {
  // console.log(`value: ${value}`);
  // console.log(`validators: ${validators}`);
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_PASSWORD) {
      isValid =
        isValid &&
        checkHowManyDigits(value, validator.valDigits) &&
        checkHowManyCapitalLetters(value, validator.valCapitalLetters) &&
        checkHowManySmallLetters(value, validator.valSmallLetters) &&
        checkHowManySpecialCharacters(value, validator.valSpecialCharacters);
    }
    if (validator.type === VALIDATOR_TYPE_COMPLETION_DATE) {
      isValid = isValid && checkIfDateSuitsValidation(value);
    }
    if (validator.type === VALIDATOR_TYPE_ARRAY_AT_LEAST_ONE) {
      isValid = isValid && value.length > 0;
    }
  }
  return isValid;
};

//
//utlis
const checkHowManyDigits = (textToBeChecked, howManyDigits) => {
  let numberOfOccurrence = 0;
  [...textToBeChecked].forEach((letter) => {
    if (letter.match(/\d/)) numberOfOccurrence++;
  });
  return numberOfOccurrence >= howManyDigits;
};

const checkHowManyCapitalLetters = (textToBeChecked, howManyCapitalLetters) => {
  let numberOfOccurrence = 0;
  [...textToBeChecked].forEach((letter) => {
    if (letter.match(/[A-Z]/)) numberOfOccurrence++;
  });

  return numberOfOccurrence >= howManyCapitalLetters;
};

const checkHowManySmallLetters = (textToBeChecked, howManyCapitalLetters) => {
  let numberOfOccurrence = 0;
  [...textToBeChecked].forEach((letter) => {
    if (letter.match(/[a-z]/)) numberOfOccurrence++;
  });

  return numberOfOccurrence >= howManyCapitalLetters;
};

const checkHowManySpecialCharacters = (
  textToBeChecked,
  howManySpecialCharacters
) => {
  let numberOfOccurrence = 0;
  [...textToBeChecked].forEach((letter) => {
    if (letter.match(/[^A-Za-z 0-9]/)) numberOfOccurrence++;
  });

  return numberOfOccurrence >= howManySpecialCharacters;
};

const checkIfDateSuitsValidation = (dateAsString) => {
  const dateToBeChecked = new Date(dateAsString);
  const year = dateToBeChecked.getFullYear();
  return year > 1999 && year < 2050;
};
