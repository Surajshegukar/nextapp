const express = require("express");
const router = express.Router();
const { loginUser, fetchSession, logoutUser, registerUser} = require("../controllers/admin/auth_controller");


router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.get("/me", fetchSession);




module.exports = router;
