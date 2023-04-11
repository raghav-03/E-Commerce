import React, { Fragment, useEffect, useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "./layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import { createOrder, clearErrors } from "../actions/orderAction";
import axios from "axios";
const ConfirmOrder = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error, order } = useSelector((state) => state.newOrder);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
  const Order = {
    shippinginfo: shippingInfo,
    ordereditem: cartItems,
  };

  // const confirmorder = (e) => {
  //   e.preventDefault();
  //   const data = {
  //     subtotal,
  //     shippingCharges,
  //     tax,
  //     totalPrice,
  //   };

  //   sessionStorage.setItem("orderInfo", JSON.stringify(data));
  //   dispatch(createOrder(Order));
  //   history.push("/success");
  // };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  const proceedToPayment = async () => {
    const {
      data: { key },
    } = await axios.get("/payment/getkey");

    const {
      data: { order },
    } = await axios.post("/payment/checkout", { amount: totalPrice });
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Ecommerce",
      description: "Payment for your order",
      image: user.images.public_url,
      order_id: order.id,
      handler: function (response) {
        Order.paymentInfo = {
          id: response.razorpay_payment_id,
          status: "succeeded",
        };
        dispatch(createOrder(Order));
        history.push("/success");
      },
      // callback_url: "/payment/paymentverification",
      prefill: {
        name: user.name,
        email: user.email,
        contact: shippingInfo.phoneNumber,
      },
      notes: {
        address,
      },
      theme: {
        color: "#121212",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
    razor.on("payment.failed", (response) => {
      alert.error("Payment failed");
    });
  };
  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
