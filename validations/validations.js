const { body, validationResult } = require("express-validator");

const userValidationRules = [
  body("first_name").trim().notEmpty().withMessage("Name is required"),

  body("middle_name").trim().notEmpty().withMessage("Name is required"),

  body("last_name").trim().notEmpty().withMessage("Name is required"),

  body("username").trim().notEmpty().withMessage("Name is required"),

  body("department_id")
    .notEmpty()
    .withMessage("Department is required")
    .isNumeric()
    .withMessage("Department must be a number"),
  body("designation_id")
    .notEmpty()
    .withMessage("Designation is required")
    .isNumeric()
    .withMessage("Designation must be a number"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email address"),

  body("password").notEmpty().withMessage("Password is required"),
  // .isLength({ min: 8 })
  // .withMessage("Password must be at least 8 characters long")
  // .matches(/[a-z]/)
  // .withMessage("Password must contain at least one lowercase letter")
  // .matches(/[A-Z]/)
  // .withMessage("Password must contain at least one uppercase letter")
  // .matches(/\d/)
  // .withMessage("Password must contain at least one number")
  // .matches(/[@$!%*?&]/)
  // .withMessage("Password must contain at least one special character"),
];

// validations/validations.js


const magazineValidationRules = [
  body("magazine_name")
    .trim()
    .notEmpty().withMessage("Magazine name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Magazine name must be between 3 and 100 characters"),

  body("category")
    .trim()
    .notEmpty().withMessage("Category is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Category must be between 2 and 50 characters"),

  body("publish_date")
    .optional({ checkFalsy: true })
    .isISO8601().withMessage("Publish date must be a valid date (YYYY-MM-DD)"),

  body("auther")
    .trim()
    .notEmpty().withMessage("Author name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Author name must be between 3 and 50 characters"),

  body("short_description")
    .trim()
    .notEmpty().withMessage("Short description is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("Short description must be between 10 and 500 characters"),
  body("desc")
    .trim()
    .notEmpty().withMessage("Description is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),
  body("duration")
    .notEmpty().withMessage("Duration is required")
    .isInt({ min: 1 })
    .withMessage("Duration must be a positive integer"),
];



const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  next();
};

const departmentValidationRules = [
  body("department_name")
    .trim()
    .notEmpty()
    .withMessage("Department name is required"),
];
const categoryValidationRules = [
  body("category_name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required"),
];

const designationValidationRules = [
  body("designation_name")
    .trim()
    .notEmpty()
    .withMessage("Designation name is required"),
];


module.exports = {
  validateId,
  validateRequest,
  departmentValidationRules,
  categoryValidationRules,
  magazineValidationRules,

};
