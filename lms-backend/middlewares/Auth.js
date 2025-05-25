const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.auth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "Access Denied" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Invalid token", token);
      console.log(err);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// exports.isAdmin = (req, res, next)=>{
//     if(req.user.role!="admin"){
//         return res.status(403).json({message:"Access denied"});
//     }
//     next();
// };

// exports.isHOD = (req, res, next) => {
//     if(req.user.role!="HOD"&&req.user.role!="admin"){
//         return res.status(403).json({message:"Access denied"});
//     }
//     next();
// }

// exports.isInstructor = (req, res, next)=>{
//     if(req.user.role!="instructor"&&req.user.role!="HOD"&&req.user.role!="admin"){
//         return res.status(403).json({message:"Access denied"});
//     }
//     next();
// };

exports.roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
