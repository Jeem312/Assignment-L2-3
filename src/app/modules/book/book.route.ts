
import { Router } from "express";
import { BookController } from "./book.controller";



const router = Router();

router.post(
    "/createBook",
    BookController.createBook
)


export const BookRoutes = router;
