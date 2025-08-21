const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const adminRoutes = require('./src/apis/admin/v1')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true

})
)

app.use("/admin/v1",adminRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})