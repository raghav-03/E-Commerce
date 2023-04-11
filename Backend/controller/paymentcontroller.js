const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

exports.checkOut = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// callback route for razorpay
exports.paymentVerification = async (req, res) => {
  console.log(req.body);
  res.status(400).json({
    success: false,
  });
  // const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
  //   req.body;

  // const body = razorpay_order_id + "|" + razorpay_payment_id;

  // const expectedSignature = crypto
  //   .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
  //   .update(body.toString())
  //   .digest("hex");

  // if (expectedSignature === razorpay_signature) {
  //   const data = await paymentModel.create({
  //     razorpay_order_id,
  //     razorpay_payment_id,
  //     razorpay_signature,
  //   });

  //   res.redirect(
  //     `http://localhost:3000/order/success?reference=${razorpay_payment_id}`
  //   );
  // } else {
  //   res.status(400).json({
  //     success: false,
  //   });
  // }
};

exports.getKey = async (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_KEY,
  });
};
