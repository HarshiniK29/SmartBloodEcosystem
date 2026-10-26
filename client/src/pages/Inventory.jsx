import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import DashboardLayout from "../layouts/DashboardLayout";
import AddInventoryModal from "../components/AddInventoryModal";
import EditInventoryModal from "../components/EditInventoryModal";

import {
  getInventory,
  addInventory,
  updateInventory,
  deleteInventory,
} from "../services/inventoryService";

function Inventory() {
  const { user } = useSelector(
    (state) => state.auth
  );
console.log(user);
  const isAdmin = user?.role === "admin";

  const [inventory, setInventory] =
    useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [selectedInventory, setSelectedInventory] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const data = await getInventory();
      setInventory(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddInventory = async (
    formData
  ) => {
    try {
      await addInventory(formData);

      await loadInventory();

      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditInventory = async (
    id,
    formData
  ) => {
    try {
      await updateInventory(
        id,
        formData
      );

      await loadInventory();

      setShowEditModal(false);
      setSelectedInventory(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteInventory(id);

      setInventory(
        inventory.filter(
          (item) => item._id !== id
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const openEditModal = (item) => {
    setSelectedInventory(item);
    setShowEditModal(true);
  };

  const filteredInventory =
    inventory.filter((item) => {
      const matchesSearch =
        item.bloodGroup
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "All"
          ? true
          : item.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Blood Inventory
        </h1>

        {isAdmin && (
          <button
            onClick={() =>
              setShowModal(true)
            }
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
          >
            + Add Inventory
          </button>
        )}
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search Blood Group..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="border p-2 rounded w-64"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="border p-2 rounded"
        >
          <option value="All">
            All Status
          </option>

          <option value="Available">
            Available
          </option>

          <option value="Low">
            Low
          </option>

          <option value="Critical">
            Critical
          </option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
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
                Expiry Date
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredInventory.length > 0 ? (
              filteredInventory.map(
                (item) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3 font-semibold">
                      {
                        item.bloodGroup
                      }
                    </td>

                    <td className="p-3">
                      {item.units}
                    </td>

                    <td className="p-3">
                      {item.location}
                    </td>

                    <td className="p-3">
                      {new Date(
                        item.expiryDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          item.status ===
                          "Available"
                            ? "bg-green-500"
                            : item.status ===
                              "Low"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="p-3">
                      {isAdmin ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              openEditModal(
                                item
                              )
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                item._id
                              )
                            }
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400">
                          View Only
                        </span>
                      )}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-500"
                >
                  No Inventory Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddInventoryModal
          onClose={() =>
            setShowModal(false)
          }
          onSubmit={
            handleAddInventory
          }
        />
      )}

      {showEditModal &&
        selectedInventory && (
          <EditInventoryModal
            inventory={
              selectedInventory
            }
            onClose={() =>
              setShowEditModal(false)
            }
            onSubmit={
              handleEditInventory
            }
          />
        )}
    </DashboardLayout>
  );
}

export default Inventory;
