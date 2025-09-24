const express = require("express");
const router = express.Router();

const { addCategory,getAllCategory,getCategoryById,updateCategory, getAjaxCategory,uniqueCategory} = require("../controllers/admin/category_controller");
const {
  categoryValidationRules,
  validateRequest,
} = require("../validations/validations");
const authenticateAdmin = require("../middleware/authenticate_admin");
const { getAllCategoryOptions } = require("../controllers/front/category_controller");



router.get("/category-list", getAllCategory);
router.post("/add-category", authenticateAdmin, categoryValidationRules, validateRequest, addCategory);
router.put("/add-category/:id",authenticateAdmin,  categoryValidationRules, validateRequest, updateCategory);
router.get("/get-category/:id", getCategoryById);
router.post("/ajax/category-list", getAjaxCategory);

router.get("/check-unique",uniqueCategory);

router.get("/category-options", getAllCategoryOptions);

module.exports = router;
