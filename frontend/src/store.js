import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducer ,productdetailReducer,newReviewReducer,productReducer,newProductReducer,productReviewsReducer,reviewReducer} from "./reducers/productreducer";
import { userReducer ,updateprofileReducer ,forgotPassword,allUsersReducer,userDetailsReducer} from "./reducers/userreducer";
import {cartReducer} from "./reducers/cartReducer"
import {newOrderReducer,myOrdersReducer,orderDetailsReducer,allOrdersReducer,orderReducer} from "./reducers/orderReducer"

const reducer=combineReducers({
  products:productsReducer,
  productdetail:productdetailReducer,
  user:userReducer,
  updateprofileReducer:updateprofileReducer,
  forgotPassword:forgotPassword,
  cart:cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  allUsers: allUsersReducer,
  allOrders: allOrdersReducer,
  product: productReducer,
  newProduct: newProductReducer,
  order: orderReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
});

let initialstate = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware=[thunk];


const store = createStore(
    reducer,
    initialstate,
    composeWithDevTools(
      applyMiddleware(...middleware)
    )
);

export default store;


