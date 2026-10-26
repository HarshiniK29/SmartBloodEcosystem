const mongoose = require("mongoose");

const bloodInventorySchema = new mongoose.Schema(
  {
    bloodGroup: {
      type: String,
      required: true,
      enum: [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
      ],
    },

    units: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Available",
        "Low",
        "Critical",
      ],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "BloodInventory",
  bloodInventorySchema
);