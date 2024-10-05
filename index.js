const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3500

app.use("/", (req, res)=>{
    res.send('Hello from the server side')
})

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
    
})