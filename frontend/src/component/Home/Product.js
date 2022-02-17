import React from 'react';
import {Link} from "react-router-dom";
import ReactStars from 'react-rating-stars-component';


const Product = (props) => {
  const options={
    edit:false,
    size:window.innerWidth<600? 10:15,
    value:props.Product.ratings,
    isHalf:true,
  };
  return (
      <Link className='productCard' to={`product_detail/${props.Product._id}`}>
        <img src={props.Product.images[0].public_url}></img>
        <p>{props.Product.name}</p>
        <div>
          <ReactStars  {...options }/><span>({props.Product.noofreviews})</span>
        </div>
        <span>Rs{props.Product.price}</span>
      </Link>
    )
};

export default Product;
