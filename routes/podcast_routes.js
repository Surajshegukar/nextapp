const express = require("express");
const router = express.Router();
const {
  addPodcast,
  getPodcastById,
  updatePodcast,
  getAjaxPodcasts,
  getAllPodcasts,
  uniquePodcast,
} = require("../controllers/admin/podcast_controller");
const {
  podcastValidationRules,
  validateRequest,
} = require("../validations/validations");
const authenticateAdmin = require("../middleware/authenticate_admin");
const { getAllActivePodcasts } = require("../controllers/front/podcast_controller");
const upload = require("../middleware/upload")("uploads/podcast");

router.get("/podcast-list", getAllPodcasts);
router.post(
  "/add-podcast",
  authenticateAdmin,
  upload.single("image"),
  podcastValidationRules,
  validateRequest,
  addPodcast
);
router.put(
  "/add-podcast/:id",
  authenticateAdmin,
  upload.single("image"),
  podcastValidationRules,
  validateRequest,
  updatePodcast
);
router.get("/get-podcast/:id", getPodcastById);
router.post("/ajax/podcast-list", getAjaxPodcasts);
router.get("/check-unique",uniquePodcast);


router.get("/get-active-podcast",getAllActivePodcasts);

module.exports = router;
