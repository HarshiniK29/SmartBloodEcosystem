import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getDashboardStats,
} from "../services/dashboardService";

function EmergencyCenter() {
  const [stats, setStats] =
    useState({
      fulfillmentAnalysis: [],
      bloodDrivePlan: null,
      donorOutreachMessage: "",
    });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
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

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          🚨 Emergency Response Center
        </h1>

        <p className="text-gray-600">
          Command center for critical blood requests
        </p>
      </div>

      {/* Fulfillment Analysis */}

      <div className="space-y-6">

        {stats.fulfillmentAnalysis?.map(
          (item) => (
            <div
              key={item.requestId}
              className="bg-white p-6 rounded-xl shadow"
            >
              <h2 className="text-xl font-bold mb-3">
                {item.hospital}
              </h2>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <strong>
                    Blood Group:
                  </strong>{" "}
                  {item.bloodGroup}
                </div>

                <div>
                  <strong>
                    Required Units:
                  </strong>{" "}
                  {item.unitsRequired}
                </div>

                <div>
                  <strong>
                    Inventory:
                  </strong>{" "}
                  {item.inventoryUnits}
                </div>

                <div>
                  <strong>
                    Eligible Donors:
                  </strong>{" "}
                  {item.donorCoverage}
                </div>

              </div>

              <div className="mt-4">

                <div className="flex justify-between mb-2">
                  <span>
                    Fulfillment Probability
                  </span>

                  <span>
                    {item.fulfillmentProbability}%
                  </span>
                </div>

                <div className="w-full h-3 bg-gray-200 rounded-full">

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

      </div>

      {/* Blood Drive Plan */}

      {stats.bloodDrivePlan && (
        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4">
            🤖 AI Blood Drive Planner
          </h2>

          <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-xl shadow">

            <p>
              <strong>City:</strong>{" "}
              {stats.bloodDrivePlan.city}
            </p>

            <p>
              <strong>Target Blood Group:</strong>{" "}
              {stats.bloodDrivePlan.targetBloodGroup}
            </p>

            <p>
              <strong>Potential Donors:</strong>{" "}
              {stats.bloodDrivePlan.potentialDonors}
            </p>

            <p>
              <strong>Expected Collection:</strong>{" "}
              {Math.round(
                stats.bloodDrivePlan.expectedCollection
              )}{" "}
              Units
            </p>

            <p>
              <strong>Priority:</strong>{" "}
              {stats.bloodDrivePlan.priority}
            </p>

          </div>

        </div>
      )}

      {/* Outreach Message */}

      {stats.donorOutreachMessage && (
        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4">
            📢 Donor Outreach
          </h2>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-xl shadow">

            <div className="whitespace-pre-line text-gray-800 leading-8">
  {stats.donorOutreachMessage}
</div>

          </div>

        </div>
      )}

    </DashboardLayout>
  );
}

export default EmergencyCenter;