import express from "express";
import jwt from "jsonwebtoken"
const router = express.Router();
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs"
import Teacher from "../models/teacherModel.js";
import Classroom from "../models/classroomModel.js";
import Student from "../models/studentModel.js";

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

router.post("/:teacherId/classrooms", async (req, res) => {
    const {classroomName} = req.body;
    const teacherid = req.params.teacherId
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
router.post("/classrooms/:classroomId/students", async (req, res) => {
    const { studentId } = req.body;
    const classroomId = req.params.classroomId;
    if (!studentId) {
        return res.status(422).json({ error: "Please enter full detail!" });
    }

    try {
        const classroom = await Classroom.findOne({ _id: classroomId });
        if (!classroom) {
            return res.status(404).json({ error: "Classroom not found" });
        }
        await classroom.addStudent(studentId);
        const student = await Student.findOne({ _id: studentId });
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        await student.addClassroom(classroomId, classroom.classroomName);
        res.status(200).json({ message: "Student added successfully." });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/classrooms/:classroomId/students", async (req, res) => {
    const { studentId } = req.body;
    const classroomId = req.params.classroomId;
    try {
        const classroom = await Classroom.findById(classroomId);
        if (!classroom) {
            return res.status(404).json({ error: "Classroom not found" });
        }
        classroom.students = classroom.students.filter(
            (studentObj) => studentObj.StudentId !== studentId
        );
        await classroom.save();
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        student.classrooms = student.classrooms.filter(
            (classroomObj) => classroomObj.classId !== classroomId
        );
        await student.save();
        res.status(200).json({ message: "Student removed from classroom and classroom removed from student." });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/classrooms/:classroomId/tasks", async (req, res) => {
    const {title, description, dueDate} = req.body;
    const classroomid = req.params.classroomId
    if(!classroomid || !title || !description || !dueDate){
        return res.status(422).json({ error: "Please enter full detail!" });
    }
    try {
        const classroom = await Classroom.findById(classroomid);
        if (!classroom) {
            return res.status(404).json({ error: "Classroom not found" });
        }
        const tasks = await classroom.addTasks(title, description, dueDate);

        const task = tasks[tasks.length-1]
        console.log(task);
        
        res.status(200).json({taskId: task._id, description: task.description, dueDate: task.dueDate})
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
    return
})

router.get("/:teacherId/classrooms", async (req, res) => {
    const teacherid = req.params.teacherId
    try{
        const classrooms = await Classroom.findOne({ teacherid})
        res.status(201).json(classrooms)
    }
    catch (err) {
        console.log(err);
    }
    return
})


export default router;
 