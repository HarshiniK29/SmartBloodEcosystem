const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const inventoryRoutes = require(
  "./routes/inventoryRoutes"
);
const dashboardRoutes = require(
  "./routes/dashboardRoutes"
);
const donorRoutes = require(
  "./routes/donorRoutes"
);
const emergencyRoutes = require(
  "./routes/emergencyRoutes"
);
const profileRoutes = require(
  "./routes/profileRoutes"
);
const adminRoutes = require(
  "./routes/adminRoutes"
);

dotenv.config();

connectDB();

const app = express();

// Middleware

app.use(cors());
app.use(express.json());

// Routes

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/user",
  userRoutes
);

app.use(
  "/api/inventory",
  inventoryRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/donors",
  donorRoutes
);

app.use(
  "/api/emergency",
  emergencyRoutes
);

app.use(
  "/api/profile",
  profileRoutes
);

// NEW ADMIN ROUTES

app.use(
  "/api/admin",
  adminRoutes
);

// Root Route

app.get("/", (req, res) => {
  res.send(
    "Blood Ecosystem API Running"
  );
});

// Start Server

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});