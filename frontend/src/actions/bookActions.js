import { ADD_BOOK_DETAILS, EDIT_BOOK_DETAILS, DELETE_BOOK_DETAILS, DELETE_BOOK_DETAILS_MANY, FETCH_BOOK_DETAILS, BUY_BOOK } from "../constants/bookConstants"
import axios from "axios"

export const createBookDetails = (form) => async (dispatch, getState) => {
    
    try {
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.post("/books", form, config)
        dispatch({ type: ADD_BOOK_DETAILS, payload: data })
    } catch (error) {
        console.log(`error {error.message}`);
    }

}

export const editBookDetails = (id, form) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(`/books/${id}`, form, config)
        dispatch({ type: EDIT_BOOK_DETAILS, payload: data })
    } catch (error) {
        console.log(`error {error.message}`);
    }

}

export const fetchBooksDetail = () => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get("/books", config)
        dispatch({ type: FETCH_BOOK_DETAILS, payload: data })
    } catch (error) {
        console.log(`error {error.message}`);
    }
}

export const deleteBook = (id) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        await axios.delete(`/books/${id}`, config)
        dispatch({ type: DELETE_BOOK_DETAILS, payload: id })
    } catch (error) {
        console.log(`error {error.message}`);
    }
}

export const buyBook = (id) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(`/books/buy/${id}`, "", config)
        dispatch({ type: BUY_BOOK, payload: data })
    } catch (error) {
        console.log(`error {error.message}`);
    }
}

export const multiDeleteBooks = (ids) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        await axios.post(`/books/delete`, ids, config)
        dispatch({ type: DELETE_BOOK_DETAILS_MANY, payload: ids })
    } catch (error) {
        console.log(`error {error.message}`);
    }
}


