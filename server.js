const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const adminRoutes = require('./src/apis/admin/v1')
const app = express();
app.use(express.json());

app.use("/admin/v1",adminRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})