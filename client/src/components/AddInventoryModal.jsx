import { useState } from "react";

function AddInventoryModal({
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] =
    useState({
      bloodGroup: "",
      units: "",
      location: "",
      expiryDate: "",
      status: "Available",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[500px] shadow-xl">
        <h2 className="text-2xl font-bold mb-4">
          Add Blood Inventory
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <select
            name="bloodGroup"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">
              Select Blood Group
            </option>

            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>

          <input
            type="number"
            name="units"
            placeholder="Units"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="expiryDate"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <select
            name="status"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option>Available</option>
            <option>Low</option>
            <option>Critical</option>
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddInventoryModal;
