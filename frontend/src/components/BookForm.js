import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Button, DialogActions, TextField, DialogContentText, DialogContent, DialogTitle, Dialog, Select, MenuItem, InputLabel } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import FileBase from "react-file-base64"
import { createBookDetails, editBookDetails } from '../actions/bookActions';
const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        textAlign: 'center',
        fontSize: '1.96rem',
    },
    name: {
        textAlign: 'left',
    },
}));
const BookForm = (props) => {
    const dispatch = useDispatch();
    const initialState = {
        bookName: "",
        author: "",
        publication: "",
        price: "0",
        status: "",
        selectedImage: ""
    }

    const [bookDetails, setBookDetails] = useState(initialState );

    const editBook = useSelector((state) => {
        return props.currentId ? state.books.find((c) => c._id === props.currentId) : null
    })

    useEffect(() => {
        if (editBook) {
            setBookDetails(editBook);
        }
    }, [editBook])
    const classes = useStyles();

    const clearData = () => {
        setBookDetails(initialState);
        props.setCurrentId(0);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(validateInfo(bookDetails)){
            alert("Please fill in all details");
            return;
        }
        props.handleClose();
        if (props.currentId) {
            dispatch(editBookDetails(props.currentId, bookDetails));
        } else {
            dispatch(createBookDetails(bookDetails));
        }
        clearData();
    };
    const handleClose = () => {
        props.handleClose();
        clearData();
    };
    return (
        <Dialog
            open={props.open}
            onClose={() => props.handleClose}
            aria-labelledby='form-dialog-title'
            maxWidth="lg"
        >
            <DialogTitle id='form-dialog-title'>Book Details</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter Book details and quantities you have to sell
                </DialogContentText>

                <TextField
                    autoFocus
                    margin='dense'
                    id='name'
                    label='Book Name'
                    type='text'
                    fullWidth
                    value={bookDetails.bookName}
                    onChange={(e) => setBookDetails({ ...bookDetails, bookName: e.target.value })}
                />

                <TextField
                    margin='dense'
                    id='author'
                    label='Author'
                    type='text'
                    fullWidth
                    value={bookDetails.author}
                    onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })}
                />

                <TextField
                    margin='dense'
                    id='publication'
                    label='Publication'
                    type='text'
                    fullWidth
                    value={bookDetails.publication}
                    onChange={(e) => setBookDetails({ ...bookDetails, publication: e.target.value })}
                />

                <TextField
                    margin='dense'
                    id='price'
                    label='Price'
                    type='Number'
                    fullWidth
                    value={bookDetails.price}
                    onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })}
                />
                <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                <Select
                    labelId="status"
                    id="status"
                    value={bookDetails.status ? bookDetails.status : ""}
                    fullWidth
                    onChange={(e) => setBookDetails({ ...bookDetails, status: e.target.value })}
                >
                    <MenuItem value="New">New</MenuItem>
                    <MenuItem value="Old">Old</MenuItem>

                </Select>
                <div className={classes.file}>
                    <FileBase
                        type='file'
                        multiple={false}
                        onDone={({ base64 }) =>
                            setBookDetails({ ...bookDetails, selectedImage: base64 })
                        }
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" key="Close" onClick={() => handleClose()}>Close</Button>
                <Button color="primary" onClick={handleSubmit}>{props.currentId === 0 ? "Add" : "Edit"} Book Details</Button>
            </DialogActions>
        </Dialog>
    )
}
function validateInfo(bookForm) {
    return !bookForm.bookName ||
        !bookForm.author ||
        !bookForm.publication ||
        !bookForm.price ||
        !bookForm.publication ||
        !bookForm.status ||
        !bookForm.selectedImage
}

export default BookForm
	