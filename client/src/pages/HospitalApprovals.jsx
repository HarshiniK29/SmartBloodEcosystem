import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getPendingHospitals,
  approveHospital,
  rejectHospital,
} from "../services/adminService";

function HospitalApprovals() {
  const [
    hospitals,
    setHospitals,
  ] = useState([]);

  useEffect(() => {
    loadHospitals();
  }, []);

  const loadHospitals =
    async () => {
      try {
        const data =
          await getPendingHospitals();

        setHospitals(data);
      } catch (error) {
        console.log(error);
      }
    };

  const handleApprove =
    async (id) => {
      try {
        await approveHospital(id);

        alert(
          "Hospital Approved"
        );

        loadHospitals();
      } catch (error) {
        console.log(error);
      }
    };

  const handleReject =
    async (id) => {
      try {
        await rejectHospital(id);

        alert(
          "Hospital Rejected"
        );

        loadHospitals();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          🏥 Hospital Approval Center
        </h1>

        <p className="text-gray-600">
          Review and approve hospital registrations
        </p>
      </div>

      {hospitals.length === 0 ? (
        <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-xl">
          ✅ No pending approvals
        </div>
      ) : (
        <div className="space-y-6">
          {hospitals.map(
            (hospital) => (
              <div
                key={hospital._id}
                className="bg-white shadow rounded-xl p-6"
              >
                <h2 className="text-xl font-bold">
                  {
                    hospital.hospitalName
                  }
                </h2>

                <p>
                  Contact:
                  {" "}
                  {
                    hospital.name
                  }
                </p>

                <p>
                  Email:
                  {" "}
                  {
                    hospital.email
                  }
                </p>

                <p>
                  License:
                  {" "}
                  {
                    hospital.hospitalLicenseNumber
                  }
                </p>

                <p>
                  Phone:
                  {" "}
                  {
                    hospital.phone
                  }
                </p>

                <p>
                  Address:
                  {" "}
                  {
                    hospital.address
                  }
                </p>

                <div className="flex gap-4 mt-5">
                  <button
                    onClick={() =>
                      handleApprove(
                        hospital._id
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      handleReject(
                        hospital._id
                      )
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                  >
                    Reject
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </DashboardLayout>
  );
}

export default HospitalApprovals;