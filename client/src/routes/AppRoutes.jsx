import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Inventory from "../pages/Inventory";
import Donors from "../pages/Donors";
import EmergencyRequests from "../pages/EmergencyRequests";
import Analytics from "../pages/Analytics";
import BloodMap from "../pages/BloodMap";
import Profile from "../pages/Profile";
import EmergencyCenter from "../pages/EmergencyCenter";
import HospitalApprovals from "../pages/HospitalApprovals";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/donors" element={<Donors />} />
      <Route path="/profile" element={<Profile />} />
  <Route
  path="/emergency"
  element={<EmergencyRequests />}
/>
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/map" element={<BloodMap />} />
      <Route
  path="/emergency-center"
  element={<EmergencyCenter />}
/>
<Route
  path="/hospital-approvals"
  element={
    <HospitalApprovals />
  }
/>
    </Routes>
  );
}

export default AppRoutes;