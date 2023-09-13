import express from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const orderRouter = express.Router();

orderRouter.get("/", async (req, res) => {
  res.json({
    message: "Test api [GET] /api/v1/order",
  });
});

//get all
orderRouter.get("/all", async (req, res) => {
  try {
    const result = await orderModel.find();

    return res.json({
      data: result,
    });
  } catch (error) {
    res.status(500).json("error");
  }
});

//create order
orderRouter.post("/create", async (req, res) => {
  const { item, price, quantity } = req.body;

  const userId = req.user.id;
  console.log("🚀 ~ file: order.js:31 ~ orderRouter.post ~ userId:", userId);

  const currentUser = await userModel.findById(userId);

  if (!currentUser) {
    res.status(400).json({
      message: "Không tìm thấy người dùng",
    });
  }

  const newOrder = new orderModel({
    item,
    price,
    quantity,
    user: userId,
  });

  await newOrder.save();

  res.status(201).json({
    message: "Đã tạo order thành công",
  });
});

export default orderRouter;
