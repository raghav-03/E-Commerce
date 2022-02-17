import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import MetaData from "../layout/MetaData";
import Product from "./Product.js";
import "./Home.css";
import {productaction} from "../../actions/productaction";
import {useSelector,useDispatch} from "react-redux"
import Loader from "../layout/Loader/Loader"
import {useAlert} from "react-alert"
const Home = () => {
  const dispatch=useDispatch();
  const alert=useAlert();
  const {error,products,loading} =useSelector((state)=>state.products);
  useEffect(() => {
    if(error){
      alert.error(error);
    }else{
      dispatch(productaction());
    }
  }, [dispatch,error]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />

          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <Product key={product._id} Product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
