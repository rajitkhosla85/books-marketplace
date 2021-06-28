import mongoose from "mongoose"

const bookSchema = mongoose.Schema({
    bookName: String,
    publication: String,
    price: Number,
    availability: String,
    author: String,
    status:String,
    selectedImage: String,
    createdAt: {
        type: Date,
        default: new Date()
    }

})

const Book = mongoose.model('Book', bookSchema)
export default Book;
