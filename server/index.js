const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const connection = require('./config/db')
const employeeRoutes = require("./routes/employee")
const authRoutes = require("./routes/auth")


const app = express()
app.use(express.json())
app.use(cors())

app.use('/user', authRoutes)
app.use('/api', employeeRoutes)

app.get("/", (req,res)=>{
    res.send("Hiii Welcome to Employee Management")
})



app.listen(process.env.PORT || 8000, async(req,res)=>{
    try {
        await connection
        console.log("Connection Successfull to DB")
    } catch (error) {
        console.log("Connection to DB failed")
        console.log(error)
        
    }
    console.log(`listening on port ${process.env.PORT}`)
})