import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import ContentsBar from "../components/ContentsBar";
import '../styles/CoursePage.css';
import { getModules } from "../api/Api";

function CoursePage() {
  const [modules, setModules] = useState([]); 

  /*const courses = [
    { name: "DSP", id: 100 },
    { name: "CS", id: 101 },
    { name: "ADC", id: 102 },
    { name: "MIT", id: 103 },
    { name: "ES", id: 104 },
  ];*/
  const { course } = useParams();

  useEffect(()=>{
    const loadModules = async()=>{
      try{
        const data = await getModules({course});
        console.log(data);
      }catch(err){
        console.error('Error fetching modules: ',err);
      }
    }
    loadModules();
  },[]);
  //const course = courses.find((obj) => obj.id === Number(id));
  /*const modules = [
    {title:"Module 1", materials:["M1","M2","M3"]},
    {title:"Module 2", materials:["M1","M2","M3"]},
    {title:"Module 3", materials:["M1","M2","M3"]},
    {title:"Module 4", materials:["M1","M2","M3"]},
    {title:"Module 5", materials:["M1","M2","M3"]},
  ];*/
  return (
    <div className="course-page">
      <NavBar />
      <div id="course-area">
        <ContentsBar modules={modules}/>
        <div id="content-area">
          
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CoursePage;
