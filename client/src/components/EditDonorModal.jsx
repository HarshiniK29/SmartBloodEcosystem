import { useState } from "react";

function EditDonorModal({
  donor,
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] =
    useState({
      name: donor.name,
      bloodGroup: donor.bloodGroup,
      phone: donor.phone,
      email: donor.email,
      address: donor.address,
      lastDonationDate:
        donor.lastDonationDate
          ?.split("T")[0],
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

    onSubmit(
      donor._id,
      formData
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[500px] rounded-xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          Edit Donor
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
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
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Last Donation Date
  </label>

  <input
    type="date"
    name="lastDonationDate"
    value={formData.lastDonationDate}
    onChange={handleChange}
    max={
      new Date()
        .toISOString()
        .split("T")[0]
    }
    className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
  />

  <p className="text-xs text-gray-500 mt-1">
    Update the donor's latest donation date.
  </p>
</div>
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
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDonorModal;