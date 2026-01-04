// Loads environment variables from .env file
dotenv.config();

// Import libraries
import express from "express";
import dotenv from "dotenv";
import authroutes from "../server/routes/authRoutes.js";
import pasteroutes from "../server/routes/pasteRoutes.js";
import mongoose from "mongoose";

import cors from "cors";

// Create express app
const app = express();

// Allows frontend (port 3000) to talk to backend (5000)
app.use(cors({
  origin: [
    "http://localhost:5173", // for local dev
    "https://paste-app-five-hazel.vercel.app/" // your deployed frontend
  ],
  credentials: true, // if you are using cookies
}));

// Allows JSON data from frontend
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//Test route (VERY IMPORTANT)
//Test route (VERY IMPORTANT)
app.get("/api/health", (req, res) => {
  res.send("Backend is running");
});
app.use("/api/auth" , authroutes);
app.use("/api/paste" , pasteroutes);

// Start server

// Start server
const PORT = process.env.PORT || 5000;

// Production deployment configuration
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Serve static files from the React client
// app.use(express.static(path.join(__dirname, "../client/dist")));

// // Handle React routing, return all requests to React app
// app.get(/.*/, (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist/index.html"));
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
