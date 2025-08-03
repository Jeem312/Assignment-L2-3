import { z } from "zod";

export const createBorrowValidationSchema = z.object({
  body: z.object({
    book: z.string().min(1, "Book ID is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    dueDate: z.string().refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime()) && parsedDate > new Date();
    }, {
      message: "Due date must be a valid future date"
    }),
  }),
});
