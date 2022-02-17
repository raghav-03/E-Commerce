import React, { Fragment, useEffect , useState } from "react";
import { CgMouse } from "react-icons/all";
import MetaData from "../component/layout/MetaData";
import {productdetailaction,clearerr,newReview} from "../actions/productaction";
import {useSelector,useDispatch} from "react-redux"
import Loader from "../component/layout/Loader/Loader"
import {useAlert} from "react-alert"
import Carousel from "react-material-ui-carousel";
import ReviewCard from "./ReviewCard";
import "./ProductDetails.css";
import { Rating } from "@material-ui/lab";
import {addItemsToCart} from "../actions/cartAction"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { NEW_REVIEW_RESET } from "../constants/productconstant";

const Product_detail = ({match}) => {
  const dispatch=useDispatch();
  const alert=useAlert();
  const {error,product,loading} = useSelector((state)=>state.productdetail);
  const {reviewError,success} = useSelector((state)=>state.newReview);
  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearerr());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearerr());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(productdetailaction(match.params.id));
  }, [dispatch,error,success]);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.quantity <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  
  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Item Added To Cart");
  };
  const reviewSubmitHandler = () => {

    dispatch(newReview(rating,comment,match.params.id));

    setOpen(false);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.public_url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
               <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.quantity < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:
                  <b className={product.quantity < 1 ? "redColor" : "greenColor"}>
                    {product.quantity < 1 ? "Out Of Stock" : "In Stock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{product.desc}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button 
              onClick={reviewSubmitHandler} 
              color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Product_detail;
