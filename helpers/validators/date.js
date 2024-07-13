import { helpers } from "@vuelidate/validators";

export const DMYFormat = helpers.withMessage(
  "Пожалуйста, укажите правильную дату",
  function (value) {
    return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(value);
  }
);
