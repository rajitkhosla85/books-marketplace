import axios from "axios"
import { AUTH, LOGOUT } from "../constants/userConstants"

export const signin = (form) => async (dispatch) => {
    try {
        const { data } = await axios.post("/auth/login", form);
        dispatch({ type: AUTH, payload: data });
    } catch (error) {
        console.log(error)
    }
}

export const signup = (form) => async (dispatch) => {
    try {
      const { data } = await axios.post('/auth/signup', form);
  
      dispatch({
        type: AUTH,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  export const logout = (form) => async (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: LOGOUT });
    document.location.href = '/';
  };
  