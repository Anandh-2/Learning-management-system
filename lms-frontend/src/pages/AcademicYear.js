import React, { useState } from "react";
import "../styles/AcademicYear.css";

const AcademicYear = () => {
  const [data, setData] = useState([
    { batch: "2020 - 2022", startYear: 2020, endYear: 2022 },
    { batch: "2021 - 2023", startYear: 2021, endYear: 2023 },
    { batch: "2022 - 2025", startYear: 2022, endYear: 2025 },
    { batch: "2023 - 2026", startYear: 2023, endYear: 2026 },
  ]);

  const [newEntry, setNewEntry] = useState({ startYear: "", endYear: "" });
  const [showAllBatches, setShowAllBatches] = useState(false);

  const currentYear = new Date().getFullYear();

  const activeBatches = data.filter(
    (batch) => currentYear >= batch.startYear && currentYear <= batch.endYear
  );

  const tableData = showAllBatches ? data : activeBatches;

  const handleInputChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    const start = Number(newEntry.startYear);
    const end = Number(newEntry.endYear);

    if (!start || !end || start >= end) {
      alert("Please enter a valid range: start year must be less than end year.");
      return;
    }

    const newBatch = `${start} - ${end}`;
    setData([
      ...data,
      {
        batch: newBatch,
        startYear: start,
        endYear: end,
      },
    ]);
    setNewEntry({ startYear: "", endYear: "" });
  };

  const toggleAllBatches = () => {
    setShowAllBatches((prev) => !prev);
  };

  return (
    <div className="academic-container">
      <h2 className="academic-title">Academic Years</h2>

      <div className="nav-bar">
        <button
          className={`nav-button ${showAllBatches ? "active" : ""}`}
          onClick={toggleAllBatches}
        >
          {showAllBatches ? "Show Active Batches" : "Show All Batches"}
        </button>
      </div>

      <div className="table-wrapper">
        <table className="academic-table">
          <thead>
            <tr>
              <th>Batch</th>
              <th>Start Year</th>
              <th>End Year</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, idx) => (
              <tr key={idx}>
                <td>{item.batch}</td>
                <td>{item.startYear}</td>
                <td>{item.endYear}</td>
              </tr>
            ))}

            {!showAllBatches && (
              <tr className="input-row">
                  <td className="disabled-cell">create new batch</td>
                <td>
                  <input
                    type="date"
                    name="startYear"
                    value={newEntry.startYear}
                    onChange={handleInputChange}
                    placeholder="Start year"
                    min="2000"
                    max="2100"
                  />
                </td>
                <td>
                  <div className="end-year-cell">
                    <input
                      type="date"
                      name="endYear"
                      value={newEntry.endYear}
                      onChange={handleInputChange}
                      placeholder="End year"
                      min="2000"
                      max="2100"
                    />
                    <button onClick={handleAdd}>Add</button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcademicYear;
