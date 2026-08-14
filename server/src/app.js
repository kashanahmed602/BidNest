const express = require("express");
const cors = require("cors");

const app = express();

const cspPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com https://*.googletagmanager.com https://www.google.com https://www.gstatic.com https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: https: blob:",
  "font-src 'self' https://fonts.gstatic.com data:",
  "connect-src 'self' https://*.api.getsafepay.com https://sandbox.api.getsafepay.com https://api.getsafepay.com https://www.google-analytics.com https://*.googletagmanager.com https://bidnest-production.up.railway.app",
  "frame-src 'self' https://*.getsafepay.com https://sandbox.api.getsafepay.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'"
].join("; ");

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", cspPolicy);
  next();
});

app.use(cors());
app.use(express.json());

app.use("/api/v1", require("./Routes/userRoutes"));
app.use("/api/v1", require("./Routes/countryRoutes"));
app.use("/api/v1", require("./Routes/productRoutes"));
app.use("/api/v1", require("./Routes/auctionRoutes"));
app.use("/api/v1", require("./Routes/paymentRoutes"));

module.exports = app;