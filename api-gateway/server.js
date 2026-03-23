const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Customer Service
app.use("/customers", createProxyMiddleware({
  target: "http://localhost:5001/api/customers",
  changeOrigin: true,
  pathRewrite: {
    "^/customers": ""
  }
}));

// Restaurant Service
app.use("/restaurants", createProxyMiddleware({
  target: "http://localhost:5002/api/restaurants",
  changeOrigin: true,
  pathRewrite: {
    "^/restaurants": ""
  }
}));

// Menu Service
app.use("/menu", createProxyMiddleware({
  target: "http://localhost:5003/api/menu",
  changeOrigin: true,
  pathRewrite: {
    "^/menu": ""
  }
}));

// Order Service
app.use("/orders", createProxyMiddleware({
  target: "http://localhost:5004/api/orders",
  changeOrigin: true,
  pathRewrite: {
    "^/orders": ""
  }
}));

// Payment Service
app.use("/payments", createProxyMiddleware({
  target: "http://localhost:5005/api/payments",
  changeOrigin: true,
  pathRewrite: {
    "^/payments": ""
  }
}));

app.listen(5000, () => {
  console.log("API Gateway running on port 5000");
});