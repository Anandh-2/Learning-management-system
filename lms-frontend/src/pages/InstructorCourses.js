import React from "react";
import CourseList from "../components/CourseList";

function InstructorCourses() {
  return (
    <div>
      <button>Add Course</button>
      <CourseList
        courses={[
          { _id: 1, title: "Java", instructor: "Teacher 1" },
          { _id: 2, title: "HTML", instructor: "Teacher 2" },
          { _id: 3, title: "CSS", instructor: "Teacher 2" },
          { _id: 4, title: "JS", instructor: "Teacher 4" },
        ]}
      />
    </div>
  );
}

export default InstructorCourses;
