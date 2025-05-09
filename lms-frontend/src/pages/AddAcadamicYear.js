import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddAcadamicYear.css";

const AddAcademicYear = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [newEntry, setNewEntry] = useState({
    semester: "",
    startDate: "",
    endDate: ""
  });

  const navigate = useNavigate();
  const availableYears = [2020, 2021, 2022, 2023, 2024, 2025];

  const handleInputChange = (e) => {
    setNewEntry({
      ...newEntry,
      [e.target.name]: e.target.value
    });
  };

  const handleAddBatch = () => {
    const { semester, startDate, endDate } = newEntry;

    if (!semester || !startDate || !endDate) {
      alert("Please fill in all fields.");
      return;
    }

    // TODO: Add batch to a global store or backend here

    // Reset form
    setNewEntry({ semester: "", startDate: "", endDate: "" });

    // Navigate back to academic year list
    navigate("/academicYear");
  };

  return (
    <div className="add-batch-container">
      <h2>Add Academic Year / Batch</h2>

      <div className="year-selection">
        <label htmlFor="year">Select Year:</label>
        <select
          id="year"
          name="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">-- Select Year --</option>
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <input
          type="text"
          name="semester"
          placeholder="Semester (e.g. 2023 - 2026)"
          value={newEntry.semester}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="startDate"
          value={newEntry.startDate}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="endDate"
          value={newEntry.endDate}
          onChange={handleInputChange}
        />
        <button onClick={handleAddBatch}>Add Batch</button>
      </div>
    </div>
  );
};

export default AddAcademicYear;
