import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "./layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../actions/orderAction";
import Loader from "./layout/Loader/Loader";
import { useAlert } from "react-alert";

const OrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippinginfo && order.shippinginfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippinginfo &&
                      `${order.shippinginfo.address}, ${order.shippinginfo.city}, ${order.shippinginfo.state}, ${order.shippinginfo.pinCode}, ${order.shippinginfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Amount</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Amount:</p>
                  <span>{order.orderdetail && order.orderdetail.totalprice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderdetail && order.orderdetail.orderstatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderdetail && order.orderdetail.orderstatus}
                  </p>
                </div>
              </div>
            </div> 

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.ordereditems &&
                  order.ordereditems.map((item) => (
                    <div key={item.product}>
                      <Link to={`/product_detail/${item.product}`}>
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
