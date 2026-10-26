import { Link, useLocation } from "react-router-dom";

import {
  FaHome,
  FaTint,
  FaUsers,
  FaChartBar,
  FaMapMarkedAlt,
  FaAmbulance,
  FaHospital,
  FaUser,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Inventory",
      path: "/inventory",
      icon: <FaTint />,
    },
    {
      name: "Donors",
      path: "/donors",
      icon: <FaUsers />,
    },
    {
      name: "Emergency Requests",
      path: "/emergency",
      icon: <FaAmbulance />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <FaChartBar />,
    },
    {
      name: "Blood Map",
      path: "/map",
      icon: <FaMapMarkedAlt />,
    },
    {
      name: "Hospital Approvals",
      path: "/hospital-approvals",
      icon: <FaHospital />,
    },
    {
      name: "Emergency Center",
      path: "/emergency-center",
      icon: <span>🚨</span>,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
  ];

  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-gray-900 text-white p-5 overflow-y-auto z-50">

      <h1 className="text-2xl font-bold text-red-500 mb-10">
        🩸 Blood Ecosystem
      </h1>

      <ul className="space-y-3">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-red-600 text-white"
                  : "hover:bg-gray-800"
              }`}
            >
              {item.icon}

              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Sidebar;
