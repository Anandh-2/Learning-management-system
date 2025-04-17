const express = require("express");
const mongoose = require("mongoose");
const dotenv=require('dotenv');
dotenv.config();

const User = require("../models/User");
const Enrollment=require("../models/Enrollment");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    getEnrolledCourses();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
const user={id:"7276BEC060"};
const getEnrolledCourses=async()=>{
    try{
        const enrollment = await Enrollment.find({studentId:user.id}).populate("courseId");
        console.log(enrollment);
    }catch(err){
        console.log("Server error",err);
    }
}

