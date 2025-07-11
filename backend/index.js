const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const taskRoutes = require("./routes/todoRoute");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

app.use("/api", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server started ${PORT}`);
  connectDB();
});
