const { body, validationResult } = require("express-validator");

// const userValidationRules = [
//   body("full_name").trim().notEmpty().withMessage("Name is required"),

//   body("short_description").trim().notEmpty().withMessage("Short description is required"),

//   body("description").trim().notEmpty().withMessage("Description is required"),


//   body("email")
//     .trim()
//     .notEmpty()
//     .withMessage("Email is required")
//     .isEmail()
//     .withMessage("Enter a valid email address"),

//   body("password").notEmpty().withMessage("Password is required"),
//   // .isLength({ min: 8 })
//   // .withMessage("Password must be at least 8 characters long")
//   // .matches(/[a-z]/)
//   // .withMessage("Password must contain at least one lowercase letter")
//   // .matches(/[A-Z]/)
//   // .withMessage("Password must contain at least one uppercase letter")
//   // .matches(/\d/)
//   // .withMessage("Password must contain at least one number")
//   // .matches(/[@$!%*?&]/)
//   // .withMessage("Password must contain at least one special character"),
// ];

// validations/validations.js


const podcastValidationRules = [
  body("podcast_name")
    .trim()
    .notEmpty().withMessage("Magazine name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Magazine name must be between 3 and 100 characters"),

  body("publish_date")
    .optional({ checkFalsy: true })
    .isISO8601().withMessage("Publish date must be a valid date (YYYY-MM-DD)"),

  body("description")
    .trim()
    .notEmpty().withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be between 10 characters"),

  body("duration")
    .trim()
    .notEmpty().withMessage("Duration is required")
    .withMessage("Duration must be a positive integer"),
];

const magazineValidationRules = [
  body("magazine_name")
    .trim()
    .notEmpty().withMessage("Magazine name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Magazine name must be between 3 and 100 characters"),

  body("category_id")
    .notEmpty().withMessage("Category is required")
    .isInt({ min: 1 }).withMessage("Category must be a valid ID"),

  body("publish_date")
    .optional({ checkFalsy: true })
    .isISO8601().withMessage("Publish date must be a valid date (YYYY-MM-DD)"),

  body("auther_id")
    .notEmpty().withMessage("Author name is required")
    .isInt({ min: 1 }).withMessage("Author must be a valid ID"),

  body("short_description")
    .trim()
    .notEmpty().withMessage("Short description is required"),

  body("description")
    .trim()
    .notEmpty().withMessage("Description is required"),

  body("duration")
    .notEmpty().withMessage("Duration is required")
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

 
const userValidationRules = [
  body("full_name")
    .notEmpty().withMessage("Full name is required")
    .isLength({ min: 3, max: 100 }).withMessage("Full name must be between 3 and 100 characters"),

  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

  body("short_description")
    .optional(),

  body("description")
    .optional(),

  body("image")
    .optional()
    .isString().withMessage("Image path must be a string"),
];


module.exports = {
  validateId,
  validateRequest,
  userValidationRules,
  departmentValidationRules,
  categoryValidationRules,
  magazineValidationRules,
  podcastValidationRules,


};
