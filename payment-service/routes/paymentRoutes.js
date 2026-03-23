
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Update payment status after Stripe payment
router.put("/update-status", paymentController.updatePaymentStatus);


router.get("/", paymentController.getAllPayments);
router.post("/", paymentController.createPayment);

// Stripe payment intent route
router.post("/create-stripe-intent", paymentController.createStripePaymentIntent);

module.exports = router;