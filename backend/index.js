const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const taskRoutes = require("./routes/todoRoute");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api", taskRoutes);

app.get("/health", (req, res) => {
  res.send("Server is healthy!");
});

app.listen(PORT, () => {
  console.log(`Server started ${PORT}`);
  connectDB();
});
