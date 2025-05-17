import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AcademicYear.css";
import { BiEdit } from "react-icons/bi";


const toRoman = (num) => {
  const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  return romans[num - 1] || num;
};

const AcademicYear = () => {
  const [academicYears, setAcademicYears] = useState([]);

  const [isLoading, setIsLoading] = useState({
    academicYears: false,
    yearData: false,
  });

  const [yearData, setYearData] = useState([]);

  const navigate = useNavigate();

  const handleNavigateToAddBatch = () => {
    navigate("/admin/academicyear/new");
  };

  const handleYearChange = (id) => {
    console.log(id);
    if(id===''){
      setYearData([]);
      return;
    }

    setIsLoading(prev=>({...prev, yearData:true}));
    
    const dupSemData = [
      {
        _id:'1',
        batch:{name:'2022'},
        semNo:6,
        startDate:'02-01-2025',
        endDate:'30-06-2025'
      },
      {
        _id:'2',
        batch:{name:'2021'},
        semNo:8,
        startDate:'02-01-2025',
        endDate:'30-06-2025'
      },
    ]

    const year = academicYears.find((data)=>{
      return data._id===id;
    });

    console.log(year);
    
    const data = dupSemData.filter((data)=>{
      return year.semesters.includes(data._id);
    })
    
    setYearData(data);
    setIsLoading(prev=>({...prev, yearData:false}));
  };

  useEffect(() => {
    setIsLoading(prev=>({...prev, academicYears:true}));
    const data = [
      {
        _id:'100',
        name:"2022 - 2023",
        semesters:['1','2','3']
      },
      {
        _id:'101',
        name:"2023 - 2024",
        semesters:['4','5','6']
      },
      {
        _id:'102',
        name:"2024 - 2025",
        semesters:['7','8','9']
      }
    ]
    setAcademicYears(data);
    console.log(academicYears);
    setIsLoading(prev=>({...prev, academicYears:false}));
  }, []);

  return (
    <div className="academic-container">
      <div className="header">
        <div>
        <label htmlFor="selectedYear">Choose Year : </label>
        <select
          name="selectedYear"
          id="selectedYear"
          onChange={(e) => handleYearChange(e.target.value)}
        >
            <option value={""}>Select One</option>
          {academicYears.map((year, index)=>{
            return <option key={index} value={year._id}>{year.name}</option>
          })}
        </select>
        </div>
        <button onClick={handleNavigateToAddBatch} className="add-button">
          Add New Academic Year
        </button>
      </div>

      <table className="academic-table">
        <thead>
          <tr>
            <th>Batch</th>
            <th>Semester</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {yearData.length > 0 ? (
            yearData.map((item, index) => (
              <tr key={index}>
                <td>{item.batch.name}</td>
                <td>{toRoman(item.semNo)}</td>
                <td><button><BiEdit/></button>{item.startDate}</td>
                <td><button><BiEdit/></button>{item.endDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available for selected year.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AcademicYear;
