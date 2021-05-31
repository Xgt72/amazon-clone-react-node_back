const { STRIPE_KEY } = process.env;
const stripe = require("stripe")(STRIPE_KEY);

const paymentsRouter = require("express").Router();

paymentsRouter.post("/", async (req, res) => {
  const { total } = req.query;

  //   console.log("Payment Request Received for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "eur",
  });
  res.status(201).json({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = paymentsRouter;
