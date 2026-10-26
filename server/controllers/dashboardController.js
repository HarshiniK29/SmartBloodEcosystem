const Donor = require("../models/Donor");
const BloodInventory = require("../models/BloodInventory");
const EmergencyRequest = require("../models/EmergencyRequest");

exports.getDashboardStats = async (
  req,
  res
) => {
  try {
    const donors =
      await Donor.find();

    const inventory =
      await BloodInventory.find();

    const requests =
      await EmergencyRequest.find();

    const today =
      new Date();

    // =========================
    // DONOR ANALYTICS
    // =========================

    const eligibleDonors =
      donors.filter((donor) => {
        if (
          !donor.lastDonationDate
        ) {
          return true;
        }

        const days =
          Math.floor(
            (today -
              new Date(
                donor.lastDonationDate
              )) /
              (1000 *
                60 *
                60 *
                24)
          );

        return days >= 90;
      });

    // =========================
    // INVENTORY ANALYTICS
    // =========================

    const totalInventory =
      inventory.reduce(
        (sum, item) =>
          sum + item.units,
        0
      );

    // =========================
    // EMERGENCY REQUESTS
    // =========================

    const criticalRequests =
      requests.filter(
        (request) =>
          request.priority ===
          "Critical"
      );

    // =========================
    // BLOOD SHORTAGE ANALYSIS
    // =========================

    const bloodGroups = [
      "A+",
      "A-",
      "B+",
      "B-",
      "AB+",
      "AB-",
      "O+",
      "O-",
    ];

    const shortageAlerts = [];

    bloodGroups.forEach(
      (bloodGroup) => {
        const inventoryUnits =
          inventory
            .filter(
              (item) =>
                item.bloodGroup ===
                bloodGroup
            )
            .reduce(
              (sum, item) =>
                sum + item.units,
              0
            );

        const demandUnits =
          requests
            .filter(
              (request) =>
                request.bloodGroup ===
                bloodGroup
            )
            .reduce(
              (sum, request) =>
                sum +
                request.unitsRequired,
              0
            );

        if (
          demandUnits >
          inventoryUnits
        ) {
          shortageAlerts.push({
            bloodGroup,
            available:
              inventoryUnits,
            demand:
              demandUnits,
            shortage:
              demandUnits -
              inventoryUnits,
          });
        }
      }
    );

    // =========================
    // BLOOD DEMAND ANALYTICS
    // =========================

    const bloodDemand =
      bloodGroups
        .map((bloodGroup) => {
          const demand =
            requests
              .filter(
                (request) =>
                  request.bloodGroup ===
                  bloodGroup
              )
              .reduce(
                (sum, request) =>
                  sum +
                  request.unitsRequired,
                0
              );

          return {
            bloodGroup,
            demand,
          };
        })
        .sort(
          (a, b) =>
            b.demand - a.demand
        );

    // =========================
    // DONOR LOCATION ANALYTICS
    // =========================
const donorLocations = {};

donors.forEach((donor) => {
  const location =
    donor.city?.trim() ||
    "Unknown";

  donorLocations[location] =
    (donorLocations[
      location
    ] || 0) + 1;
});


    const topDonorLocations =
      Object.entries(
        donorLocations
      )
        .map(
          ([location, count]) => ({
            location,
            count,
          })
        )
        .sort(
          (a, b) =>
            b.count - a.count
        )
        .slice(0, 5);

    // =========================
// DONOR MAP LOCATIONS
// =========================

const donorMapLocations =
  Object.values(
    donors.reduce(
      (acc, donor) => {
        if (
          !donor.latitude ||
          !donor.longitude
        ) {
          return acc;
        }

        const city =
          donor.city?.trim() ||
          "Unknown";

        if (!acc[city]) {
          acc[city] = {
            location: city,

            lat:
              donor.latitude,

            lng:
              donor.longitude,

            count: 0,
          };
        }

        acc[city].count += 1;

        return acc;
      },
      {}
    )
  );

    // =========================
    // AI RECOMMENDATION ENGINE
    // =========================

    let aiRecommendation =
      "✅ Inventory levels are healthy. No immediate action required.";

    if (
      shortageAlerts.length > 0
    ) {
      const highestShortage =
        [...shortageAlerts].sort(
          (a, b) =>
            b.shortage -
            a.shortage
        )[0];

      aiRecommendation =
        `⚠ Critical shortage predicted for ${highestShortage.bloodGroup}. Conduct a donor drive immediately and activate eligible donors. Expected deficit: ${highestShortage.shortage} unit(s).`;
    }

    // =========================
    // BLOOD DRIVE SUGGESTION
    // =========================

    let bloodDriveSuggestion =
  null;

let bloodDrivePlan =
  null;

if (
  topDonorLocations.length > 0 &&
  shortageAlerts.length > 0
) {
  const topLocation =
    topDonorLocations[0];

  const topShortage =
    shortageAlerts.sort(
      (a, b) =>
        b.shortage -
        a.shortage
    )[0];

  bloodDriveSuggestion = {
    location:
      topLocation.location,

    targetBloodGroup:
      topShortage.bloodGroup,

    expectedDonors:
      topLocation.count,
  };

  bloodDrivePlan = {
    city:
      topLocation.location,

    targetBloodGroup:
      topShortage.bloodGroup,

    deficit:
      topShortage.shortage,

    potentialDonors:
      topLocation.count,

    expectedCollection:
      topLocation.count *
      1.5,

    priority:
      topShortage.shortage >=
      10
        ? "HIGH"
        : "MEDIUM",

    campaignDuration:
      topShortage.shortage >=
      10
        ? "2 Days"
        : "1 Day",

    outreachChannels: [
      "Email",
      "SMS",
      "WhatsApp",
    ],
  };
}

    // =========================
    // FULFILLMENT ANALYSIS
    // =========================

    const fulfillmentAnalysis =
      [];

    requests.forEach(
      (request) => {
        const inventoryUnits =
          inventory
            .filter(
              (item) =>
                item.bloodGroup ===
                request.bloodGroup
            )
            .reduce(
              (sum, item) =>
                sum +
                item.units,
              0
            );

        const eligibleMatchingDonors =
          eligibleDonors.filter(
            (donor) =>
              donor.bloodGroup ===
              request.bloodGroup
          );

        const donorCoverage =
          eligibleMatchingDonors.length;

        const availableUnits =
          inventoryUnits +
          donorCoverage;

        const fulfillmentProbability =
          Math.min(
            100,
            Math.round(
              (availableUnits /
                request.unitsRequired) *
                100
            )
          );

        fulfillmentAnalysis.push(
          {
            requestId:
              request._id,

            hospital:
              request.hospitalName,

            bloodGroup:
              request.bloodGroup,

            unitsRequired:
              request.unitsRequired,

            inventoryUnits,

            donorCoverage,

            fulfillmentProbability,
          }
        );
      }
    );
// =========================
// DONOR OUTREACH MESSAGE
// =========================

let donorOutreachMessage = null;

if (bloodDrivePlan) {
  donorOutreachMessage =
`🚨 URGENT BLOOD DONATION APPEAL

A shortage of ${bloodDrivePlan.targetBloodGroup} blood has been detected in ${bloodDrivePlan.city}.

Priority: ${bloodDrivePlan.priority}

Potential Collection:
${Math.round(
  bloodDrivePlan.expectedCollection
)} Units

Please consider donating to help save lives.

Thank you,
Smart Blood Ecosystem Platform`;
}
    // =========================
    // RESPONSE
    // =========================

    res.json({
      totalDonors:
        donors.length,

      eligibleDonors:
        eligibleDonors.length,

      ineligibleDonors:
        donors.length -
        eligibleDonors.length,

      totalInventory,

      emergencyRequests:
        requests.length,

      criticalRequests:
        criticalRequests.length,

      shortageAlerts,

      bloodDemand,

      aiRecommendation,

      topDonorLocations,

      donorMapLocations,

      bloodDriveSuggestion,

      fulfillmentAnalysis,
      bloodDrivePlan,
      donorOutreachMessage,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

exports.getPublicStats =
  async (req, res) => {
    try {
      const donors =
        await Donor.countDocuments();

      const inventory =
        await BloodInventory.find();

      const requests =
        await EmergencyRequest.countDocuments();

      const totalUnits =
        inventory.reduce(
          (sum, item) =>
            sum + item.units,
          0
        );

      res.json({
        donors,
        totalUnits,
        requests,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };