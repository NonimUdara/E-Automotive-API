//import Stripe from "stripe";
const Stripe = require('stripe');
const express = require('express');
const app = express.Router();

// const PUBLISHABLE_KEY = "pk_test_51N1DBBIcQPaMmd0Kitgwpu1HRAZxuFKrdac53qE4alOJZ5GURZkFuDfcPmCqFVFdUHXjTyOuX5Um31ffNeBavZyz00pIOY6omo";
// const SECRET_KEY = "sk_test_51N1DBBIcQPaMmd0K4rV3tebawAORe1YPUJZYpF2myAdLuKECLSGH74wry09Me4yG1z6rPkS382LOcWumCqnGjEf1005mL0cbVD";

//update stripe publishable key and secret key..

const PUBLISHABLE_KEY = "pk_test_51QiFa22NxTyhzQ4xy1JRcdt8dGHYCPQmb4IMvcUlX2HyZpJDFl4HnPektBP89FmPsc0ge4ONiTCWvMeabvAqHUDz00Mh9LV9qW";
const SECRET_KEY = "sk_test_51QiFa22NxTyhzQ4x6midlw9kKQpk9F4aRa3T9B1ERaHAf8TfV3mRH7BW6Y3rpcInILMyrmK29qm3QGvQtWG1NSGh00TZ3rrOFb";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.post("/create-payment-intent", async (req, res) => {
  //console.log(req.email)
  //console.log("req:" , req);
  //console.log("req body:" , req.body);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round((req.body.amount*100)/330), //lowest denomination of particular currency
      // amount: 100, 
      currency: "usd",
      payment_method_types: ["card"], //by default
      receipt_email: req.body.email,
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log('Payment error',e.message);
    res.json({ error: e.message });
  }
});

module.exports = app;
