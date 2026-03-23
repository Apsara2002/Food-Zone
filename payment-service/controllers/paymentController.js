// Update payment status and amount after Stripe payment
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { orderId, amount, status } = req.body;
    const payment = await Payment.findOneAndUpdate(
      { orderId },
      { status, amount },
      { new: true }
    );
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Payment = require("../models/Payment");
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY );
// Stripe payment intent creation
exports.createStripePaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'usd', paymentMethodType = 'card' } = req.body;
    if (!amount) {
      return res.status(400).json({ message: 'Amount is required' });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amount in cents
      currency,
      payment_method_types: [paymentMethodType],
    });
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    const savedPayment = await payment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllPayments = async (req, res) => {
  const payments = await Payment.find();
  res.json(payments);
};