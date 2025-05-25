import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AcademicYear.css";
import { BiEdit } from "react-icons/bi";
import {
  deleteAcademicYear,
  getAcademicYearById,
  getAllAcademicYears,
  updateSemester,
} from "../api/Api";

const AcademicYear = () => {
  const [academicYears, setAcademicYears] = useState([]);

  const [currId, setCurrId] = useState("");

  const [isLoading, setIsLoading] = useState({
    academicYears: false,
    yearData: false,
  });

  const [editableData, setEditableData] = useState({
    id: "",
    date: "",
  });

  const [yearData, setYearData] = useState([]);

  const navigate = useNavigate();

  const handleNavigateToAddBatch = () => {
    navigate("/admin/academicyear/new");
  };

  const handleDateChange = async (id, field, value) => {
    try {
      const sem = yearData.find((item) => item._id === id);
      if (new Date() >= new Date(value)) {
        alert("New date should be greater than today");
        return;
      }
      const updatedData = {
        ...sem,
        [field]: new Date(value).toISOString(),
      };
      updateSemester(sem._id, updatedData);
      setYearData((prev) =>
        prev.map((item) => (item._id === sem._id ? updatedData : item))
      );
    } catch (err) {
      alert("Error in updating semester");
      console.log(err);
    } finally {
      setEditableData({ id: "", date: "" });
    }
  };

  const handleYearChange =  (id) => {
    setCurrId(id);
  };

  const handleDeleteAcademicYear = async () => {
    if (currId === "") {
      return;
    }
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this academic year? This action cannot be undone."
      );
      if (confirmDelete) {
        await deleteAcademicYear(currId);
        setCurrId("");
        const data = await getAllAcademicYears();
        setAcademicYears(data);
      }
    } catch (err) {
      alert("Error deleting academic year");
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchAcademicYears = async () => {
      setIsLoading((prev) => ({ ...prev, academicYears: true }));
      const data = await getAllAcademicYears();
      setAcademicYears(data);
      setIsLoading((prev) => ({ ...prev, academicYears: false }));
    };
    fetchAcademicYears();
  }, []);

  useEffect(() => {
    console.log(currId);
    if (currId === "") {
      setYearData([]);
      return;
    }
    const fetchData = async () => {
      setIsLoading((prev) => ({ ...prev, yearData: true }));
      const data = await getAcademicYearById(currId);
      console.log(data);
      setYearData(data.semesters);
      setIsLoading((prev) => ({ ...prev, yearData: false }));
    };
    fetchData();
  }, [currId]);

  return (
    <div className="academic-container">
      <div className="academic-header">
        <div>
          <label
            htmlFor="selectedYear"
            style={{ fontSize: "16px", fontWeight: "bold" }}
          >
            Choose Year :{" "}
          </label>
          <select
            name="selectedYear"
            id="selectedYear"
            onChange={(e) => handleYearChange(e.target.value)}
          >
            <option value={""}>Select one</option>
            {academicYears.map((year, index) => {
              return (
                <option key={index} value={year._id}>
                  {year.name}
                </option>
              );
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
          {isLoading.yearData ? (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          ) : yearData.length > 0 ? (
            yearData.map((item, index) => (
              <tr key={index}>
                <td>{item.batch.name}</td>
                <td>{item.semNum}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <button
                      className="edit-button"
                      disabled={new Date(item.startDate) <= new Date()}
                      onClick={() =>
                        setEditableData({ id: item._id, date: "start" })
                      }
                      onBlur={() => setEditableData({ id: "", date: "" })}
                    >
                      <BiEdit />
                    </button>
                    {editableData.id === item._id &&
                    editableData.date === "start" ? (
                      <input
                        type="date"
                        value={
                          new Date(item.startDate).toISOString().split("T")[0]
                        }
                        onChange={(e) =>
                          handleDateChange(
                            item._id,
                            "startDate",
                            e.target.value
                          )
                        }
                        onMouseDown={(e) => e.preventDefault()}
                      />
                    ) : (
                      new Date(item.startDate).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                      })
                    )}
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <button
                      className="edit-button"
                      disabled={new Date(item.endDate) <= new Date()}
                      onClick={() =>
                        setEditableData({ id: item._id, date: "end" })
                      }
                      onBlur={() => setEditableData({ id: "", date: "" })}
                    >
                      <BiEdit />
                    </button>
                    {editableData.id === item._id &&
                    editableData.date === "end" ? (
                      <input
                        type="date"
                        value={
                          new Date(item.endDate).toISOString().split("T")[0]
                        }
                        onChange={(e) =>
                          handleDateChange(item._id, "endDate", e.target.value)
                        }
                        onMouseDown={(e) => e.preventDefault()}
                      />
                    ) : (
                      new Date(item.endDate).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                      })
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available for selected year.</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={handleDeleteAcademicYear} className="delete-button">
        Delete
      </button>
    </div>
  );
};

export default AcademicYear;
