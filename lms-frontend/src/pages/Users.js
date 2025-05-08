// import React, { useState } from "react";
// import "../styles/Users.css"; 

// const allUsers = [
  
//   { id: 1, name: "Alice Smith", email: "alice@school.edu", department: "ece", role: "Teacher", batch: "2024" },
//   { id: 2, name: "Bob Johnson", email: "bob@school.edu", department: "ece", role: "Student", batch: "2024" },
// ];

// export default function Users() {
//   const [filters, setFilters] = useState({ role: "", department: "", batch: "" });

//   const handleChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   const filteredUsers = allUsers.filter(user =>
//     (filters.role === "" || user.role === filters.role) &&
//     (filters.department === "" || user.department === filters.department) &&
//     (filters.batch === "" || user.batch === filters.batch)
//   );

//   return (
//     <div className="user-table-container">
//       <h1 className="table-title">User List</h1>

//       <div className="filters">
//         <select name="role" value={filters.role} onChange={handleChange}>
//           <option value="">All Roles</option>
//           <option value="Teacher">Teacher</option>
//           <option value="Student">Student</option>
//           <option value="HOD">HOD</option>
//         </select>

//         <select name="department" value={filters.department} onChange={handleChange}>
//           <option value="">All Departments</option>
//           <option value="ece">ECE</option>
//           <option value="cse">CSE</option>
//           <option value="mech">MECH</option>
//         </select>

//         <select name="batch" value={filters.batch} onChange={handleChange}>
//           <option value="">All Batches</option>
//           <option value="2022">2022</option>
//           <option value="2023">2023</option>
//           <option value="2024">2024</option>
//         </select>
//       </div>

//       <div className="table-wrapper">
//         <table className="user-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Department</th>
//               <th>Email</th>
//               <th>Batch</th>
//               <th>Role</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.length > 0 ? (
//               filteredUsers.map((user) => (
//                 <tr key={user.id}>
//                   <td>{user.name}</td>
//                   <td>{user.department}</td>
//                   <td>{user.email}</td>
//                   <td>{user.batch}</td>
//                   <td>{user.role}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="no-users">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import "../styles/Users.css"; 
const allCourses = [
  // Sample data — you can replace or fetch from backend
  { id: 1, name: "Digital Circuits", code: "EC101", department: "ece", semester: "3",  },
  { id: 2, name: "Operating Systems", code: "CS204", department: "cse", semester: "4",  },
  { id: 3, name: "Robotics", code: "ME305", department: "mech", semester: "5",  },
];

export default function Courses() {
  const [filters, setFilters] = useState({ department: "", semester: "", type: "" });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredCourses = allCourses.filter(course =>
    (filters.department === "" || course.department === filters.department) &&
    (filters.semester === "" || course.semester === filters.semester) &&
    (filters.type === "" || course.type === filters.type)
  );

  return (
    <div className="course-table-container">
      <h1 className="table-title">Course List</h1>

      <div className="filters">
        <select name="department" value={filters.department} onChange={handleChange}>
          <option value="">All Departments</option>
          <option value="ece">ECE</option>
          <option value="cse">CSE</option>
          <option value="mech">MECH</option>
        </select>

        <select name="semester" value={filters.semester} onChange={handleChange}>
          <option value="">All Semesters</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>

      </div>

      <div className="table-wrapper">
        <table className="course-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Code</th>
              <th>Department</th>
              <th>Semester</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.name}</td>
                  <td>{course.code}</td>
                  <td>{course.department}</td>
                  <td>{course.semester}</td>
                  <td>{course.type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-courses">No courses found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
