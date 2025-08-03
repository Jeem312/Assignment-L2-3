import { z } from "zod";

// Enum values (array-based)
const genreEnum = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'] as const;


export const createBookValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    genre: z.enum([...genreEnum]),
    isbn: z.string().min(1, "ISBN is required"),
    description: z.string().optional(),
    copies: z.number().min(0, "Copies must be a positive number"),
    available: z.boolean().optional().default(true),
  }),
});



export const updateBookValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title cannot be empty").optional(),
    author: z.string().min(1, "Author cannot be empty").optional(),
    genre: z.enum([...genreEnum]).optional(),
    isbn: z.string().min(1, "ISBN cannot be empty").optional(),
    description: z.string().optional(),
    copies: z.number().min(0, "Copies must be a positive number").optional(),
    available: z.boolean().optional(),
  }),
});


export const getBookQueryValidationSchema = z.object({
  query: z.object({
    filter: z.enum([...genreEnum]).optional(),
    sortBy: z.string().optional().default("createdAt"),
    sort: z.enum(["asc", "desc"]).optional().default("desc"),
    limit: z.string().optional().default("10"),
  }),
});
