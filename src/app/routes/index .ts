import { Router } from "express"
import { BorrowRoutes } from "../modules/borrow/borrow.route"
import { BookRoutes } from "../modules/book/book.route"


export const router = Router()

const moduleRoutes = [
    {
        path: "/book",
        route: BookRoutes
    },
     {
        path: "/borrow",
        route: BorrowRoutes

    },
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

// router.use("/user", UserRoutes)
// router.use("/tour", TourRoutes)
// router.use("/division", DivisionRoutes)
// router.use("/booking", BookingRoutes)
// router.use("/user", UserRoutes)