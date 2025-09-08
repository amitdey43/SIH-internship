import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "../css/InternshipsPage.module.css"
import { useNavigate } from "react-router-dom";

export const InternshipsList = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  let navigate =useNavigate();
  const [keyword, setKeyword] = useState("");
  const [department, setDepartment] = useState("");
  const [mode, setMode] = useState("");
  const [minStipend, setMinStipend] = useState("");
  const [maxStipend, setMaxStipend] = useState("");
  const [sort, setSort] = useState("newest"); 

  const fetchInternships = async () => {
    setLoading(true);
    try {
      let query = [];

      if (keyword) query.push(`keyword=${keyword}`);
      if (department) query.push(`department=${department}`);
      if (mode) query.push(`mode=${mode}`);
      if (minStipend) query.push(`stipendgte=${minStipend}`);
      if (maxStipend) query.push(`stipendlte=${maxStipend}`);

      if (sort === "stipend-high") query.push("sort=-stipend");
      else if (sort === "stipend-low") query.push("sort=stipend");
      else query.push("sort=-createdAt"); 

      const res = await axios.get(
        `http://localhost:8000/app/user/internships?${query.join("&")}`,
        { withCredentials: true }
      );

      setInternships(res.data.internships || res.data.products || []);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to load internships");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchInternships();
  };

  return (
    <div className={style.internshipspage}>
      <h2>📋 Available Internships</h2>

      <form className={style.filters} onSubmit={handleFilter}>
        <input
          type="text"
          placeholder="Search by title, dept, domain..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="HR">Human Resources</option>
          <option value="Design">Design</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
          <option value="Operations">Operations</option>
          <option value="Customer Support">Customer Support</option>
          <option value="Content Writing">Content Writing</option>
          <option value="Data Science">Data Science</option>
          <option value="R&D">R&D</option>
          <option value="Product Management">Product Management</option>
          <option value="Legal">Legal</option>
          <option value="Supply Chain">Supply Chain</option>
          <option value="Education">Education</option>
        </select>

        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="">Any Mode</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <input
          type="number"
          placeholder="Min Stipend"
          value={minStipend}
          onChange={(e) => setMinStipend(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Stipend"
          value={maxStipend}
          onChange={(e) => setMaxStipend(e.target.value)}
        />

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="stipend-high">Highest Stipend</option>
          <option value="stipend-low">Lowest Stipend</option>
        </select>

        <button type="submit">Apply Filters</button>
      </form>

      {/* Loading / Error */}
      {loading && <p>⏳ Loading internships...</p>}
      {error && <p className={style.error}>{error}</p>}
      {!loading && internships.length === 0 && <p>No internships found.</p>}

      {/* Cards */}
      <div className={style.internshipcards}>
        {internships.map((intern) => (
          <div className={style.internshipcard} key={intern._id} onClick={()=>navigate(`/intership/details/${intern._id}`)}>
            <h3>{intern.title}</h3>
            <p><b>🏢 Department:</b> {intern.department}</p> 
            <p><b>🌐 Domain:</b> {intern.domain}</p> 
            <p><b>💡 Skills:</b> {intern.skills?.join(", ")}</p> 
            <p><b>💰 Stipend:</b> ₹{intern.stipend}</p> 
            <p><b>👥 Openings:</b> {intern.numberOfOpenings}</p> 
            <p><b>📅 Start:</b> {intern.startDate?.substring(0, 10)}</p> 
            <p><b>📅 End:</b> {intern.endDate?.substring(0, 10)}</p> 
            <p><b>📌 Mode:</b> {intern.mode}</p> 
            {/* <h1>Job Description</h1>
            <p className={style.description}>{intern.description}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------- Plain CSS ---------- */
// Paste this into a CSS file and import it
/*
.page-container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
.heading {
  text-align: center;
  margin-bottom: 20px;
}
.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.search-bar, select {
  padding: 8px;
  font-size: 14px;
  flex: 1;
}
.internship-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}
.internship-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}
.internship-card:hover {
  transform: scale(1.02);
}
.apply-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
.apply-btn:hover {
  background: #0056b3;
}
.no-results {
  text-align: center;
  font-style: italic;
}
*/
