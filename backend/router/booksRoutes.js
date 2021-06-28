import express from "express"
import { addBookDetails, fetchBookDetails, deleteBook, multiDeleteBook, editBook, buyBook } from "../controller/booksController.js"
import { protect } from "../middleware/userMiddleware.js"
const router = express.Router()

router.route("/").post(protect,addBookDetails).get(protect,fetchBookDetails);
router.route('/:id').delete(protect,deleteBook).put(protect,editBook);
router.route('/buy/:id').put(protect,buyBook);
router.route("/delete").post(protect,multiDeleteBook);



export default router;
