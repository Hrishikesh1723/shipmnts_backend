import express from "express";
import jwt from "jsonwebtoken"
const router = express.Router();
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs"
import Student from "../models/studentModel.js";

router.post("/addstudent", async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(422).json({ error: "Please enter full detail!" });
    }
  
    try {
      const student = new Student({ name, email, password });
  
      await student.save();
  
      res.status(201).json({ message: "Student added" });
    } catch (err) {
      console.log(err);
    }
    return
});

export default router;
 