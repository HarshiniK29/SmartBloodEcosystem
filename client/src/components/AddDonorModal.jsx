import { useState } from "react";

function AddDonorModal({
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] =
    useState({
      name: "",
      bloodGroup: "",
      phone: "",
      email: "",
      address: "",
      lastDonationDate: "",
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

    const today = new Date();

    const donationDate = new Date(
      formData.lastDonationDate
    );

    const days =
      Math.floor(
        (today - donationDate) /
          (1000 * 60 * 60 * 24)
      );

    const eligible =
      days >= 90;

    const message = eligible
      ? `✅ Donor is Eligible\n\nDays Since Last Donation: ${days}`
      : `⚠ Donor is Not Eligible\n\nDays Since Last Donation: ${days}\nRemaining Wait: ${
          90 - days
        } days`;

    const shouldSave =
      window.confirm(
        `${message}\n\nSave donor?`
      );

    if (shouldSave) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[500px] rounded-xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          Add Donor
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
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
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Location"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
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
    Select the donor's most recent blood donation date.
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
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Save Donor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDonorModal;
