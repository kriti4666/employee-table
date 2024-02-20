const mongoose = require("mongoose")


const EmployeeSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: String,
    designation: String,
    salary: Number
})




module.exports = mongoose.model('Employee', EmployeeSchema);
