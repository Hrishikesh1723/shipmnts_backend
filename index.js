import * as dotenv from "dotenv";
dotenv.config();
import express from "express"
import mongoose from "mongoose"

import teacherRoute from "./routes/techer.js"
import studentRoute from "./routes/student.js"



const app = express()

app.use(express.json())
app.use("/teacher", teacherRoute)
app.use("/student", studentRoute)

app.post("/", (req,res) => {
    console.log(req);
    res.json({msg: "data received"})
})

const port = process.env.PORT || 5000; 

try { 
  await mongoose.connect(process.env.MONGO_URL);

  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}