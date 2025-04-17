const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const ytRoutes = require('./routes/ytRoutes');
const courseRoutes = require('./routes/courseRoutes')
const {auth} = require('./middlewares/Auth')
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/',authRoutes);
app.use('/',ytRoutes);
app.use('/',courseRoutes);


mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('MongoDB connected');
}).catch((err)=>{
    console.error('MongoDB connection error:',err);
});


app.get('/',auth,(req, res)=>{
    res.send(req.user);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});