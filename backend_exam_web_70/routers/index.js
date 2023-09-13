import express from "express";
import { authMiddleware } from "../middlewares/authmdw.js";
import inventoryRouter from "./inventory.js";
import orderRouter from "./order.js";
import userRouter from "./user.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/order", authMiddleware, orderRouter);
router.use("/inventory", authMiddleware, inventoryRouter);

export default router;
