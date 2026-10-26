const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
  getPublicStats,
} = require(
  "../controllers/dashboardController"
);

router.get(
  "/stats",
  getDashboardStats
);

router.get(
  "/public-stats",
  getPublicStats
);

module.exports = router;
