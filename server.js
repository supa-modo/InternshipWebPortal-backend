const express=require('express');
const app = express();
const cors = require('cors');
const {connectDB} = require('./config/dbConnect.js');

const bodyParser = require('body-parser');
require('dotenv').config();
const PORT_URL = process.env.PORT || 5000

connectDB();

app.use("/", (req,res) =>{
    res.send("Hello from the backend!");
})

app.listen(PORT_URL, ()=>{
console.log(`Server is running on PORT ${PORT_URL}`)
});