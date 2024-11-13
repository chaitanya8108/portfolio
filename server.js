require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Enable CORS with the client URL from the .env file
app.use(cors({ origin: process.env.CLIENT_URL }));

app.use(express.json());

// Connect to MongoDB using the connection string from the .env file
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Define Project Schema
const projectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    link: String,
    gitHub: String,
    image: String,
  },
  { collection: "projects" }
);

const Project = mongoose.model("Project", projectSchema);

// Endpoint to fetch all projects
app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).send("Server Error");
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
