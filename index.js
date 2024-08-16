import * as dotenv from "dotenv";
dotenv.config();
import express from "express"
import mongoose from "mongoose"



const app = express()

app.use(express.json())

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