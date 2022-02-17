import React, { Fragment, useEffect ,useState} from "react";
import MetaData from "./layout/MetaData";
import Product from "../component/Home/Product";
import {productaction,clearerr} from "../actions/productaction";
import {useSelector,useDispatch} from "react-redux"
import Loader from "./layout/Loader/Loader"
import {useAlert} from "react-alert"
import "./Products.css";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];


const Products = ({match}) => {
  const dispatch=useDispatch();
  const alert=useAlert();
  const {error,products,loading,perpageitem,productsCount,filteredproductcount} =useSelector((state)=>state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const [price, setPrice] = useState([0, 250000]);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const keyword = match.params.keyword;
  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearerr());
    }else{
      dispatch(productaction(keyword,currentPage,price,category,ratings));
    }
  }, [dispatch,error,keyword,alert,currentPage,price,error,category,ratings]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>
          <div className="products" >
            {products &&
              products.map((product) => (
                <Product key={product._id} Product={product} />
              ))}
          </div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={250000}
            />

          <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          {perpageitem < filteredproductcount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={perpageitem}
                totalItemsCount={filteredproductcount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
