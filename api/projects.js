require("dotenv").config();
const mongoose = require("mongoose");

// Connect to MongoDB only once
let isConnected = false;
async function connectToDB() {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected");
  }
}

// Define Project Schema and Model
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  gitHub: String,
  image: String,
});
const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

// Export the serverless function
module.exports = async (req, res) => {
  await connectToDB();

  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
