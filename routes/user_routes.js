const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload")("uploads/users");

const {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  getAjaxUsers,
  uniqueUser,
} = require("../controllers/admin/user_controller");
const {
  userValidationRules,
  validateRequest,
} = require("../validations/validations");
const authenticateAdmin = require("../middleware/authenticate_admin");

router.get("/user-list", getAllUsers);
router.post(
  "/add-user",
  authenticateAdmin,
  upload.single("image"),
  userValidationRules,
  validateRequest,
  addUser
);
router.put(
  "/add-user/:id",
  upload.single("image"),
  authenticateAdmin,
  userValidationRules,
  validateRequest,
  updateUser
);
router.get("/get-user/:id", getUserById);

router.post("/ajax/user-list", getAjaxUsers);

router.get("/check-unique",uniqueUser);

module.exports = router;
