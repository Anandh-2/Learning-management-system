const express=require("express");
const router=express.Router();
const multer = require("multer");
const upload=multer({dest:"uploads/"});
const {ytOauth, ytOauthCallback, uploadVid} = require("../controllers/youtubeController");
const {auth, isInstructor, isAdmin}=require("../middlewares/Auth");

router.get("/upload/auth",ytOauth);
router.get("/upload/auth/callback",ytOauthCallback);

router.post("/upload",upload.single("video"),uploadVid);

module.exports=router;