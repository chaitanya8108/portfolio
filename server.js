const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
); // Explicitly specify collection name

const Project = mongoose.model("Project", projectSchema);

// Endpoint to fetch all projects
app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    console.log("Projects found:", projects); // Log the fetched projects
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).send("Server Error");
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
