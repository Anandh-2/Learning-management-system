import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

api.interceptors.request.use(
  (request) => {
    let token = localStorage.getItem("userToken");

    if (token?.startsWith('"') && token?.endsWith('"')) {
      token = token.slice(1, -1); 
    }

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (err) => {
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response.status === 401) {
      console.log("Unauthorized");
      localStorage.removeItem("userToken");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export const registerUser = async (body) => {
  try {
    const response = await api.post("/register", body);
    return response.data.user;
  } catch (err) {
    if (err?.response.status === 409) {
      alert("User already exists");
    }
    console.log("Error in register api");
  }
};

export const loginUser = async (body) => {
  try {
    return await api.post("/login", body);
  } catch (err) {
    console.log("Error in login api");
  }
};

export const approveUser = async (userId) => {
  try {
    const response = await api.patch(`/approve/${userId}`);
    return response.data;
  } catch (err) {
    
    console.log("Error in approve api");
    throw err;
  }
};

export const rejectUser = async (userId) => {
  try {
    const response = await api.patch(`/reject/${userId}`);
    return response.data;
  } catch (err) {
    console.log("Error in reject api");
    throw err;
  }
}

export const blockUser = async (userId) => {
  try {
    const response = await api.patch(`/users/block/${userId}`);
    return response.data;
  } catch (err) {
    console.log("Error in block api");
    throw err;
  }
}

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (err) {
    console.log("Error in delete api");
    throw err;
  }
};

export const getEnrolledCourses = async (status) => {
  try {
    const response = await api.get(`/courses/enrolled-courses?status=${status}`);
    return response.data.courses;
  } catch (err) {
    console.log("Error in course api");
    return [];
  }
};

export const getCreatedCourses = async (status) => {
  try {
    const response = await api.get(`/courses/created-courses?status=${status}`);
    return response.data.courses;
  } catch (err) {
    console.log("Error in course api");
    return [];
  }
};

export const getEnrolledStudents = async(courseId)=>{
  try{
    const response = await api.get(`/courses/${courseId}/students`);
    return response.data.enrollments;
  }catch(err){
    console.log("Error in course api");
    return [];
  }
}

export const syncCourses = async()=>{
  try{
    const response = await api.post('courses/sync-courses');
    return response.data;
  }catch(err){
    console.log("Error in course api");
  }
} 

export const syncStudents = async(courseId)=>{
  try{
    const response = await api.post(`courses/${courseId}/sync-students`);
    return response.data;
  }catch(err){
    console.log("Error in course api");
  }
}

export const getCourseById = async(courseId)=>{
  try{
    const response = await api.get(`/courses/${courseId}`);
    return response.data.course;
  }catch(err){
    console.log("Error in course api");
    throw err;
  }
}

export const getContentById = async(contentId)=>{
  try{
    const response = await api.get(`/contents/${contentId}`);
    return response.data.content;
  }catch(err){
    console.log('Error in content api');
  }
}

export const saveVideoContent = async(contentId,body)=>{
  try{
    const response = await api.put(`/contents/${contentId}`,body);
    return response.data.content;
  }catch(err){
    console.log('Error in content api');
  }
}

export const reorderCourse = async(courseId,body)=>{
  try{
    console.log(body);
    const response = await api.patch(`/courses/${courseId}/reorder`,body);
    return response.data;
  }catch(err){
    console.log('Error in course api');
  }
}

export const createCourse = async (body) => {
  try {
    const response = await api.post("/courses", body);
    return response.data.course;
  } catch (err) {
    console.log("Error in course api");
  }
};

export const deleteCourse = async(courseId)=>{
  try{
    const response = await api.delete(`/courses/${courseId}`);
    return response.data;
  }catch(err){
    console.log('Error in course api');
    throw err;
  }
}

// export const getModules = async (body) => {
//   try {
//     const response = await api.get("/modules", body);
//     return response.data.modules;
//   } catch (err) {
//     console.log("Error in modules api");
//     return [];
//   }
// };

export const createModule = async(courseId, body)=>{
  try{
    const response = await api.post(`/courses/${courseId}/modules`,body);
    return response.data.module;
  }catch(err){
    console.log("Error in module api");
  }
}

export const deleteModule = async(courseId, moduleId)=>{
  try{
    const response = await api.delete(`/courses/${courseId}/modules/${moduleId}`);
    return response.data; 
  }catch(err){
    console.log('Error in content api');
    throw err;
  }
}

export const createContent = async(courseId, moduleId, body)=>{
  try{
    const response = await api.post(`/modules/${moduleId}/contents`,body);
    return response.data.content;
  }catch(err){
    console.log("Error in content api");
    throw err;
  }
}

export const deleteContent = async(moduleId, contentId)=>{
  try{
    const response = await api.delete(`/modules/${moduleId}/contents/${contentId}`);
    return response.data; 
  }catch(err){
    console.log('Error in content api');
    throw err;
  }
}

export const getDepartments = async (body) => {
  try {
    const response = await api.get(`/${body.batchId}/departments`);
    console.log(response.data.batchDepts);
    return response.data.batchDepts;
  } catch (err) {
    console.log("Error in department api");
    return [];
  }
};

export const getAllDepartments = async () => {
  try {
    const response = await api.get("/departments");
    return response.data.departments;
  } catch (err) {
    console.log("Error in department api");
    return [];
  }
};

export const createDept = async (body) => {
  try {
    const response = await api.post("/departments", body);
    return response.data.department;
  } catch (err) {
    console.log("Error in department api");
    throw err;
  }
};

export const deleteDepartment = async (departmentId) => {
  try {
    const response = await api.delete(`/departments/${departmentId}`);
    return response.data.message;
  } catch (err) {
    console.log("Error in department api");
    throw err;
  }
};

export const assignHOD = async (instructorId, departmentId) => {
  try {
    const response = await api.post(`/departments/${departmentId}/assign-hod`, {
      instructorId,
    });
    return response.data.dept;
  } catch (err) {
    console.log("Error in department api");
    throw err;
  }
};

export const getBatches = async () => {
  try {
    const response = await api.get("/batches");
    return response.data.batches;
  } catch (err) {
    console.log("Error in batches api");
    return [];
  }
};

export const getActiveBatches = async () => {
  try {
    const response = await api.get("/batches/active");
    return response.data.batches;
  } catch (err) {
    console.log("Error in batches api");
    return [];
  }
};

export const createBatch = async (body) => {
  try {
    return await api.post("/batches", body);
  } catch (err) {
    console.log("Error in batches api");
  }
};

export const deleteBatch = async (batchId) => {
  try {
    return await api.delete(`/batches/${batchId}`);
  } catch (err) {
    console.log("Error in batches api");
  }
};

export const getUsers = async ({ query }) => {
  try {
    console.log(query);
    const response = await api.get(`/users?${query}`);
    return response.data.users;
  } catch (err) {
    console.log("Error in users api");
    return [];
  }
};

export const createAcademicYear = async (body) => {
  try {
    return await api.post("/academic-years", body);
  } catch (err) {
    console.log("Error in academic year api");
    throw err;
  }
};

export const deleteAcademicYear = async (academicYearId) => {
  try {
    const response = await api.delete(`/academic-years/${academicYearId}`);
    return response.data.message;
  } catch (err) {
    console.log("Error in academic year api");
    throw err;
  }
};

export const getAllAcademicYears = async () => {
  try {
    const response = await api.get("/academic-years");
    console.log(response.data.academicyears);
    return response.data.academicyears;
  } catch (err) {
    console.log("Error in academic year api");
    return [];
  }
};

export const getAcademicYearById = async (academicyearId) => {
  try {
    const response = await api.get(`/academic-years/${academicyearId}`);
    return response.data.academicyear;
  } catch (err) {
    console.log("Error in academic year api");
    return [];
  }
};

export const updateSemester = async (semesterId, body) => {
  try {
    const response = await api.put(`/semesters/${semesterId}`, body);
    return response.data.semester;
  } catch (err) {
    console.log("Error in semester api");
    throw err;
  }
};

export const getActiveSemesters = async () => {
  try {
    const response = await api.get("/semesters/active");
    return response.data.semesters;
  } catch (err) {
    console.log("Error in semester api");
    return [];
  }
}

export const getAllCourses = async () => {
  try {
    const response = await api.get("/courses");
    return response.data.courses;
  } catch (err) {
    console.log("Error in course api");
    return [];
  }
}

export const getNewCourses = async () => {
  try {
    const response = await api.get("/courses/new");
    return response.data.courses;
  } catch (err) {
    console.log("Error in course api");
    console.error(err);
    return [];
  }
}

export const getBatchCount = async () => {
  try {
    const response = await api.get("/batches/count");
    return response.data.count;
  } catch (err) {
    console.log("Error in batch count api");
    return '-1';
  }
};

export const getDepartmentCount = async () => {
  try {
    const response = await api.get("/departments/count");
    return response.data.count;
  } catch (err) {
    console.log("Error in department count api");
    return '-1';
  }
};

export const getEnrolledCoursesCount = async () => {
  try {
    const response = await api.get("/courses/enrolled-courses/count");
    return response.data.count;
  } catch (err) {
    console.log("Error in enrolled courses count api");
    return '-1';
  }
}

export const getCompletedCoursesCount = async () => {
  try {
    const response = await api.get("/courses/enrolled-courses/count?status=completed");
    return response.data.count;
  } catch (err) {
    console.log("Error in completed courses count api");
    return '-1';
  }
};

export const getCreatedCoursesCount = async () => {
  try {
    const response = await api.get("/courses/created-courses/count");
    return response.data.count;
  } catch (err) {
    console.log("Error in created courses count api");
    return '-1';
  }
};

export const getStudentsCountByInstructor = async () => {
  try {
    const response = await api.get("/users/students-count");
    return response.data.count;
  } catch (err) {
    console.log("Error in students count by instructor api");
    console.error(err);
    return '-1';
  }
};