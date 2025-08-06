require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Schema & Model for Portfolio Items
const portfolioSchema = new mongoose.Schema({
  title: String,
  category: String,
  imageUrl: String,
});
const Portfolio = mongoose.model("Portfolio", portfolioSchema);

// Get all portfolio items
app.get("/api/portfolio", async (req, res) => {
  try {
    const items = await Portfolio.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add new portfolio item
app.post("/api/portfolio", async (req, res) => {
  try {
    const newItem = new Portfolio(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: "Bad request" });
  }
});

// Contact form submission endpoint
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Message from Contact:", { name, email, message });
  // Here you can add email notification logic if desired
  res.json({ ok: true, msg: "Message received!" });
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
