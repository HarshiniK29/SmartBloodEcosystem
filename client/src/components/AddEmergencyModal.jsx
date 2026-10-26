import { useState } from "react";

function AddEmergencyModal({
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] =
    useState({
      hospitalName: "",
      bloodGroup: "",
      unitsRequired: "",
      location: "",
      priority: "Medium",
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
      <div className="bg-white w-[500px] rounded-xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          Emergency Request
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="hospitalName"
            placeholder="Hospital Name"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <select
            name="bloodGroup"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
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
            name="unitsRequired"
            placeholder="Units Required"
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

          <select
            name="priority"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
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
              Create Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmergencyModal;