import { Router } from "express";
import { BookController } from "./book.controller";
import { validateRequest } from "../../../middleWares/validationRequest";
import { createBookValidationSchema, updateBookValidationSchema, getBookQueryValidationSchema } from "./book.validation";

const router = Router();

router.post(
    "/", 
    validateRequest(createBookValidationSchema),
    BookController.createBook
)


router.get(
  '/',
  validateRequest(getBookQueryValidationSchema), 
  BookController.getAllBooks
);


router.get( 
  '/:bookId',
  BookController.getBookById
);

router.put(
  '/:bookId',
  validateRequest(updateBookValidationSchema),
  BookController.updateBook
);

router.delete(
  '/:bookId',
  BookController.deleteBook
);

export const BookRoutes = router;