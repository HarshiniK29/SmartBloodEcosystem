const express = require("express");

const router = express.Router();

const {
  getDonors,
  addDonor,
  updateDonor,
  deleteDonor,
} = require(
  "../controllers/donorController"
);

router.get("/", getDonors);

router.post("/", addDonor);

router.put("/:id", updateDonor);

router.delete("/:id", deleteDonor);

module.exports = router;
