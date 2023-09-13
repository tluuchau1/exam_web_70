import express from "express";
import inventoryModel from "../models/inventoryModel.js";

const inventoryRouter = express.Router();

inventoryRouter.get("/", async (req, res) => {
  res.json({
    message: "Test api [GET] /api/v1/inventory",
  });
});
//Get all
inventoryRouter.get("/all", async (req, res) => {
  try {
    const result = await inventoryModel.find();

    return res.json({
      data: result,
    });
  } catch (error) {
    res.status(500).json("error");
  }
});

//get all < 100

inventoryRouter.get("/all_100", async (req, res) => {
  try {
    const resultUnder100 = await inventoryModel.find({ instock: { $lt: 100 } });

    return res.json({
      data: resultUnder100,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//create inventory
inventoryRouter.post("/create", async (req, res) => {
  const { sku, description, instock } = req.body;

  const newInventory = new inventoryModel({
    sku,
    description,
    instock,
  });

  await newInventory.save();

  res.status(201).json({
    message: "Đã tạo inventory thành công",
  });
});

export default inventoryRouter;
