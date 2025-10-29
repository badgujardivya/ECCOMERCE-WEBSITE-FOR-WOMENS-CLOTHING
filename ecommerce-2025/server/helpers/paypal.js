require("dotenv").config();

const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: process.env.PAYPAL_MODE || "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

console.log("PayPal Mode:",process.env.PAYPAL_MODE);

module.exports = paypal;
