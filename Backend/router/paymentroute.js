const express = require("express");

const {
  checkOut,
  getKey,
  paymentVerification,
} = require("../controller/paymentcontroller");

var middleware = require("../middleware/checkauth");

const paymentRouter = express.Router();

paymentRouter.post("/checkout", middleware.islogin, checkOut);
paymentRouter.get("/getkey", middleware.islogin, getKey);

//for callback url from payment gateway razorpay
paymentRouter.post(
  "/paymentverification",
  middleware.islogin,
  paymentVerification
);

module.exports = paymentRouter;
