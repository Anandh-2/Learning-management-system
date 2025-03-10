const express = require("express");
const mongoose = require("mongoose");
const dotenv=require('dotenv');
dotenv.config();

const User = require("../models/User");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const deleteAllUsers = async () => {
    try{
        const result = await User.deleteMany({});
        console.log(`${result.deletedCount} users deleted.`);
    } catch(err){
        console.error("Error deleting users:",err);
    }
};

deleteAllUsers();
