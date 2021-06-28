import { ADD_BOOK_DETAILS, EDIT_BOOK_DETAILS, DELETE_BOOK_DETAILS, DELETE_BOOK_DETAILS_MANY, FETCH_BOOK_DETAILS, BUY_BOOK } from "../constants/bookConstants"

export const bookReducer = (books = [], action) => {
    switch (action.type) {
        case FETCH_BOOK_DETAILS:
            return action.payload;
        case ADD_BOOK_DETAILS:
            return [...books, action.payload]
        case DELETE_BOOK_DETAILS:
            return books.filter((book) => book._id !== action.payload)
        case EDIT_BOOK_DETAILS:
            return books.map((book) => book._id === action.payload._id ? action.payload : book)
        case BUY_BOOK:
            return books.map((book) => book._id === action.payload._id ? action.payload : book)
        case DELETE_BOOK_DETAILS_MANY:
            return books.filter(function (c) {
                return action.payload.indexOf(c._id) === -1
            });
        default: return books
    }

}

