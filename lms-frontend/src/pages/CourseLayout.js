import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import ContentsBar from "../components/ContentsBar";
import "../styles/CourseLayout.css";
import OptionsButton from "../components/OptionsButton";
import { getCourseById } from "../api/Api";

function CourseLayout() {
  // const courseDemo = {
  //   title: "MIT",
  //   modules: [
  //     {
  //       _id: "m1",
  //       title: "Module1",
  //       contents: [
  //         { _id: "c1", title: "M1", type:'video', data: "nC7j3UKyIbA" },
  //         { _id: "c2", title: "M2", type:'video', data: "4GxLkMmGURA" },
  //       ],
  //       isPublished:true
  //     },
  //     {
  //       _id:"m2",
  //       title: "Module2",
  //       contents: [
  //         { _id: "c3", title: "M3", type:'video', data: "gEC8IEZYxc0" },
  //         { _id: "c4", title: "M4", type:'video', data: "U1JLtpJTe84" },
  //       ],
  //       isPublished:false
  //     }
  //   ],
  // };

  const {courseId} = useParams();

  const [course, setCourse] = useState(null);

  useEffect(()=>{
    const fetchCourse = async()=>{
      try{
      const course = await getCourseById(courseId);
      setCourse(course);
      }catch(err){
        console.log(err);
      }
    }
    fetchCourse();
  },[courseId]);

  return (
    <div className="course-layout">
      <ContentsBar
        course={course}
        setCourse={setCourse}
      />
      <main className="course-content">
        <Outlet context={{course, setCourse}}/>
      </main>
    </div>
  );
}

export default CourseLayout;
