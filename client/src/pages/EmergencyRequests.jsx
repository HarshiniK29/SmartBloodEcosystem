import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import AddEmergencyModal from "../components/AddEmergencyModal";
import MatchDonorsModal from "../components/MatchDonorsModal";

import {
  getRequests,
  addRequest,
  findDonors,
  updateStatus,
} from "../services/emergencyService";

function EmergencyRequests() {
  const [requests, setRequests] =
    useState([]);

  const [showModal, setShowModal] =
    useState(false);

const [analysis,
  setAnalysis] =
  useState(null);

  const [showMatchModal, setShowMatchModal] =
    useState(false);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await getRequests();
      setRequests(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddRequest = async (
    formData
  ) => {
    try {
      await addRequest(formData);

      await loadRequests();

      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMatchDonors = async (
    requestId
  ) => {
    try {
      const analysis =
  await findDonors(requestId);

setAnalysis(analysis);

setShowMatchModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange =
  async (id, status) => {
    try {
      await updateStatus(
        id,
        status
      );

      await loadRequests();
    } catch (error) {
      console.log(error);
    }
  };

  const getPriorityBadge = (
    priority
  ) => {
    switch (priority) {
      case "Critical":
        return "bg-red-600 text-white";

      case "High":
        return "bg-orange-500 text-white";

      case "Medium":
        return "bg-yellow-500 text-white";

      default:
        return "bg-green-500 text-white";
    }
  };

  const getStatusBadge = (
    status
  ) => {
    switch (status) {
      case "Completed":
        return "bg-green-600 text-white";

      case "Processing":
        return "bg-blue-600 text-white";

      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Emergency Requests
        </h1>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          + Create Request
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">
                Hospital
              </th>

              <th className="p-3 text-left">
                Blood Group
              </th>

              <th className="p-3 text-left">
                Units
              </th>

              <th className="p-3 text-left">
                Location
              </th>

              <th className="p-3 text-left">
                Priority
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-left">
                Created
              </th>

              <th className="p-3 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {requests.length > 0 ? (
              requests.map((request) => (
                <tr
                  key={request._id}
                  className="border-b"
                >
                  <td className="p-3">
                    {request.hospitalName}
                  </td>

                  <td className="p-3 font-semibold">
                    {request.bloodGroup}
                  </td>

                  <td className="p-3">
                    {request.unitsRequired}
                  </td>

                  <td className="p-3">
                    {request.location}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getPriorityBadge(
                        request.priority
                      )}`}
                    >
                      {request.priority}
                    </span>
                  </td>

                  <td className="p-3">
  <select
    value={request.status}
    onChange={(e) =>
      handleStatusChange(
        request._id,
        e.target.value
      )
    }
    className={`border rounded px-3 py-2 ${getStatusBadge(
      request.status
    )}`}
  >
    <option value="Pending">
      Pending
    </option>

    <option value="Processing">
      Processing
    </option>

    <option value="Completed">
      Completed
    </option>
  </select>
</td>

                  <td className="p-3">
                    {new Date(
                      request.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() =>
                        handleMatchDonors(
                          request._id
                        )
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      Find Donors
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center p-6 text-gray-500"
                >
                  No Emergency Requests Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddEmergencyModal
          onClose={() =>
            setShowModal(false)
          }
          onSubmit={
            handleAddRequest
          }
        />
      )}

      {showMatchModal && (
        <MatchDonorsModal
  analysis={analysis}
  onClose={() =>
    setShowMatchModal(false)
  }
/>
      )}
    </DashboardLayout>
  );
}

export default EmergencyRequests;
