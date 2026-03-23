
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

dotenv.config();

// Stripe keys check (optional, for dev warning)
if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PUBLISHABLE_KEY) {
  console.warn('Warning: Stripe keys are not set in .env. Using hardcoded test keys.');
}

const app = express();
app.use(cors());
app.use(express.json());

const paymentRoutes = require("./routes/paymentRoutes");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/payments", paymentRoutes);

const swaggerDocument = YAML.load("./swagger/payment.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Payment Service running on port ${PORT}`);
});