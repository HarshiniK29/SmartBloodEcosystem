import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import DashboardLayout from "../layouts/DashboardLayout";
import AddDonorModal from "../components/AddDonorModal";
import EditDonorModal from "../components/EditDonorModal";

import {
  getDonors,
  addDonor,
  updateDonor,
  deleteDonor,
} from "../services/donorService";

function Donors() {
  const { user } = useSelector(
    (state) => state.auth
  );

  const isAdmin =
    user?.role === "admin";

  const [donors, setDonors] =
    useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [selectedDonor, setSelectedDonor] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [bloodFilter, setBloodFilter] =
    useState("All");

  const [locationFilter, setLocationFilter] =
    useState("All");

  useEffect(() => {
    loadDonors();
  }, []);

  const loadDonors = async () => {
    try {
      const data = await getDonors();
      setDonors(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddDonor = async (
    formData
  ) => {
    try {
      await addDonor(formData);

      await loadDonors();

      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditDonor = async (
    id,
    formData
  ) => {
    try {
      await updateDonor(
        id,
        formData
      );

      await loadDonors();

      setShowEditModal(false);
      setSelectedDonor(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (
    id
  ) => {
    try {
      await deleteDonor(id);

      setDonors(
        donors.filter(
          (donor) => donor._id !== id
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const openEditModal = (
    donor
  ) => {
    setSelectedDonor(donor);
    setShowEditModal(true);
  };

  const filteredDonors =
    donors.filter((donor) => {
      const matchesSearch =
        donor.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesBlood =
        bloodFilter === "All"
          ? true
          : donor.bloodGroup ===
            bloodFilter;

      const matchesLocation =
        locationFilter === "All"
          ? true
          : donor.address ===
            locationFilter;

      return (
        matchesSearch &&
        matchesBlood &&
        matchesLocation
      );
    });

  const uniqueLocations = [
    "All",
    ...new Set(
      donors.map(
        (donor) => donor.address
      )
    ),
  ];

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Donor Management
        </h1>

        {isAdmin && (
          <button
            onClick={() =>
              setShowModal(true)
            }
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            + Add Donor
          </button>
        )}
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search Donor Name..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="border p-2 rounded w-72"
        />

        <select
          value={bloodFilter}
          onChange={(e) =>
            setBloodFilter(
              e.target.value
            )
          }
          className="border p-2 rounded"
        >
          <option value="All">
            All Blood Groups
          </option>

          <option value="A+">
            A+
          </option>

          <option value="A-">
            A-
          </option>

          <option value="B+">
            B+
          </option>

          <option value="B-">
            B-
          </option>

          <option value="AB+">
            AB+
          </option>

          <option value="AB-">
            AB-
          </option>

          <option value="O+">
            O+
          </option>

          <option value="O-">
            O-
          </option>
        </select>

        <select
          value={locationFilter}
          onChange={(e) =>
            setLocationFilter(
              e.target.value
            )
          }
          className="border p-2 rounded"
        >
          {uniqueLocations.map(
            (location) => (
              <option
                key={location}
                value={location}
              >
                {location}
              </option>
            )
          )}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">
                Name
              </th>

              <th className="text-left p-3">
                Blood Group
              </th>

              <th className="text-left p-3">
                Location
              </th>

              <th className="text-left p-3">
                Last Donated
              </th>

              {isAdmin && (
                <th className="text-left p-3">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {filteredDonors.length >
            0 ? (
              filteredDonors.map(
                (donor) => (
                  <tr
                    key={donor._id}
                    className="border-b"
                  >
                    <td className="p-3">
                      {donor.name}
                    </td>

                    <td className="p-3">
                      {donor.bloodGroup}
                    </td>

                    <td className="p-3">
                      {donor.address}
                    </td>

                    <td className="p-3">
                      {new Date(
                        donor.lastDonationDate
                      ).toLocaleDateString()}
                    </td>

                    {isAdmin && (
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              openEditModal(
                                donor
                              )
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                donor._id
                              )
                            }
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan={
                    isAdmin ? 5 : 4
                  }
                  className="text-center p-6 text-gray-500"
                >
                  No Donors Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddDonorModal
          onClose={() =>
            setShowModal(false)
          }
          onSubmit={
            handleAddDonor
          }
        />
      )}

      {showEditModal &&
        selectedDonor && (
          <EditDonorModal
            donor={selectedDonor}
            onClose={() =>
              setShowEditModal(false)
            }
            onSubmit={
              handleEditDonor
            }
          />
        )}
    </DashboardLayout>
  );
}

export default Donors;
