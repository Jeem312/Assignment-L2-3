"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookQueryValidationSchema = exports.updateBookValidationSchema = exports.createBookValidationSchema = void 0;
const zod_1 = require("zod");
// Enum values (array-based)
const genreEnum = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'];
exports.createBookValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Title is required"),
        author: zod_1.z.string().min(1, "Author is required"),
        genre: zod_1.z.enum([...genreEnum]),
        isbn: zod_1.z.string().min(1, "ISBN is required"),
        description: zod_1.z.string().optional(),
        copies: zod_1.z.number().min(0, "Copies must be a positive number"),
        available: zod_1.z.boolean().optional().default(true),
    }),
});
exports.updateBookValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Title cannot be empty").optional(),
        author: zod_1.z.string().min(1, "Author cannot be empty").optional(),
        genre: zod_1.z.enum([...genreEnum]).optional(),
        isbn: zod_1.z.string().min(1, "ISBN cannot be empty").optional(),
        description: zod_1.z.string().optional(),
        copies: zod_1.z.number().min(0, "Copies must be a positive number").optional(),
        available: zod_1.z.boolean().optional(),
    }),
});
exports.getBookQueryValidationSchema = zod_1.z.object({
    query: zod_1.z.object({
        filter: zod_1.z.enum([...genreEnum]).optional(),
        sortBy: zod_1.z.string().optional().default("createdAt"),
        sort: zod_1.z.enum(["asc", "desc"]).optional().default("desc"),
        limit: zod_1.z.string().optional().default("10"),
    }),
});
