
import { Router } from "express";
import { BookController } from "./book.controller";
import { validateRequest } from "../../../middleWares/validationRequest";
import { createBookValidationSchema, updateBookValidationSchema } from "./book.validation";



const router = Router();

router.post(
    "/createBook", validateRequest(createBookValidationSchema),
    BookController.createBook
)

router.get(
  '/',
 
  BookController.getAllBooks
);

// Get book by ID
router.get( '/:bookId',
  BookController.getBookById
);

// Update book
router.patch(
  '/:bookId',
 
  BookController.updateBook
);

// Delete book
router.delete(
  '/:bookId',
  BookController.deleteBook
);


export const BookRoutes = router;
