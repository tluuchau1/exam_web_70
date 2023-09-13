import express from "express";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  res.json({
    message: "Test api [GET] /api/v1/user",
  });
});

//get All

userRouter.get("/all", async (req, res) => {
  try {
    const result = await userModel.find();

    return res.json({
      data: result,
    });
  } catch (error) {
    res.status(500).json("error");
  }
});

//create user
userRouter.post("/create", async (req, res) => {
  const { username, password } = req.body;

  const newUser = new userModel({
    username,
    password,
  });

  await newUser.save();

  res.status(201).json({
    message: "Đã tạo user thành công",
  });
});

//login user
userRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await userModel.findOne({ username });

    if (!existingUser) {
      return res.status(401).json({
        message: "không đúng user",
      });
    }

    const matchPassword = await userModel.findOne({ password });

    if (!matchPassword) {
      return res.status(401).json({
        message: "không đúng password",
      });
    }

    const jwtPayload = {
      username: existingUser.username,
      password: existingUser.password,
    };

    const token = jwt.sign(jwtPayload, process.env.SECRET_KEY || "Mind_Web_70", {
      expiresIn: "1h",
    });

    res.json({
      accessToken: token,
      message: "đăng nhập thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default userRouter;
