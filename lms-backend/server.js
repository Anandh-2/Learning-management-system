const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const ytRoutes = require('./routes/ytRoutes');
const courseRoutes = require('./routes/courseRoutes')
const departmentRoutes = require('./routes/departmentRoutes');
const batchRoutes = require('./routes/batchRoutes');
const userRoutes = require('./routes/userRoutes');
const academicyearRoutes = require('./routes/academicyearRoutes');
const semesterRoutes = require('./routes/semesterRoutes');
const {auth} = require('./middlewares/Auth');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/',authRoutes);
app.use('/',userRoutes);
app.use('/',ytRoutes);
app.use('/',courseRoutes);
app.use('/',departmentRoutes);
app.use('/',batchRoutes);
app.use('/',academicyearRoutes);
app.use('/',semesterRoutes);

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('MongoDB connected');
}).catch((err)=>{
    console.error('MongoDB connection error:',err);
});


app.get('/',auth,(req, res)=>{
    res.send(req.user);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`Server running on port ${PORT}`);
});