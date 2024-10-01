const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
// Get authentication token
app.post("/api/get-token", async (req, res) => {
  const consumer_key = process.env.CONSUMER_KEY;
  const consumer_secret = process.env.CONSUMER_SECRET;
  const url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  const auth = Buffer.from(`${consumer_key}:${consumer_secret}`).toString(
    "base64"
  );

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting token");
  }
});

// Handle STK Push
app.post("/api/stkpush", async (req, res) => {
  const token = "P0oXBNJNS3GUIgvZ7hLlwH17VKrt"; // Token from client
  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

  const stkPushData = {
    BusinessShortCode: process.env.SHORTCODE,
    Password: Buffer.from(
      `${process.env.SHORTCODE}${process.env.PASSKEY}${new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/[-:T]/g, "")}`
    ).toString("base64"),
    Timestamp: new Date().toISOString().slice(0, 19).replace(/[-:T]/g, ""),
    TransactionType: "CustomerPayBillOnline",
    Amount: req.body.amount,
    PartyA: req.body.phone, // Phone number of the customer initiating payment
    PartyB: process.env.SHORTCODE,
    PhoneNumber: req.body.phone,
    CallBackURL: process.env.CALLBACK_URL,
    AccountReference: process.env.ACCOUNT_REFERENCE,
    TransactionDesc: process.env.TRANSACTION_DESC,
  };

  try {
    const response = await axios.post(url, stkPushData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error initiating STK Push");
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
