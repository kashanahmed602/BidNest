const express = require("express");

const router = express.Router();

const {
  createPayment,
  safepayWebhook
} = require("../Controller/paymentController");

const auth = require("../Middleware/auth");


// Create payment
router.post("/paymentCreate",auth, createPayment);


// Safepay webhook
router.post("/paymentWebhook", safepayWebhook);


module.exports = router;