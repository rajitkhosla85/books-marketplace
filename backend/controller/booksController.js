import asyncHandler from "express-async-handler"
import mongoose from "mongoose"
import Book from "../model/booksModel.js"


export const addBookDetails = asyncHandler(async (req, res) => {
    const { bookName, author, publication, price, status, selectedImage } = req.body
    const availability = "Available";
    const newBook = new Book({
        bookName, author, publication, price, status, selectedImage, availability
    })
    try {
        await newBook.save();
        res.status(201).json(newBook)
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message })
    }

})

export const fetchBookDetails = asyncHandler(async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books)
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message })
    }


})


export const deleteBook = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status("400").send("Incorrect Id")
    }
    try {
        await Book.findByIdAndRemove(id);
        res.json({ message: "Book Deleted Sucessfully" })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message })
    }

})

export const editBook = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status("400").send("Incorrect Id");
    }

    try {
        const existBook = await Book.findById(id);
        if (!existBook) {
            return res.status("400").send("Book with the given not present")
        }
        const { bookName, author, publication, price, status, selectedImage } = req.body;
        existBook.bookName = bookName || existBook.bookName;
        existBook.author = author || existBook.author;
        existBook.publication = publication || existBook.publication;
        existBook.price = price || existBook.price;
        existBook.status = status || existBook.status;
        existBook.selectedImage = selectedImage || existBook.selectedImage;
        await existBook.save();
        res.json(existBook)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message })

    }

})

export const multiDeleteBook = asyncHandler(async (req, res) => {
    if (req.body.length > 0) {
        try {
            await Book.deleteMany({
                _id: {
                    $in: req.body,
                },
            });
            res.json({ message: "Books Deleted Sucessfully" })
        } catch (error) {
            res.status(409).json({ message: error.message })
        }

    } else {
        res.status(400).json({ message: "No Ids found" })
    }
})

export const buyBook = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status("400").send("Incorrect Id")
    }

    try {
        const existBook = await Book.findById(id);
        if (!existBook) {
            return res.status("400").send("Book with the given not present")
        }
        existBook.availability = "Sold";
        await existBook.save();
        res.json(existBook)
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message })

    }

})