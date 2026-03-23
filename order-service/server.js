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

const orderRoutes = require("./routes/orderRoutes");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/orders", orderRoutes);

const swaggerDocument = YAML.load("./swagger/order.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});