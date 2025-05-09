import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AcademicYear.css";

const toRoman = (num) => {
  const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  return romans[num - 1] || num;
};

const AcademicYear = () => {
  const [data, setData] = useState([
    { batch: "2020 - 2022", semester: 1, startDate: "2020-01-01", endDate: "2020-06-30" },
    { batch: "2020 - 2022", semester: 2, startDate: "2020-07-01", endDate: "2020-12-31" },
    { batch: "2021 - 2023", semester: 1, startDate: "2021-01-01", endDate: "2021-06-30" },
    { batch: "2021 - 2023", semester: 2, startDate: "2021-07-01", endDate: "2021-12-31" },
    { batch: "2022 - 2025", semester: 1, startDate: "2022-01-01", endDate: "2022-06-30" },
    { batch: "2023 - 2026", semester: 1, startDate: "2023-01-01", endDate: "2023-06-30" },
  ]);

  const [selectedYear, setSelectedYear] = useState("");
  const navigate = useNavigate();

  const filteredData = data.filter((entry) => {
    const start = new Date(entry.startDate).getFullYear();
    const end = new Date(entry.endDate).getFullYear();
    return selectedYear ? start <= selectedYear && end >= selectedYear : true;
  });

  const handleNavigateToAddBatch = () => {
    navigate("/academicYear/new");
  };

  return (
    <div className="academic-container">
      <div className="header">
        <h2>Academic Years</h2>
        <button onClick={handleNavigateToAddBatch} className="add-button">
          Add New Batch
        </button>
      </div>

      <div className="filter-section">
        <label htmlFor="selectedYear">Enter Year:</label>
        <input
          type="text"
          id="selectedYear"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          placeholder="e.g. 2023"
        />
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
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.batch}</td>
                <td>{toRoman(item.semester)}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
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
