import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import KPICard from "../components/KPICard";
import {
  generateReport,
} from "../utils/reportGenerator";
import {
  getDashboardStats,
} from "../services/dashboardService";
import DonorHeatmap
from "../components/DonorHeatmap";

function Dashboard() {
  const [stats, setStats] =
    useState({
      totalDonors: 0,
      eligibleDonors: 0,
      ineligibleDonors: 0,
      totalInventory: 0,
      emergencyRequests: 0,
      criticalRequests: 0,
      shortageAlerts: [],
      bloodDemand: [],
      aiRecommendation: "",
      topDonorLocations: [],
      bloodDriveSuggestion: null,
      fulfillmentAnalysis: [],
      bloodDrivePlan: null,
      donorOutreachMessage: "",
      donorMapLocations: [],
    });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data =
        await getDashboardStats();

      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>

<div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

  <div>
    <h1 className="text-3xl font-bold">
      Blood Intelligence Dashboard
    </h1>

    <p className="text-gray-600">
      AI-powered blood ecosystem monitoring
    </p>
  </div>

  <button
    onClick={() =>
      generateReport(stats)
    }
    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl shadow-lg font-semibold"
  >
    📄 Export Intelligence Report
  </button>

</div>

      {/* KPI Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <KPICard
          title="Total Donors"
          value={stats.totalDonors}
          color="border-red-500"
        />

        <KPICard
          title="Eligible Donors"
          value={stats.eligibleDonors}
          color="border-green-500"
        />

        <KPICard
          title="Ineligible Donors"
          value={stats.ineligibleDonors}
          color="border-yellow-500"
        />

        <KPICard
          title="Inventory Units"
          value={stats.totalInventory}
          color="border-blue-500"
        />

        <KPICard
          title="Emergency Requests"
          value={stats.emergencyRequests}
          color="border-purple-500"
        />

        <KPICard
          title="Critical Requests"
          value={stats.criticalRequests}
          color="border-red-600"
        />

      </div>

      {/* AI Recommendation */}

      <div className="mt-8">

        <h2 className="text-2xl font-bold mb-4">
          AI Recommendation Engine
        </h2>

        <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-600 p-6 rounded-xl shadow">

          <h3 className="font-bold text-red-700 mb-2">
            🧠 Smart Recommendation
          </h3>

          <p className="text-gray-700">
            {stats.aiRecommendation}
          </p>

        </div>

      </div>

      {/* Blood Shortage Alerts */}

      <div className="mt-8">

        <h2 className="text-2xl font-bold mb-4">
          Blood Shortage Alerts
        </h2>

        {stats.shortageAlerts?.length >
        0 ? (
          <div className="space-y-4">

            {stats.shortageAlerts.map(
              (alert) => (
                <div
                  key={
                    alert.bloodGroup
                  }
                  className="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg"
                >
                  <h3 className="font-bold text-red-700">
                    ⚠{" "}
                    {
                      alert.bloodGroup
                    }{" "}
                    Shortage
                  </h3>

                  <p>
                    Available:{" "}
                    {
                      alert.available
                    }
                  </p>

                  <p>
                    Demand:{" "}
                    {
                      alert.demand
                    }
                  </p>

                  <p>
                    Deficit:{" "}
                    {
                      alert.shortage
                    }
                  </p>

                </div>
              )   
            )}

          </div>
        ) : (
          <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-lg">
            ✅ No shortages predicted.
          </div>
        )}

      </div>

      {/* Most Requested Blood Groups */}

      <div className="mt-8">

        <h2 className="text-2xl font-bold mb-4">
          Most Requested Blood Groups
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {stats.bloodDemand
            ?.slice(0, 4)
            .map((group) => (
              <div
                key={
                  group.bloodGroup
                }
                className="bg-white p-4 rounded-xl shadow border"
              >
                <h3 className="text-xl font-bold">
                  {
                    group.bloodGroup
                  }
                </h3>

                <p>
                  Demand:{" "}
                  {group.demand}
                </p>
              </div>
            ))}

        </div>

      </div>

      <div className="mt-10">
    <div className="mt-10">

</div>
</div>  

{stats.bloodDriveSuggestion && (
  <div className="mt-10">

    <h2 className="text-2xl font-bold mb-4">
      Blood Drive Recommendation
    </h2>

    <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 p-6 rounded-xl shadow">

      <h3 className="font-bold text-blue-700 mb-2">
        🚑 Suggested Blood Drive
      </h3>

      <p>
        Location:
        {" "}
        {
          stats
            .bloodDriveSuggestion
            .location
        }
      </p>

      <p>
        Target Blood Group:
        {" "}
        {
          stats
            .bloodDriveSuggestion
            .targetBloodGroup
        }
      </p>

      <p>
        Potential Donors:
        {" "}
        {
          stats
            .bloodDriveSuggestion
            .expectedDonors
        }
      </p>

    </div>

  </div>
)}
<div className="mt-10">
  <h2 className="text-2xl font-bold mb-4">
    Emergency Fulfillment Analysis
  </h2>

  <div className="space-y-4">

    {stats.fulfillmentAnalysis?.map(
      (item) => (
        <div
          key={item.requestId}
          className="bg-white p-6 rounded-xl shadow"
        >
          <h3 className="font-bold text-lg">
            {item.hospital}
          </h3>

          <p>
            Blood Group:
            {" "}
            {item.bloodGroup}
          </p>

          <p>
            Required:
            {" "}
            {item.unitsRequired}
          </p>

          <p>
            Inventory:
            {" "}
            {item.inventoryUnits}
          </p>

          <p>
            Eligible Donors:
            {" "}
            {item.donorCoverage}
          </p>

          <div className="mt-3">

            <div className="flex justify-between mb-1">
              <span>
                Fulfillment Probability
              </span>

              <span>
                {
                  item.fulfillmentProbability
                }
                %
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${
                  item.fulfillmentProbability >= 75
                    ? "bg-green-500"
                    : item.fulfillmentProbability >= 50
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{
                  width: `${item.fulfillmentProbability}%`,
                }}
              />
            </div>

          </div>
        </div>
      )
    )}
{stats.bloodDrivePlan && (
  <div className="mt-10">

    <h2 className="text-2xl font-bold mb-4">
      🤖 AI Blood Drive Planner
    </h2>

    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-600 p-6 rounded-xl shadow">

      <p>
        <strong>City:</strong>{" "}
        {stats.bloodDrivePlan.city}
      </p>

      <p>
        <strong>Target Blood Group:</strong>{" "}
        {stats.bloodDrivePlan.targetBloodGroup}
      </p>

      <p>
        <strong>Expected Collection:</strong>{" "}
        {Math.round(
          stats.bloodDrivePlan.expectedCollection
        )} Units
      </p>

      <p>
        <strong>Potential Donors:</strong>{" "}
        {stats.bloodDrivePlan.potentialDonors}
      </p>

      <p>
        <strong>Priority:</strong>{" "}
        {stats.bloodDrivePlan.priority}
      </p>

      <p>
        <strong>Campaign Duration:</strong>{" "}
        {stats.bloodDrivePlan.campaignDuration}
      </p>

      <p>
        <strong>Outreach:</strong>{" "}
        {stats.bloodDrivePlan.outreachChannels.join(
          ", "
        )}
      </p>

    </div>

  </div>
)}
  </div>
</div>

{stats.donorOutreachMessage && (
  <div className="mt-10">
    <h2 className="text-2xl font-bold mb-4">
      📢 Smart Donor Outreach
    </h2>

    <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-600 p-6 rounded-xl shadow">

      <div className="whitespace-pre-line text-gray-800 leading-8">
  {stats.donorOutreachMessage}
</div>

    </div>
  </div>
)}
    </DashboardLayout>
  );
}

export default Dashboard;