import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddAcadamicYear.css";
import { createAcademicYear, getActiveBatches } from "../api/Api";

const AddAcademicYear = () => {
  const [year, setYear] = useState("");
  const [rows, setRows] = useState([
    { batch: "", semNum: 1, startDate: "", endDate: "" },
  ]);

  const [activeBatches, setActiveBatches] = useState([]);

  const navigate = useNavigate();

  // const batchOptions = ["2020", "2021", "2022", "2023", "2024", "2025"];

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = field === "semNum" ? parseInt(value) : value;
    setRows(updatedRows);
  };

  const handleAddRow = (e) => {
    e.preventDefault();
    setRows([...rows, { batch: "", semNum: 1, startDate: "", endDate: "" }]);
  };

  const handleRemoveRow = (e) => {
    e.preventDefault();
    if (rows.length > 1) {
      const updatedRows = [...rows];
      updatedRows.pop();
      setRows(updatedRows);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let i = 0; i < rows.length; i++) {
      if (
        rows[i].batch === "" ||
        rows[i].startDate === "" ||
        rows[i].endDate === ""
      ) {
        alert("Please fill all the fields");
        return;
      }
    }
    console.log("Saved Data:", { year, rows });
    try {
      await createAcademicYear({
        academicyearName: year,
        academicyearData: rows,
      });
    } catch (err) {
      alert("Error in creating academic year");
    } finally {
      navigate("/admin/academicyear");
    }
  };

  useEffect(() => {
    const fetchActiveBatches = async () => {
      try {
        const data = await getActiveBatches();
        setActiveBatches(data);
      } catch (error) {
        console.error("Error fetching active batches:", error);
      }
    };

    fetchActiveBatches();
  }, []);

  return (
    <div className="add-academic-container">
      <h2>Create Academic Year</h2>
      <form className="academic-form" onSubmit={handleSubmit}>
        <div className="year-select">
          <label htmlFor="year">Year :</label>
          <input
            type="text"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="e.g. 2024 - 2025"
            required
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
                    {activeBatches.map((batch) => (
                      <option key={batch._id} value={batch._id}>
                        {batch.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={row.semNum}
                    onChange={(e) =>
                      handleChange(idx, "semNum", e.target.value)
                    }
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
                    onChange={(e) =>
                      handleChange(idx, "startDate", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={row.endDate}
                    onChange={(e) =>
                      handleChange(idx, "endDate", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="button-group">
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              className="aca-btn"
              style={{ backgroundColor: "blue" }}
              onClick={(e) => handleAddRow(e)}
            >
              Add Row
            </button>
            <button
              className="aca-btn"
              style={{ backgroundColor: "red" }}
              onClick={(e) => handleRemoveRow(e)}
            >
              Remove Row
            </button>
          </div>
          <button className="aca-btn" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAcademicYear;
