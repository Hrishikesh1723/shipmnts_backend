const mongoose = require("mongoose");

const classroomSchema = new mongoose.Schema({
    className: {
        type: String,
        require: true,
    },
    teacherId: {
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

const Classroom = mongoose.model("Classroom", classroomSchemaSchema);

module.exports = Classroom;