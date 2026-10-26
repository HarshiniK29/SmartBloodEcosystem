import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import DonorHeatmap from "../components/DonorHeatmap";

import {
  getDashboardStats,
} from "../services/dashboardService";

function BloodMap() {
  const [stats, setStats] =
    useState({
      donorMapLocations: [],
      topDonorLocations: [],
      bloodDrivePlan: null,
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

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-8">
        🗺 Blood Intelligence Map
      </h1>

      <div className="bg-white rounded-xl shadow p-6">

        <DonorHeatmap
          locations={
            stats.donorMapLocations
          }
        />

      </div>

      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-4">
          Donor Location Intelligence
        </h2>

        <div className="bg-white rounded-xl shadow p-6">

          {stats.topDonorLocations?.map(
            (location) => (
              <div
                key={
                  location.location
                }
                className="flex justify-between border-b py-3"
              >
                <span>
                  📍
                  {" "}
                  {
                    location.location
                  }
                </span>

                <span className="font-bold">
                  {
                    location.count
                  }
                  {" "}
                  donors
                </span>
              </div>
            )
          )}

        </div>

      </div>

      {stats.bloodDrivePlan && (
        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4">
            Suggested Blood Drive Area
          </h2>

          <div className="bg-white p-6 rounded-xl shadow">

            <p>
              <strong>City:</strong>
              {" "}
              {
                stats.bloodDrivePlan
                  .city
              }
            </p>

            <p>
              <strong>
                Blood Group:
              </strong>
              {" "}
              {
                stats.bloodDrivePlan
                  .targetBloodGroup
              }
            </p>

            <p>
              <strong>
                Potential Donors:
              </strong>
              {" "}
              {
                stats.bloodDrivePlan
                  .potentialDonors
              }
            </p>

          </div>

        </div>
      )}

    </DashboardLayout>
  );
}

export default BloodMap;