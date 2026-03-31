import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import itemsRouter from "./routes/items.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

const mongoURI = process.env.MONGODB_URI;

app.use("/api/items", itemsRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Start server ONLY after DB connects
const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");
    
    await mongoose.connect(mongoURI);

    console.log("Connected to MongoDB!");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API: /api/items`);
    });

  } catch (err) {
    console.error("X MongoDB connection error:", err);
    process.exit(1);
  }
};

startServer();