const jwt = require("jsonwebtoken")
const employeeModel = require("../models/employee")


//GET EMPLOYEE DETAILS
const getEmployeeData = async (req, res) => {
  try {
    const employees = await employeeModel.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//ADD EMPLOYEE 
const addEmployee = async (req, res) => {
  try {
    const { name, email, phone, designation, salary } = req.body;

    if (!name.trim()) {
      return res.status(400).json({ error: "Name cannot be blank!" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address!" });
    }

    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number. Must be a 10-15 digit number." });
    }

    if (isNaN(salary) || salary < 0) {
      return res.status(400).json({ error: "Invalid salary" });
    }

    const employee = new employeeModel({
      name,
      email,
      phone,
      designation,
      salary,
    });

    await employee.save();

    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//UPDATE EMPLOYEE
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, designation, salary } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Name cannot be blank" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    if (isNaN(salary) || salary < 0) {
      return res.status(400).json({ error: "Invalid salary" });
    }

    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        designation,
        salary,
      },
      { new: true } 
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee updated successfully", updatedEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//SINGLE EMPLOYEE
const getSingleEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await employeeModel.findById(id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//DELTE EMPLOYEE
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await employeeModel.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully", deletedEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//SEARCH EMPLOYEE
const searchEmployee = async(req,res)=>{
  try {
    const { name } = req.query;

    const employees = await employeeModel.find({ name: { $regex: new RegExp(name, 'i') } });
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { getEmployeeData, addEmployee, updateEmployee, getSingleEmployee,deleteEmployee,searchEmployee }