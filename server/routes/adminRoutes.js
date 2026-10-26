const express = require(
  "express"
);

const router =
  express.Router();

const {
  getPendingHospitals,
  approveHospital,
  rejectHospital,
} = require(
  "../controllers/adminController"
);

router.get(
  "/pending-hospitals",
  getPendingHospitals
);

router.patch(
  "/approve/:id",
  approveHospital
);

router.patch(
  "/reject/:id",
  rejectHospital
);

module.exports = router;