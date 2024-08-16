import express from "express";
import jwt from "jsonwebtoken"
const router = express.Router();
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs"
import Teacher from "../models/teacherModel.js";
import Classroom from "../models/classroomModel.js";

router.post("/addteacher", async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(422).json({ error: "Please enter full detail!" });
    }
  
    try {
      const teacher = new Teacher({ name, email, password });
  
      await teacher.save();
  
      res.status(201).json({ message: "teacher added" });
    } catch (err) {
      console.log(err);
    }
    return
});

router.post("/:teacherid/classrooms", async (req, res) => {
    const {classroomName} = req.body;
    const teacherid = req.params.teacherid
    if(!classroomName){
        return res.status(422).json({ error: "Please enter full detail!" });
    }
    try{
        const classroom = new Classroom({ classroomName, teacherid})
        await classroom.save()
        res.status(201).json({ "classroomId": classroom._id, "classroomName": classroom.classroomName})
    }
    catch (err) {
        console.log(err);
    }
    return
})

export default router;
 