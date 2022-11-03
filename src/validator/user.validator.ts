import { body } from "express-validator";

export const signupValidator = [
  body("name").isString().withMessage("You must input name"),
  body("email").isEmail().withMessage("You must input email."),
  body("password")
    .isString()
    .withMessage("Password must be string.")
    .trim()
    .isLength({ min: 5, max: 12 })
    .withMessage("Password must be 6-12 characters."),
];

export const signinValidator = [
  body("email").isEmail().withMessage("You must input email."),
  body("password")
    .isString()
    .withMessage("You must input string password.")
    .trim(),
];

export const updateUserValidator = [
  body("name")
    .isString()
    .withMessage("You must input name")
    .optional({ nullable: true }),
  body("email")
    .isEmail()
    .withMessage("You must input email.")
    .optional({ nullable: true }),
  body("password")
    .isString()
    .withMessage("Password must be string.")
    .trim()
    .isLength({ min: 5, max: 12 })
    .withMessage("Password must be 6-12 characters.")
    .optional({ nullable: true }),
  body("currentPassword")
    .isString()
    .withMessage("Password must be string.")
    .trim()
    .optional({ nullable: true }),
];
