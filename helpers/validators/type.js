import { helpers } from "@vuelidate/validators";

export const OnlyAlphaAndNumbers = helpers.withMessage(
  "Разрешены только буквы и цифры",
  helpers.regex(/^[a-zA-Z0-9]*$/)
);
