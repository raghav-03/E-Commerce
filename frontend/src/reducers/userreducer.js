import {LOGIN_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS,CLEAR_ERROR,REGISTER_FAIL,REGISTER_REQUEST,REGISTER_SUCCESS,LOAD_FAIL,LOAD_REQUEST,LOAD_SUCCESS,LOGOUT_FAIL,LOGOUT_SUCCESS,PROFILE_UPDATE_FAIL,PROFILE_UPDATE_REQUEST,PROFILE_UPDATE_SUCCESS,PROFILE_UPDATE_RESET,PASSWORD_UPDATE_RESET,PASSWORD_UPDATE_FAIL,PASSWORD_UPDATE_SUCCESS,PASSWORD_UPDATE_REQUEST,FORGOT_PASSWORD_REQUEST,FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_FAIL,RESET_PASSWORD_REQUEST,RESET_PASSWORD_SUCCESS,RESET_PASSWORD_FAIL,    ALL_USERS_REQUEST,
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
    UPDATE_USER_RESET,
    DELETE_USER_RESET
} from  "../constants/userconstant";
export const userReducer=(state = { user: {} },action)=>{
    switch (action.type) {
        case LOGIN_REQUEST:
            case REGISTER_REQUEST:
                case LOAD_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case LOGIN_SUCCESS:
            case REGISTER_SUCCESS:
                case LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case LOGIN_FAIL:
            case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case LOAD_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case LOGOUT_SUCCESS:
            return{
                loading: false,
                isAuthenticated: false,
                user: null,
            }
        case LOGOUT_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERROR:
            return{
                ...state,
                error:null
        }            
        default:
            return state;
    }
}
export const updateprofileReducer=(state = {},action)=>{
    switch (action.type) {
        case PROFILE_UPDATE_REQUEST:
        case PASSWORD_UPDATE_REQUEST:
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PROFILE_UPDATE_SUCCESS:
        case PASSWORD_UPDATE_SUCCESS:
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success,
                message: action.payload.message,
        };
        case PROFILE_UPDATE_FAIL:
        case PASSWORD_UPDATE_FAIL:
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };    
        case PROFILE_UPDATE_RESET:
        case PASSWORD_UPDATE_RESET:
        case UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        
        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case CLEAR_ERROR:
            return{
                ...state,
                error:null
            }            
        default:
            return state;
    }
}


export const forgotPassword=(state = {},action)=>{
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FORGOT_PASSWORD_SUCCESS:
            case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
            };
        case FORGOT_PASSWORD_FAIL:
            case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };    
        case CLEAR_ERROR:
            return{
                ...state,
                error:null
            }            
        default:
            return state;
    }
}


export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
      case ALL_USERS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_USERS_SUCCESS:
        return {
          ...state,
          loading: false,
          users: action.payload,
        };
  
      case ALL_USERS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERROR:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case USER_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case USER_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
  
      case USER_DETAILS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERROR:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  