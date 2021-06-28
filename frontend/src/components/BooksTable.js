import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import ShopOutlinedIcon from '@material-ui/icons/ShopOutlined';
import DeleteIcon from "@material-ui/icons/Delete";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import { deleteBook, multiDeleteBooks, buyBook } from '../actions/bookActions';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    card: {
        margin: '10px',
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',
        fontSize: '1.96rem',
    },
}));

const BooksTable = (props) => {
    const classes = useStyles();
    const books = useSelector(state => state.books);
    
    const dispatch = useDispatch();

    const delBook = (id) => {
        dispatch(deleteBook(id))
    }

    const buyBookInfo = (id) => {
        dispatch(buyBook(id))
    }

    const multiBooksDelete = (ids) => {
        dispatch(multiDeleteBooks(ids));
    }
    return (
        <div style={{ textAlign: "right" }}>
            <Button variant="contained"
                color="primary"
                size="large" className={classes.button}
                startIcon={<AddIcon />}
                onClick={() => props.handleOpen()}>
                Add Book Details
            </Button>

            <Card>
                < MaterialTable
                    title="Book Details" columns={[
                        {
                            title: 'Image',
                            field: 'selectedImage',
                            render: (rowData) => (rowData.selectedImage ? (
                                <img
                                    alt='Userimage'
                                    style={{ height: 36, borderRadius: '50%' }}
                                    src={rowData.selectedImage}
                                />) : ""
                            ),
                        },
                        {
                            title: "Name",
                            field: "bookName"
                        },
                        {
                            title: "Author",
                            field: "author"
                        },
                        {
                            title: "Publication",
                            field: "publication"
                        },
                        {
                            title: "Price",
                            field: "price"
                        },
                        {
                            title: "Status",
                            field: "status"
                        },
                        {
                            title: "Availability",
                            field: "availability"
                        },
                        {
                            title: "Edit/Delete",
                            field: "edit",
                            render: (rowData) => rowData && (
                                <>
                                    <Tooltip title="Edit Book" aria-label="Edit Book">
                                    <IconButton color="primary" onClick={() => {
                                        props.setCurrentId(rowData._id);
                                        props.handleOpen();
                                    }}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Delete Book" aria-label="Delete Book">
                                    <IconButton color="secondary" onClick={() => { delBook(rowData._id) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Buy Book" aria-label="Buy Book">
                                    <IconButton color="secondary" onClick={() => { buyBookInfo(rowData._id) }}>
                                        <ShopOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                                </>
                            ),
                        },
                    ]}
                    data={books}
                    actions={[
                    {
                        tooltip: "Remove All Selected Books",
                        icon: "delete",
                        onClick: (evt, data) => multiBooksDelete(data.map((book) => book._id))
                    }
                ]}
                    options={{
                    actionsColumnIndex: -1,
                    exportButton: true,
                    selection: true
                }}


                />
            </Card>
        </div>

    )
}

export default BooksTable
