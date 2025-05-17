import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddAcadamicYear.css";

const AddAcademicYear = () => {
  const [year, setYear] = useState("");
  const [rows, setRows] = useState([
    { batch: "", semester: "1", startDate: "", endDate: "" },
  ]);

  const navigate = useNavigate();

  const batchOptions = ["2020", "2021", "2022", "2023", "2024", "2025"];

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { batch: "", semester: "1", startDate: "", endDate: "" }]);
  };

  const handleSave = () => {
    console.log("Saved Data:", { year, rows });
    navigate("/admin/academicyear");
  };

  return (
    <div className="add-academic-container">
      <h2>Academic Year</h2>

      <div className="year-select">
        <label htmlFor="year">Year:</label>
        <input
          type="text"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="e.g. 2024 - 2025"
        />
      </div>

      <table className="input-table">
        <thead>
          <tr>
            <th style={{ width: "25%" }}>Batch</th>
            <th style={{ width: "15%" }}>Sem</th>
            <th style={{ width: "30%" }}>Start Date</th>
            <th style={{ width: "30%" }}>End Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td>
                <select
                  value={row.batch}
                  onChange={(e) => handleChange(idx, "batch", e.target.value)}
                >
                  <option value="">Select Batch</option>
                  {batchOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={row.semester}
                  onChange={(e) => handleChange(idx, "semester", e.target.value)}
                >
                  {[...Array(8)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="date"
                  value={row.startDate}
                  onChange={(e) => handleChange(idx, "startDate", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={row.endDate}
                  onChange={(e) => handleChange(idx, "endDate", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="button-group">
        <button onClick={handleAddRow}>Add Row</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default AddAcademicYear;
