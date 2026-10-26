const express = require(
  "express"
);

const router =
  express.Router();

const {
  getRequests,
  addRequest,
  findMatchingDonors,
  updateRequestStatus,
} = require(
  "../controllers/emergencyController"
);

router.get(
  "/",
  getRequests
);

router.post(
  "/",
  addRequest
);

router.get(
  "/match/:id",
  findMatchingDonors
);

router.put(
  "/status/:id",
  updateRequestStatus
);

module.exports = router;