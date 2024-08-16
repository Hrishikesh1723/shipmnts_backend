
import mongoose from "mongoose";

const classroomSchema = new mongoose.Schema({
    classroomName: {
        type: String,
        require: true,
    },
    teacherid: {
        type: String,
        require: true,
    },
    students: [
        {
            StudentId: {     
                type: String,
                require: true,
            }
        }
    ],
    tasks: [
        {
            title: {
                type: String,
                require: true,
            },
            description: {
                type: String,
                require: true,
            },
            duedate: {
                type: Date,
                require: true,
            }
        }
    ]
})

classroomSchema.methods.addStudent = async function(StudentId){
    try{
        this.students = this.students.concat({
            StudentId
        })
        await this.save();
        return this.students;
    } catch (error) {
        console.log(error);
    }
}

const Classroom = mongoose.model("Classroom", classroomSchema);

export default Classroom;