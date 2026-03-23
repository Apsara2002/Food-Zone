const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const menuRoutes = require("./routes/menuRoutes");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/menu", menuRoutes);

const swaggerDocument = YAML.load("./swagger/menu.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Menu Service running on port ${PORT}`);
});