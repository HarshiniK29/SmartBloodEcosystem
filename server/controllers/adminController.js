const User = require("../models/User");

// ============================
// GET PENDING HOSPITALS
// ============================

exports.getPendingHospitals =
  async (req, res) => {
    try {
      const hospitals =
        await User.find({
          role: "hospital",
          verificationStatus:
            "pending",
        }).select("-password");

      res.json(hospitals);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// ============================
// APPROVE HOSPITAL
// ============================

exports.approveHospital =
  async (req, res) => {
    try {
      const hospital =
        await User.findByIdAndUpdate(
          req.params.id,
          {
            verificationStatus:
              "approved",
          },
          {
            new: true,
          }
        );

      res.json({
        success: true,
        message:
          "Hospital approved successfully",
        hospital,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// ============================
// REJECT HOSPITAL
// ============================

exports.rejectHospital =
  async (req, res) => {
    try {
      const hospital =
        await User.findByIdAndUpdate(
          req.params.id,
          {
            verificationStatus:
              "rejected",
          },
          {
            new: true,
          }
        );

      res.json({
        success: true,
        message:
          "Hospital rejected",
        hospital,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };