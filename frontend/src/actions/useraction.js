import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    CLEAR_ERROR,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    LOAD_FAIL,
    LOAD_REQUEST,
    LOAD_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    PROFILE_UPDATE_FAIL,
    PROFILE_UPDATE_REQUEST,
    PROFILE_UPDATE_SUCCESS,
    PASSWORD_UPDATE_FAIL,
    PASSWORD_UPDATE_SUCCESS,
    PASSWORD_UPDATE_REQUEST,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
} from  "../constants/userconstant";
import axios from "axios";
export const loginaction =  (email, password) =>  async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
    
        const { data } = await axios.post(
          `/user/login`,
          { email, password },
          config
        );
    
        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data.message,
        })
    }
}

export const registeraction =  (name,email,password,avatar,cpassword) =>  async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
    
        const { data } = await axios.post(
          `/user/signup`,
          {name,email,password,avatar,cpassword},
          config
        );
    
        dispatch({ type: REGISTER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type:REGISTER_FAIL,
            payload:error.response.data.message,
        })
    }
}

export const updateuseraction =  (name,email,avatar) =>  async (dispatch) => {
    try {
        dispatch({ type: PROFILE_UPDATE_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(`/user/updateuser`,{name,email,avatar},config);
        dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type:PROFILE_UPDATE_FAIL,
            payload:error.response.data.message,
        })
    }
}

export const updatePassword =  (oldpassword,password,cpassword) =>  async (dispatch) => {
    try {
        dispatch({ type: PASSWORD_UPDATE_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(`/user/updatepass`,{oldpassword,password,cpassword},config);
        dispatch({ type: PASSWORD_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type:PASSWORD_UPDATE_FAIL,
            payload:error.response.data.message,
        })
    }
}


export const loadcredentials =  () =>  async (dispatch) => {
    try {
        dispatch({ type: LOAD_REQUEST });

        const { data } = await axios.get(`/user/userdetail`);
        dispatch({ type: LOAD_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type:LOAD_FAIL,
            payload:error.response.data.message,
        })
    }
}

export const clearerr=() =>  async (dispatch) => {
    dispatch({
        type:CLEAR_ERROR,
    })
}

export const logoutaction =  () =>  async (dispatch) => {
    try {
        await axios.post(`/user/logout`);
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({
            type:LOGOUT_FAIL,
            payload:error.response.data.message,
        })
    }
}

export const forgotPassword =  (email) =>  async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
    
        const { data } = await axios.post(
          `/user/forgot`,
          { email },
          config
        );
    
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type:FORGOT_PASSWORD_FAIL,
            payload:error.response.data.message,
        })
    }
}

export const resetPassword =  (token,password,cpassword) =>  async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
    
        const { data } = await axios.post(
          `/user/changepass/${token}`,
          { password, cpassword},
          config
        );
    
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type:RESET_PASSWORD_FAIL,
            payload:error.response.data.message,
        })
    }
}

// get All Users
export const getAllUsers = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_USERS_REQUEST });
      const { data } = await axios.get(`/admin/getalluser`);
  
      dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
      dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST });
  
      const { data } = await axios.delete(`/admin/getuser/${id}`);
  
      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Update User
export const updateUser = (id, userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(
        `/admin/getuser/${id}`,
        userData,
        config
      );
  
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // get  User Details
export const getUserDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });
      const { data } = await axios.get(`/admin/getuser/${id}`);
  
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
    }
  };