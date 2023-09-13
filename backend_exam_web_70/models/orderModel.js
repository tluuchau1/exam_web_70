import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  item: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;
