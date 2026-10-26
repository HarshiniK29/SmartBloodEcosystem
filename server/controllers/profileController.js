const User = require(
  "../models/User"
);

const bcrypt = require(
  "bcryptjs"
);

exports.getProfile = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.user.id
      ).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateProfile =
  async (req, res) => {
    try {
      const updatedUser =
        await User.findByIdAndUpdate(
          req.user.id,
          req.body,
          {
            returnDocument:
              "after",
          }
        ).select("-password");

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

exports.changePassword =
  async (req, res) => {
    try {
      const {
        currentPassword,
        newPassword,
      } = req.body;

      const user =
        await User.findById(
          req.user.id
        );

      const isMatch =
        await bcrypt.compare(
          currentPassword,
          user.password
        );

      if (!isMatch) {
        return res.status(400).json({
          message:
            "Current password is incorrect",
        });
      }

      const salt =
        await bcrypt.genSalt(10);

      user.password =
        await bcrypt.hash(
          newPassword,
          salt
        );

      await user.save();

      res.json({
        message:
          "Password updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };