import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERROR,
    PRODUCT_FAIL,
    PRODUCT_SUCCESS, 
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
} from  "../constants/productconstant";
import axios from "axios";

export const productaction =  (keyword="",currentPage=1,price=[0,250000],category,ratings=0) =>  async (dispatch) => {
    try {
        dispatch({
            type:ALL_PRODUCT_REQUEST,
        })
        let link=`/product/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        if(category){
            link=`/product/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
        }
        const {data}= await axios.get(link);
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message,
        })
    }
}


// Clearing Errors
export const clearerr = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};


export const productdetailaction =  (id) =>  async (dispatch) => {
    try {
        const {data}= await axios.get(`/product/getone-product/${id}`);
        console.log(data);
        dispatch({
            type:PRODUCT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_FAIL,
            payload:error.response.data.message,
        })
    }
}

  // NEW REVIEW
  export const newReview = (rating,comment,productid) => async (dispatch) => {
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(`/user/create-reviews`,{rating,comment,productid}, config);
  
      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };



// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_PRODUCT_REQUEST });
  
      const { data } = await axios.get("/admin/getallproduct");
  
      dispatch({
        type: ADMIN_PRODUCT_SUCCESS,
        payload: data.products,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Create Product
  export const createProduct = (productData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_PRODUCT_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(
        `/admin/create-product`,
        productData,
        config
      );
  
      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Update Product
  export const updateProduct = (id, productData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(
        `/admin/update-product/${id}`,
        productData,
        config
      );
  
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete Product
  export const deleteProduct = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });
  
      const { data } = await axios.delete(`/admin/delete-product/${id}`);
  
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  

  
  // Get All Reviews of a Product
  export const getAllReviews = (id) => async (dispatch) => {
    try {
      dispatch({ type: ALL_REVIEW_REQUEST });
  
      const { data } = await axios.get(`/product/getone-product-reviews/${id}`);
  
      dispatch({
        type: ALL_REVIEW_SUCCESS,
        payload: data.reviews,
      });
    } catch (error) {
      dispatch({
        type: ALL_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete Review of a Product
  export const deleteReviews = (reviewId, productId) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_REVIEW_REQUEST });
  
      const { data } = await axios.delete(
        `/admin/delete-review?reviewid=${reviewId}&productid=${productId}`
      );
  
      dispatch({
        type: DELETE_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  