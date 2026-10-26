const express = require("express");

const router = express.Router();

const {
  getInventory,
  addInventory,
  updateInventory,
  deleteInventory,
} = require("../controllers/inventoryController");
const protect = require(
  "../middleware/authMiddleware"
);

const authorizeRoles = require(
  "../middleware/roleMiddleware"
);

router.get("/", getInventory);

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  addInventory
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateInventory
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteInventory
);

module.exports = router;