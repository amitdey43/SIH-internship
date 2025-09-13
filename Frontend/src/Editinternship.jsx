import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';



export const Editinternship = () => {

 

  const [formData, setFormData] = useState({
    title: "",
    mode: "",
    department: "",
    skills: [],
    domain: "",
    stipend: "",
    city: "",
    duration: "",
    numberOfOpenings: "",
    startDate: "",
    endDate: "",
    description: ""
  });
  let navigate= useNavigate();
  const [skillInput, setSkillInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  let {internid}= useParams();
  

useEffect(() => {
  const fetchInternshipData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/app/hr/get-internship/${internid}`,
        { withCredentials: true }
      );

      if (res.data?.internship) {
        let internship = res.data.internship;

        internship.startDate = internship.startDate
          ? new Date(internship.startDate).toISOString().split("T")[0]
          : "";
        internship.endDate = internship.endDate
          ? new Date(internship.endDate).toISOString().split("T")[0]
          : "";

        setFormData(internship);
      }
      setMessage({ type: "info", text: "Loaded existing internship data." });
    } catch (error) {
      console.error("Failed to fetch internship data:", error);
      setMessage({ type: "error", text: "Failed to load internship data." });
    } finally {
      setIsLoading(false);
    }
  };

  fetchInternshipData();
}, [internid]);


 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    const trimmed = skillInput.trim();
    if (trimmed && !formData.skills.includes(trimmed)) {
      setFormData({ ...formData, skills: [...formData.skills, trimmed] });
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
        setMessage({ type: 'error', text: "Error: End date cannot be before the start date." });
        return;
    }
      
    setIsLoading(true);
    setMessage(null);
    try {
      const response = await axios.put(
        `http://localhost:8000/app/hr/update-internship/${internid}`,
        formData,
        { withCredentials: true }
      );
      console.log(response.data);
      alert("Updated successfully");
      setMessage({ type: 'success', text: 'Internship updated successfully!' });
      navigate("/hr/dashboard");
    } catch (error) {
      console.error(error.response?.data || error.message);
    
      setMessage({ type: 'error', text: 'Failed to update internship. Please try again.' });
    } finally {
        setIsLoading(false);
    }
  };

  if (isLoading && !formData.title) {
    return <div className="loading-container">Loading internship details...</div>;
  }


  return (
    <div className="create-internship-container">
      <div className="create-internship">
        <h2>📝 Edit Internship</h2>
        <form className="internship-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Internship Title</label>
            <input type="text" name="title" placeholder="e.g., Frontend Developer" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label>Mode of Internship</label>
              <select name="mode" value={formData.mode} onChange={handleChange} required>
                <option value="">Select mode</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="form-group">
              <label>Department</label>
              <select name="department" value={formData.department} onChange={handleChange} required>
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">Human Resources</option>
                <option value="Design">Design</option>
                <option value="Sales">Sales & Business Development</option>
                <option value="Finance">Finance & Accounting</option>
                <option value="Operations">Operations & Management</option>
                <option value="Customer Support">Customer Support / Client Relations</option>
                <option value="Content Writing">Content Writing / Copywriting</option>
                <option value="Data Science">Data Science & Analytics</option>
                <option value="R&D">Research & Development (R&D)</option>
                <option value="Product Management">Product Management</option>
                <option value="Legal">Legal / Compliance</option>
                <option value="Supply Chain">Supply Chain & Logistics</option>
                <option value="Education">Education & Training</option>
              </select>
            </div>
          </div>
          
          <div className="form-group-row">
            <div className="form-group">
              <label>Internship Domain</label>
              <input type="text" name="domain" placeholder="e.g., Web Development" value={formData.domain} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>City / Location</label>
                <input type="text" name="city" placeholder="e.g., Kolkata" value={formData.city} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label>Stipend (per month)</label>
              <input type="number" name="stipend" placeholder="e.g., 5000" value={formData.stipend} onChange={handleChange} min="0" required />
            </div>
            <div className="form-group">
              <label>Duration (months)</label>
              <input type="number" name="duration" placeholder="e.g., 6" value={formData.duration} onChange={handleChange} min="1" required />
            </div>
            <div className="form-group">
              <label>Number of Openings</label>
              <input type="number" name="numberOfOpenings" placeholder="e.g., 5" min="1" value={formData.numberOfOpenings} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group-row">
             <div className="form-group">
                <label>Application Start Date</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
             </div>
             <div className="form-group">
                <label>Application End Date</label>
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
             </div>
          </div>

          <div className="form-group">
            <label>Skills Requirements</label>
            <div className="skill-input">
              <input type="text" placeholder="Type skill and click 'Add'" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} />
              <button onClick={handleAddSkill}>+ Add</button>
            </div>
            <div className="skill-list" style={{display:"flex"}}>
              {formData.skills.map((skill, idx) => (
                <span className="skill-item" key={idx} style={{display:"flex", color:"black"}}>
                  {skill}{" "}
                  <button className="remove" onClick={() => handleRemoveSkill(skill)}>✖</button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" placeholder="Describe the internship role..." value={formData.description} onChange={handleChange} required></textarea>
          </div>

          {message && (
            <div className={`message ${message.type}`}>
                {message.text}
            </div>
          )}

          <button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Changes'}</button>
        </form>
      </div>
    </div>
  );
};


