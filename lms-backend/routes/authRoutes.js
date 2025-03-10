const express = require("express");
const router = express.Router();
const { register, login, request } = require("../controllers/authController");
const { auth, isAdmin, isHOD } = require("../middlewares/Auth");
const { getRequests, approve } = require("../controllers/studentApproval");

router.post("/register", request);
router.post("/login", login);
router.post("/create-hod", auth, isAdmin, register);
router.post("/create-instructor", auth, isHOD, register);
router.get("/requests", auth, isHOD, getRequests);
router.post("/approve", auth, isHOD, approve);

module.exports = router;
