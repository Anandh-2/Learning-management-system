const express = require("express");
const router = express.Router();
const { register, login, request, getRequests, approve, reject } = require("../controllers/authController");
const { auth, isAdmin, isHOD, roleMiddleware } = require("../middlewares/Auth");

router.post("/register", request);
router.post("/login", login);
router.post("/create-hod", auth, roleMiddleware("admin"), register);
router.post("/create-instructor", auth, roleMiddleware("hod","admin"), register);
router.get("/requests", auth, roleMiddleware("hod", "admin"), getRequests);
router.patch("/approve/:userId", auth, roleMiddleware("hod", "admin"), approve);
router.patch("/reject/:userId", auth, roleMiddleware("hod", "admin"), reject);

module.exports = router;
