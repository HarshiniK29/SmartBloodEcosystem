import {
  useState,
  useEffect,
} from "react";

import {
  useDispatch,
} from "react-redux";

import {
  useNavigate,
} from "react-router-dom";

import api from "../api/axios";

import {
  loginSuccess,
} from "../redux/slices/authSlice";

import {
  getPublicStats,
} from "../services/dashboardService";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [stats, setStats] =
    useState({
      donors: 0,
      totalUnits: 0,
      requests: 0,
    });

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats =
    async () => {
      try {
        const data =
          await getPublicStats();

        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const res =
          await api.post(
            "/auth/login",
            {
              email,
              password,
            }
          );

        dispatch(
          loginSuccess({
            user:
              res.data.user,
            token:
              res.data.token,
          })
        );

        navigate(
          "/dashboard"
        );
      } catch (error) {
        console.error(error);

alert(
  error?.response?.data
    ?.message ||
    "Login Failed"
);
      }
    };

return (
  <div className="min-h-screen flex overflow-hidden">
    {/* LEFT SIDE */}

    <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-red-950 via-red-800 to-black text-white p-12 flex-col justify-center overflow-hidden">

      {/* Floating Medical Icons */}

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
          AI-Powered Emergency
          Response Platform
        </h2>

        <p className="text-xl text-gray-200 leading-relaxed mb-10 max-w-2xl">
          Connecting Hospitals,
          Donors & Blood Banks Through
          Intelligent Healthcare
          Technology.
        </p>

        <div className="space-y-5 text-lg">
          <p>
            ✅ Real-Time Inventory
          </p>

          <p>
            ✅ Smart Donor Matching
          </p>

          <p>
            ✅ Emergency Response
            Intelligence
          </p>

          <p>
            ✅ Blood Shortage
            Prediction
          </p>

          <p>
            ✅ Predictive Healthcare Analytics
          </p>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-3 gap-6 mt-12">

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-center shadow-lg">
            <h3 className="text-4xl font-bold">
              {stats.donors}
            </h3>

            <p className="mt-2 text-gray-200">
              Registered Donors
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-center shadow-lg">
            <h3 className="text-4xl font-bold">
              {stats.totalUnits}
            </h3>

            <p className="mt-2 text-gray-200">
              Blood Units
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-center shadow-lg">
            <h3 className="text-4xl font-bold">
              {stats.requests}
            </h3>

            <p className="mt-2 text-gray-200">
              Emergencies
            </p>
          </div>

        </div>

        <div className="flex items-center gap-3 mt-10 text-2xl font-medium animate-pulse">
          ❤️
          <span>
            Intelligent Healthcare
            Decision Support
          </span>
        </div>
      </div>
    </div>

    {/* RIGHT SIDE */}

    <div className="w-full lg:w-1/2 bg-gray-100 flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

        <div className="text-center mb-8">

          <div className="w-24 h-24 bg-red-600 shadow-lg rounded-full flex items-center justify-center mx-auto mb-5 animate-pulse">

            <span className="text-5xl">
              🩸
            </span>

          </div>

          <h2 className="text-4xl font-bold">
            Welcome Back
          </h2>

          <p className="text-gray-500 mt-3">
            Secure access to the Smart
            Blood Ecosystem Platform
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white p-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg"
          >
            Login
          </button>
        </form>
<div className="mt-6 text-center">

  <span className="text-gray-600">
    Don't have an account?
  </span>

  <Link
    to="/register"
    className="ml-2 text-red-600 font-semibold hover:text-red-700"
  >
    Register
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

export default Login;
