
const express = require("express")
const authMiddleware = require('../middleware/Authentication')
const { getEmployeeData, addEmployee, updateEmployee, getSingleEmployee, deleteEmployee, searchEmployee } = require("../controller/employeeController")

const router = express.Router()


router.get('/employees', authMiddleware ,getEmployeeData)
router.post('/add/employees', authMiddleware ,addEmployee)
router.put('/update/employees/:id', authMiddleware, updateEmployee);
router.get('/single/employees/:id',authMiddleware, getSingleEmployee)
router.delete("/delete/employees/:id", authMiddleware, deleteEmployee);
router.get("/search/employees", authMiddleware, searchEmployee)


module.exports= router
