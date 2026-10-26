import {
  useDispatch,
  useSelector,
} from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  logout,
} from "../redux/slices/authSlice";

import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import {
  updateProfile,
} from "../services/profileService";

function Profile() {
  const { user } = useSelector(
    (state) => state.auth
  );

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      name:
        user?.name || "",

      email:
        user?.email || "",

      role:
        user?.role || "",

      phone:
        user?.phone || "",

      address:
        user?.address || "",

      designation:
        user?.designation || "",

      about:
        user?.about || "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

const handleSave =
  async () => {
    try {
      await updateProfile(
        formData
      );

      alert(
        "Profile updated successfully"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePassword =
    () => {
      alert(
        "Password change API coming next."
      );
    };

  const handleLogout = () => {
    dispatch(logout());

    navigate("/");
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-2xl font-bold mt-4">
              {formData.name}
            </h2>

            <p className="text-gray-500">
              {formData.role}
            </p>
          </div>

          <h3 className="text-xl font-bold mb-4">
            Personal Information
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="border p-3 rounded"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-3 rounded"
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border p-3 rounded"
            />

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="border p-3 rounded"
            />

            <input
              type="text"
              name="designation"
              value={
                formData.designation
              }
              onChange={handleChange}
              placeholder="Designation"
              className="border p-3 rounded"
            />
         </div>

          <textarea
            name="about"
            rows="4"
            value={formData.about}
            onChange={handleChange}
            placeholder="About Me"
            className="border p-3 rounded w-full mt-4"
          />

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-5 py-2 rounded"
            >
              Save Changes
            </button>

            <button
              onClick={
                handleChangePassword
              }
              className="bg-yellow-600 text-white px-5 py-2 rounded"
            >
              Change Password
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-5 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;