const Donor = require(
  "../models/Donor"
);

const geocoder = require(
  "../utils/geocoder"
);

const calculateEligibility = (
  lastDonationDate
) => {
  const today = new Date();

  const donationDate =
    new Date(lastDonationDate);

  // Prevent future dates

  if (donationDate > today) {
    return {
      status:
        "Invalid Date",

      daysSinceDonation: 0,

      daysRemaining: 90,
    };
  }

  const days = Math.floor(
    (today - donationDate) /
      (1000 *
        60 *
        60 *
        24)
  );

  return {
    status:
      days >= 90
        ? "Eligible"
        : "Not Eligible",

    daysSinceDonation:
      days,

    daysRemaining:
      days >= 90
        ? 0
        : 90 - days,
  };
};

// ===============================
// GET DONORS
// ===============================

exports.getDonors =
  async (req, res) => {
    try {
      const donors =
        await Donor.find();

      const donorData =
        donors.map(
          (donor) => ({
            ...donor.toObject(),

            eligibility:
              calculateEligibility(
                donor.lastDonationDate
              ),
          })
        );

      res.json(
        donorData
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// ===============================
// ADD DONOR
// ===============================

exports.addDonor =
  async (req, res) => {
    try {
      const {
        name,
        bloodGroup,
        phone,
        email,
        address,
        lastDonationDate,
      } = req.body;

      // Future Date Validation

      const donationDate =
        new Date(
          lastDonationDate
        );

      if (
        donationDate >
        new Date()
      ) {
        return res
          .status(400)
          .json({
            message:
              "Last donation date cannot be in the future",
          });
      }

      let latitude = null;
      let longitude = null;
      let city = "";

      try {
        const geoData =
          await geocoder.geocode(
            address
          );

        if (
          geoData &&
          geoData.length > 0
        ) {
          latitude =
            geoData[0]
              .latitude;

          longitude =
            geoData[0]
              .longitude;

          city =
            geoData[0].city ||
            geoData[0]
              .administrativeLevels
              ?.level2long ||
            geoData[0]
              .formattedAddress ||
            address;
        }
      } catch (
        geoError
      ) {
        console.log(
          "Geocoding Error:",
          geoError.message
        );
      }

      const donor =
        await Donor.create({
          name,
          bloodGroup,
          phone,
          email,
          address,
          city,
          lastDonationDate,
          latitude,
          longitude,
        });

      res
        .status(201)
        .json(donor);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// ===============================
// UPDATE DONOR
// ===============================

exports.updateDonor =
  async (req, res) => {
    try {
      let updatedData = {
        ...req.body,
      };

      // Future Date Validation

      if (
        req.body
          .lastDonationDate
      ) {
        const donationDate =
          new Date(
            req.body
              .lastDonationDate
          );

        if (
          donationDate >
          new Date()
        ) {
          return res
            .status(400)
            .json({
              message:
                "Last donation date cannot be in the future",
            });
        }
      }

      if (
        req.body.address
      ) {
        try {
          const geoData =
            await geocoder.geocode(
              req.body.address
            );

          if (
            geoData &&
            geoData.length > 0
          ) {
            updatedData.latitude =
              geoData[0]
                .latitude;

            updatedData.longitude =
              geoData[0]
                .longitude;

            updatedData.city =
              geoData[0].city ||
              geoData[0]
                .administrativeLevels
                ?.level2long ||
              geoData[0]
                .formattedAddress ||
              req.body.address;
          }
        } catch (
          geoError
        ) {
          console.log(
            "Geocoding Error:",
            geoError.message
          );
        }
      }

      const donor =
        await Donor.findByIdAndUpdate(
          req.params.id,
          updatedData,
          {
            new: true,
          }
        );

      res.json(
        donor
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// ===============================
// DELETE DONOR
// ===============================

exports.deleteDonor =
  async (req, res) => {
    try {
      await Donor.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Donor deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };
  