const express = require("express");
const router = express.Router();
const {
  addMagazine,
  getMagazineById,
  updateMagazine,
  getAjaxMagazines,
  getAllMagazines,
  uniqueMagazine,
} = require("../controllers/admin/magazine_controller");
const {
  magazineValidationRules,
  validateRequest,
} = require("../validations/validations");
const authenticateAdmin = require("../middleware/authenticate_admin");
const upload = require("../middleware/upload")("uploads/magazine");

router.get("/magazine-list", getAllMagazines);
router.post(
  "/add-magazine",
  authenticateAdmin,
  upload.single("image"),
  magazineValidationRules,
  validateRequest,
  addMagazine
);
router.put(
  "/add-magazine/:id",
  authenticateAdmin,
  upload.single("image"),
  magazineValidationRules,
  validateRequest,
  updateMagazine
);
router.get("/get-magazine/:id", getMagazineById);

router.post("/ajax/magazine-list", getAjaxMagazines);
router.get("/check-unique",uniqueMagazine);
module.exports = router;
