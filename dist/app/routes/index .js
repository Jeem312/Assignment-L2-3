"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const borrow_route_1 = require("../modules/borrow/borrow.route");
const book_route_1 = require("../modules/book/book.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/books",
        route: book_route_1.BookRoutes
    },
    {
        path: "/borrow",
        route: borrow_route_1.BorrowRoutes
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
