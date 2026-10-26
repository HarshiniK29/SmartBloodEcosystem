const EmergencyRequest = require(
  "../models/EmergencyRequest"
);

const Donor = require(
  "../models/Donor"
);

const BloodInventory = require(
  "../models/BloodInventory"
);

exports.getRequests = async (
  req,
  res
) => {
  try {
    const requests =
      await EmergencyRequest.find();

    res.json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.addRequest = async (
  req,
  res
) => {
  try {
    const request =
      await EmergencyRequest.create(
        req.body
      );

    res.status(201).json(
      request
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateRequestStatus =
  async (req, res) => {
    try {
      const request =
        await EmergencyRequest.findByIdAndUpdate(
          req.params.id,
          {
            status:
              req.body.status,
          },
          {
            returnDocument:
              "after",
          }
        );

      res.json(request);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

exports.findMatchingDonors =
  async (req, res) => {
    try {
      const request =
        await EmergencyRequest.findById(
          req.params.id
        );

      if (!request) {
        return res.status(404).json({
          message:
            "Request not found",
        });
      }

      // =====================
      // INVENTORY ANALYSIS
      // =====================

      const matchingInventory =
        await BloodInventory.find({
          bloodGroup:
            request.bloodGroup,
        });

      const inventoryUnits =
        matchingInventory.reduce(
          (sum, item) =>
            sum + item.units,
          0
        );

      const bloodBanks =
        matchingInventory.map(
          (item) => ({
            id: item._id,
            location:
              item.location,
            units:
              item.units,
            status:
              item.status,
            expiryDate:
              item.expiryDate,
          })
        );

      // =====================
      // DONOR ANALYSIS
      // =====================

      const donors =
        await Donor.find({
          bloodGroup:
            request.bloodGroup,
        });

      const today = new Date();

      const donorAnalysis =
        donors.map((donor) => {
          const donationDate =
            new Date(
              donor.lastDonationDate
            );

          const days =
            Math.floor(
              (today -
                donationDate) /
                (1000 *
                  60 *
                  60 *
                  24)
            );

          return {
            ...donor.toObject(),

            eligible:
              days >= 90,

            daysSinceDonation:
              days,

            daysRemaining:
              days >= 90
                ? 0
                : 90 - days,

            sameLocation:
              donor.address
                .toLowerCase()
                .trim() ===
              request.location
                .toLowerCase()
                .trim(),
          };
        });

      const eligibleDonors =
        donorAnalysis
          .filter(
            (donor) =>
              donor.eligible
          )
          .sort((a, b) => {
            return (
              Number(
                b.sameLocation
              ) -
              Number(
                a.sameLocation
              )
            );
          });

      const ineligibleDonors =
        donorAnalysis.filter(
          (donor) =>
            !donor.eligible
        );

      // =====================
      // RECOMMENDATION ENGINE
      // =====================

      let recommendation =
        "";

      let emergencyLevel =
        "NORMAL";

      if (
        inventoryUnits >=
        request.unitsRequired
      ) {
        recommendation =
          "Use available blood bank inventory. Donor activation is not required.";

        emergencyLevel =
          "RESOLVED";
      } else if (
        inventoryUnits > 0 &&
        inventoryUnits <
          request.unitsRequired
      ) {
        recommendation =
          `Inventory provides ${inventoryUnits} unit(s). Activate donor network for the remaining ${
            request.unitsRequired -
            inventoryUnits
          } unit(s).`;

        emergencyLevel =
          "PARTIAL_SHORTAGE";
      } else if (
        eligibleDonors.length > 0
      ) {
        recommendation =
          "No inventory available. Activate eligible donor network immediately.";

        emergencyLevel =
          "DONOR_REQUIRED";
      } else {
        recommendation =
          "No inventory and no eligible donors available. Escalate request to nearby blood banks.";

        emergencyLevel =
          "CRITICAL_SHORTAGE";
      }

      // =====================
      // RESPONSE
      // =====================

      res.json({
        request,

        emergencyLevel,

        inventoryAnalysis: {
          available:
            inventoryUnits > 0,

          unitsAvailable:
            inventoryUnits,

          unitsRequired:
            request.unitsRequired,
        },

        bloodBanks,

        eligibleDonors,

        ineligibleDonors,

        recommendation,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };