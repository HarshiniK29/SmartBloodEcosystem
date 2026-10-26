import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getDashboardStats,
} from "../services/dashboardService";

import {
  Bar,
  Pie,
  Doughnut,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Analytics() {
  const [stats, setStats] =
    useState({
      bloodDemand: [],
      eligibleDonors: 0,
      ineligibleDonors: 0,
      totalInventory: 0,
      shortageAlerts: [],
      aiRecommendation: "",
      emergencyRequests: 0,
      criticalRequests: 0,
    });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats =
    async () => {
      try {
        const data =
          await getDashboardStats();

        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

  const bloodDemandData = {
    labels:
      stats.bloodDemand?.map(
        (item) =>
          item.bloodGroup
      ) || [],

    datasets: [
      {
        label:
          "Blood Demand",

        data:
          stats.bloodDemand?.map(
            (item) =>
              item.demand
          ) || [],

        backgroundColor:
          "#dc2626",
      },
    ],
  };

  const donorPieData = {
    labels: [
      "Eligible",
      "Ineligible",
    ],

    datasets: [
      {
        data: [
          stats.eligibleDonors,
          stats.ineligibleDonors,
        ],

        backgroundColor: [
          "#22c55e",
          "#ef4444",
        ],
      },
    ],
  };

  const availabilityData = {
    labels:
      stats.bloodDemand?.map(
        (item) =>
          item.bloodGroup
      ) || [],

    datasets: [
      {
        label:
          "Inventory",

        data:
          stats.bloodDemand?.map(
            (item) =>
              Math.max(
                item.demand -
                  (item.shortage ||
                    0),
                0
              )
          ) || [],

        backgroundColor:
          "#2563eb",
      },

      {
        label:
          "Demand",

        data:
          stats.bloodDemand?.map(
            (item) =>
              item.demand
          ) || [],

        backgroundColor:
          "#dc2626",
      },
    ],
  };

  const distributionData = {
    labels:
      stats.bloodDemand?.map(
        (item) =>
          item.bloodGroup
      ) || [],

    datasets: [
      {
        data:
          stats.bloodDemand?.map(
            (item) =>
              item.demand
          ) || [],

        backgroundColor: [
          "#ef4444",
          "#f97316",
          "#22c55e",
          "#3b82f6",
          "#8b5cf6",
          "#ec4899",
          "#14b8a6",
          "#f59e0b",
        ],
      },
    ],
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">
        📊 Analytics Center
      </h1>

      {/* Row 1 */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            Blood Demand Analytics
          </h2>

          <Bar
            data={
              bloodDemandData
            }
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            Donor Eligibility Analysis
          </h2>

          <Pie
            data={
              donorPieData
            }
          />
        </div>

      </div>

      {/* Row 2 */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold mb-4">
            Blood Availability vs Demand
          </h2>

          <Bar
            data={
              availabilityData
            }
          />

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold mb-4">
            Blood Group Distribution
          </h2>

          <Doughnut
            data={
              distributionData
            }
          />

        </div>

      </div>

      {/* Smart Match Score */}

      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-4">
          🤖 Smart Donor Match Score
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {stats.bloodDemand?.map(
            (group) => {
              const score =
                Math.min(
                  100,
                  Math.round(
                    (stats.eligibleDonors /
                      (group.demand ||
                        1)) *
                      10
                  )
                );

              return (
                <div
                  key={
                    group.bloodGroup
                  }
                  className="bg-white p-5 rounded-xl shadow"
                >
                  <h3 className="text-lg font-bold">
                    {
                      group.bloodGroup
                    }
                  </h3>

                  <p className="text-3xl font-bold text-green-600">
                    {score}%
                  </p>

                  <p className="text-gray-500 text-sm">
                    Match Score
                  </p>
                </div>
              );
            }
          )}

        </div>

      </div>

      {/* Emergency Risk */}

      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-4">
          🚨 Emergency Risk Intelligence
        </h2>

        <div className="space-y-4">

          {stats.shortageAlerts?.map(
            (item) => (
              <div
                key={
                  item.bloodGroup
                }
                className="bg-white p-6 rounded-xl shadow"
              >
                <div className="flex justify-between mb-2">

                  <h3 className="font-bold">
                    {
                      item.bloodGroup
                    }
                  </h3>

                  <span className="font-bold text-red-600">
                    High Risk
                  </span>

                </div>

                <p>
                  Demand:
                  {" "}
                  {
                    item.demand
                  }
                </p>

                <p>
                  Available:
                  {" "}
                  {
                    item.available
                  }
                </p>

                <p>
                  Deficit:
                  {" "}
                  {
                    item.shortage
                  }
                </p>
              </div>
            )
          )}

        </div>

      </div>

      {/* AI Intelligence */}

      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-4">
          🧠 AI Intelligence Summary
        </h2>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-600 rounded-xl p-6 shadow">

          <ul className="space-y-3 text-gray-700">

            <li>
              • Current
              eligible donors:
              {" "}
              {
                stats.eligibleDonors
              }
            </li>

            <li>
              • Emergency requests:
              {" "}
              {
                stats.emergencyRequests
              }
            </li>

            <li>
              • Critical requests:
              {" "}
              {
                stats.criticalRequests
              }
            </li>

            <li>
              • Active shortage
              alerts:
              {" "}
              {
                stats
                  .shortageAlerts
                  ?.length
              }
            </li>

            <li>
              • AI Recommendation:
              {" "}
              {
                stats.aiRecommendation
              }
            </li>

          </ul>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Analytics;