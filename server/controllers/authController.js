const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ============================
// REGISTER
// ============================

exports.register = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
      role,
      hospitalName,
      hospitalLicenseNumber,
      phone,
      address,
    } = req.body;

    const userExists =
      await User.findOne({
        email,
      });

    if (userExists) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    // Prevent public admin creation

    if (role === "admin") {
      return res.status(403).json({
        message:
          "Admin registration is not allowed",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        name,

        email,

        password:
          hashedPassword,

        role,

        verificationStatus:
          role === "hospital"
            ? "pending"
            : "approved",

        hospitalName:
          hospitalName || "",

        hospitalLicenseNumber:
          hospitalLicenseNumber ||
          "",

        phone:
          phone || "",

        address:
          address || "",
      });

    res.status(201).json({
      success: true,

      message:
        role === "hospital"
          ? "Hospital registration submitted for approval"
          : "Registration successful",

      user: {
        id: user._id,

        name:
          user.name,

        email:
          user.email,

        role:
          user.role,

        verificationStatus:
          user.verificationStatus,
      },
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

// ============================
// LOGIN
// ============================

exports.login = async (
  req,
  res
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(400).json({
        message:
          "User not found",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid credentials",
      });
    }

    // Hospital Approval Check

    if (
      user.role ===
        "hospital" &&
      user.verificationStatus !==
        "approved"
    ) {
      return res.status(403).json({
        message:
          "Hospital account is awaiting admin approval",
      });
    }

    const token =
      jwt.sign(
        {
          id: user._id,

          role:
            user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

    res.json({
      success: true,

      token,

      user: {
        id: user._id,

        name:
          user.name,

        email:
          user.email,

        role:
          user.role,

        verificationStatus:
          user.verificationStatus,
      },
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
      });
  }
};
