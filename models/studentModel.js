import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

//Defining admin datatypes
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  classrooms: [
    {
        classId: {
            type: String,
            require: true,
        },
        classname: {
            type: String,
            require: true,
        }
    }
  ],
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
});

// securing password
studentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// generating Auth token
studentSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

studentSchema.methods.addClassroom = async function (classId, classname) {
    try {
      this.classrooms = this.classrooms.concat({
        classId,
        classname,
      });
      await this.save();
      return this.classrooms;
    } catch (err) {
      console.log(err);
    }
  };

const Student = mongoose.model("Student", studentSchema);

export default Student;