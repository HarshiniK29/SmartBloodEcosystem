import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import api from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      role: "donor",
      hospitalName: "",
      hospitalLicenseNumber: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert(
        "Passwords do not match."
      );
      return;
    }

    if (
      formData.password.length < 6
    ) {
      alert(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (
      formData.role ===
      "hospital"
    ) {
      if (
        !formData.hospitalName.trim() ||
        !formData.hospitalLicenseNumber.trim() ||
        !formData.phone.trim() ||
        !formData.address.trim()
      ) {
        alert(
          "Please provide all hospital verification details."
        );
        return;
      }
    }

    try {
      setLoading(true);

      const registrationData = {
        name:
          formData.name.trim(),

        email:
          formData.email
            .trim()
            .toLowerCase(),

        password:
          formData.password,

        role:
          formData.role,
      };

      if (
        formData.role ===
        "hospital"
      ) {
        registrationData.hospitalName =
          formData.hospitalName.trim();

        registrationData.hospitalLicenseNumber =
          formData.hospitalLicenseNumber.trim();

        registrationData.phone =
          formData.phone.trim();

        registrationData.address =
          formData.address.trim();
      }

      const response =
        await api.post(
          "/auth/register",
          registrationData
        );

      alert(
        response.data.message ||
          (formData.role ===
          "hospital"
            ? "Hospital registration submitted for admin approval."
            : "Registration successful.")
      );

      navigate("/");
    } catch (error) {
      console.error(
        "Registration Error:",
        error
      );

      alert(
        error?.response?.data
          ?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* LEFT SIDE */}

      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-red-950 via-red-800 to-black text-white p-12 flex-col justify-center overflow-hidden">
        {/* Floating Icons */}

        <div className="absolute top-10 left-10 text-8xl text-white/10 animate-pulse">
          ❤️
        </div>

        <div className="absolute top-1/3 right-20 text-7xl text-white/10 animate-bounce">
          🩸
        </div>

        <div className="absolute bottom-32 left-16 text-8xl text-white/10 animate-pulse">
          🚑
        </div>

        <div className="absolute bottom-16 right-20 text-7xl text-white/10 animate-bounce">
          💉
        </div>

        {/* ECG Line */}

        <div className="absolute bottom-0 left-0 w-full opacity-20">
          <svg
            viewBox="0 0 1200 200"
            className="w-full h-32"
          >
            <path
              d="M0,100 L150,100 L200,40 L250,160 L300,100 L450,100 L500,50 L550,170 L600,100 L1200,100"
              stroke="white"
              strokeWidth="4"
              fill="none"
            />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-7xl">
              🩸
            </span>

            <div>
              <h1 className="text-6xl font-extrabold">
                Smart Blood
              </h1>

              <h1 className="text-6xl font-extrabold">
                Ecosystem
              </h1>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6">
            Join the Future of
            Healthcare Intelligence
          </h2>

          <p className="text-xl text-gray-200 leading-relaxed mb-10 max-w-2xl">
            Register and become part
            of an AI-driven ecosystem
            connecting donors,
            hospitals and emergency
            responders.
          </p>

          <div className="space-y-5 text-lg">
            <p>
              ✅ Secure User Access
            </p>

            <p>
              ✅ Verified Hospital
              Accounts
            </p>

            <p>
              ✅ Smart Donor Matching
            </p>

            <p>
              ✅ Emergency Response
            </p>

            <p>
              ✅ Blood Intelligence
              Insights
            </p>
          </div>

          <div className="flex items-center gap-3 mt-10 text-2xl font-medium animate-pulse">
            ❤️

            <span>
              Save Lives Through
              Intelligent Healthcare
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="w-full lg:w-1/2 bg-gray-100 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 my-6">
          <div className="text-center mb-7">
            <div className="w-20 h-20 bg-red-600 shadow-lg rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <span className="text-4xl">
                🩸
              </span>
            </div>

            <h2 className="text-4xl font-bold">
              Create Account
            </h2>

            <p className="text-gray-500 mt-3">
              Join the Smart Blood
              Ecosystem Platform
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              name="name"
              placeholder={
                formData.role ===
                "hospital"
                  ? "Contact Person Name"
                  : "Full Name"
              }
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-red-500 outline-none bg-white"
            >
              <option value="donor">
                Donor
              </option>

              <option value="hospital">
                Hospital
              </option>
            </select>

            {formData.role ===
              "hospital" && (
              <div className="space-y-4 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <div>
                  <h3 className="font-bold text-red-700">             Hospital
                    Verification
                  </h3>

                  <p className="text-sm text-gray-600 mt-1">
                    Hospital accounts
                    require administrator
                    approval before login.
                  </p>
                </div>

                <input
                  type="text"
                  name="hospitalName"
                  placeholder="Hospital Name"
                  value={
                    formData.hospitalName
                  }
                  onChange={
                    handleChange
                  }
                  required
                  className="w-full border border-gray-300 bg-white p-4 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                />

                <input
                  type="text"
                  name="hospitalLicenseNumber"
                  placeholder="Hospital License Number"
                  value={
                    formData.hospitalLicenseNumber
                  }
                  onChange={
                    handleChange
                  }
                  required
                  className="w-full border border-gray-300 bg-white p-4 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Hospital Contact Number"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleChange
                  }
                  required
                  className="w-full border border-gray-300 bg-white p-4 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                />

                <textarea
                  name="address"
                  placeholder="Hospital Address"
                  value={
                    formData.address
                  }
                  onChange={
                    handleChange
                  }
                  required
                  rows="3"
                  className="w-full border border-gray-300 bg-white p-4 rounded-xl focus:ring-2 focus:ring-red-500 outline-none resize-none"
                />
              </div>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={
                formData.password
              }
              onChange={handleChange}
              required
              minLength="6"
              className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={
                formData.confirmPassword
              }
              onChange={handleChange}
              required
              minLength="6"
              className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed text-white p-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg"
            >
              {loading
                ? "Creating Account..."
                : formData.role ===
                    "hospital"
                  ? "Submit for Approval"
                  : "Create Donor Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-600">
              Already have an account?
            </span>

            <Link
              to="/"
              className="ml-2 text-red-600 font-semibold hover:text-red-700"
            >
              Login
            </Link>
          </div>

          <div className="mt-8 text-center text-gray-500 text-sm">
            Secure Healthcare Access
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
