import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import Product_detail from "./component/Product_detail";
import Products from "./component/Products";
import Search from "./component/Search";
import Loginsignup from "./component/Loginsignup"
import store from "./store"
import {loadcredentials} from "./actions/useraction";
import { useSelector } from "react-redux";
import UserOptions from "./component/UserOptions"
import Profile from "./component/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute"
import UpdateProfile from "./component/UpdateProfile";
import UpdatePassword from "./component/UpdatePassword";
import ForgotPassword from "./component/ForgotPassword";
import ResetPassword from "./component/ResetPassword";
import Cart from  "./component/Cart"
import Shipping from "./component/Shipping"
import ConfirmOrder from "./component/ConfirmOrder"
import OrderSuccess from "./component/OrderSuccess";
import MyOrders from "./component/MyOrders";
import OrderDetails from "./component/OrderDetails"
import Dashboard from "./component/Dashboard"
import ProductList from "./component/ProductList"
import NewProduct from "./component/NewProduct"
import UpdateProduct from "./component/UpdateProduct"
import OrderList from "./component/OrderList"
import ProcessOrder from "./component/ProcessOrder"
import UsersList from "./component/UsersList"
import UpdateUser from "./component/UpdateUser"
import ProductReviews from "./component/ProductReviews"

function App() {
  useEffect(() => {
    store.dispatch(loadcredentials());
  }, []);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product_detail/:id" component={Product_detail}/>
        <Route exact path="/products" component={Products}/>
        <Route exact path="/products/:keyword" component={Products}/>
        <Route exact path="/search" component={Search}/>
        <Route exact path="/login" component={Loginsignup}/>
        <ProtectedRoute exact path="/account" component={Profile}/>
        <ProtectedRoute exact path="/profile/update" component={UpdateProfile}/>
        <ProtectedRoute exact path="/password/update" component={UpdatePassword}/>
        <Route exact path="/password/forgot" component={ForgotPassword}/>
        <Route exact path="/resetpass/:token" component={ResetPassword}/>
        <Route exact path="/cart" component={Cart}/>
        <ProtectedRoute exact path="/shipping" component={Shipping}/>
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/success" component={OrderSuccess} />
        <ProtectedRoute exact path="/orders" component={MyOrders} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

        <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard}/>
        <ProtectedRoute exact path="/admin/products" isAdmin={true} component={ProductList}/>
        <ProtectedRoute exact path="/admin/product" isAdmin={true} component={NewProduct}/>
        <ProtectedRoute exact path="/admin/product/:id" isAdmin={true} component={UpdateProduct}/>
        <ProtectedRoute exact path="/admin/orders"isAdmin={true} component={OrderList}/>
        <ProtectedRoute exact path="/admin/order/:id" isAdmin={true} component={ProcessOrder}/>
        <ProtectedRoute exact path="/admin/users" isAdmin={true} component={UsersList} />
        <ProtectedRoute exact path="/admin/user/:id" isAdmin={true} component={UpdateUser}/>
        <ProtectedRoute exact path="/admin/reviews" isAdmin={true} component={ProductReviews}/>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
