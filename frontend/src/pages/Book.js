import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import BookForm from "../components/BookForm";
import BooksTable from "../components/BooksTable";
import { fetchBooksDetail } from "../actions/bookActions";
import { useDispatch, useSelector } from "react-redux";

const Book = ({ history }) => {
    const [open, setOpen] = useState(false);
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    if (!userLogin.userInfo) {
       history.push("/");
    }
    useEffect(() => {
        dispatch(fetchBooksDetail());
    })

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <div>
            <Header userInfo={userInfo} />
            <BookForm open={open} currentId={currentId} setCurrentId={setCurrentId} handleClose={handleClose} />
            <BooksTable handleOpen={handleOpen} setCurrentId={setCurrentId} currentId={currentId} />
        </div>
    )

}

export default Book

