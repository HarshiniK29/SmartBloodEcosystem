const mongoose = require("mongoose");

const emergencyRequestSchema =
  new mongoose.Schema(
    {
      hospitalName: {
        type: String,
        required: true,
      },

      bloodGroup: {
        type: String,
        required: true,
      },

      unitsRequired: {
        type: Number,
        required: true,
      },

      location: {
        type: String,
        required: true,
      },

      priority: {
        type: String,
        enum: [
          "Low",
          "Medium",
          "High",
          "Critical",
        ],
        default: "Medium",
      },

      status: {
        type: String,
        enum: [
          "Pending",
          "Processing",
          "Completed",
        ],
        default: "Pending",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "EmergencyRequest",
  emergencyRequestSchema
);
