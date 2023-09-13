import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  sku: {
    type: String,
  },
  description: {
    type: String,
  },
  instock: {
    type: Number,
  },
});

const inventoryModel = mongoose.model("inventory", inventorySchema);

export default inventoryModel;
