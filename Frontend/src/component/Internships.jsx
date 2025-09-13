import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Internships = ({uh,Hr}) => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/app/hr/get-internships", {
        withCredentials: true,
      })
      .then((res) => setInternships(res.data.internships || []))
      .catch((err) => console.error(err.response?.data || err.message))
      .finally(() => setLoading(false));
  }, []);

  // let deleteinternship = (internid)=>{
  //   useEffect(()=>{
  //     axios.put(`http://localhost:8000/app/hr/delete-internships/${internid}`,{
  //       uh,
  //       Hr,
  //       internships
  //     },{
  //       withCredentials: true
  //     }).then((res)=>{
  //       alert("Delete succussfully");
  //     }).catch((err)=>{
  //       alert("There is problem to delete");
  //     })
  //   },[])
  // }
  if (loading) return <p className="loading">⏳ Loading internships...</p>;

  return (
    <div className="internship-list" style={{display:"flex", flexDirection:"column"}}>
      <h2 className="title">📋 Created Internships</h2>
      {internships.length === 0 ? (
        <p className="no-data">No internships created yet.</p>
      ) : (
        <div className="cards">
          {internships.map((intern, idx) => (
            <div className="card" key={idx}>
              <h3 className="card-title">{intern.title}</h3>

              <p><span>📝 Mode:</span> {intern.mode}</p>
              <p><span>🏢 Department:</span> {intern.department}</p>
              <p><span>🌐 Domain:</span> {intern.domain}</p>
              <p><span>🛠️ Skills:</span> {intern.skills?.join(", ") || "N/A"}</p>
              <p><span>👥 Openings:</span> {intern.numberOfOpenings}</p>
              <p><span>📅 Start:</span> {intern.startDate?.substring(0, 10)}</p>
              <p><span>📅 End:</span> {intern.endDate?.substring(0, 10)}</p>

              <p className="description">{intern.description}</p>

              <div className="card-actions">
                <button className="edit-btn" onClick={()=> navigate(`/edit/${intern._id}`)}>✏️ Edit</button>
                <button className="delete-btn">🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
