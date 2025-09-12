import axios from "axios";
import React, { useState } from "react";

export const CreateInternship = () => {
  const [formData, setFormData] = useState({
    title: "",
    mode:"",
    department: "",
    skills: [],
    domain:"",
    stipend:"",
    city:"",
    duration:"",
    numberOfOpenings: "",
    startDate: "",
    endDate: "",
    description: ""
  });
  const [domainInput, setDomainInput] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleAddDomain = (e) => {
    e.preventDefault();
    const trimmed = domainInput.trim();
    if (trimmed && !formData.skills.includes(trimmed)) {
      setFormData({ ...formData, skills: [...formData.skills, trimmed] });
      setDomainInput("");
    }
  };

  
  const handleRemoveDomain = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((d) => d !== skill)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/app/hr/create-internship",
        formData,
        { withCredentials: true }
      );
      console.log(response.data);
      alert("Internship created successfully!");

      setFormData({
        title: "",
        mode:"",
        department: "",
        skills: [],
        domain:"",
        stipend:"",
        city:"",
        duration:"",
        numberOfOpenings: "",
        startDate: "",
        endDate: "",
        description: ""
      });
    } catch (error) {
      console.error(error.response?.data || error.message);
      if (error.response && error.response.status === 401) {
          navigate("/login");
      }
      alert("Failed to create internship");
    }
  };

  return (
    <div className="create-internship">
      <h2>📝 Create Internship</h2>
      <form className="internship-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Internship Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g., Frontend Developer"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Mode of Internship</label>
          <select
            name="mode"
            value={formData.mode}
            onChange={handleChange}
          >
            <option value="">Select mode</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div className="form-group">
          <label>Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
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

        <div className="form-group">
          <label>Internship Stipend</label>
          <input
            type="Number"
            name="stipend"
            placeholder="e.g.,5000/per month"
            value={formData.stipend}
            onChange={handleChange}
            min={0}
          />
        </div>
        <div className="form-group">
          <label>Internship Duration</label>
          <input
            type="Number"
            name="duration"
            placeholder="in months"
            value={formData.duration}
            onChange={handleChange}
            min={1}
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            placeholder="e.g.,Kolkata "
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Internship Domain</label>
          <input
            type="text"
            name="domain"
            placeholder="e.g., Web Development, Digital Marketing, UI/UX Design"
            value={formData.domain}
            onChange={handleChange}
          />
        </div>



        <div className="form-group">
          <label>Skills Requirements</label>
          <div className="domain-input">
            <input
              type="text"
              placeholder="Type domain and click +"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
            />
            <button onClick={handleAddDomain}>+ Add</button>
          </div>
          <div className="domain-list">
            {formData.skills.map((d, idx) => (
              <span className="domain-item" key={idx}>
                {d}{" "}
                <span className="remove" onClick={() => handleRemoveDomain(d)}>
                  ✖
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Number of Openings</label>
          <input
            type="number"
            name="numberOfOpenings"
            placeholder="e.g., 5"
            min="1"
            value={formData.numberOfOpenings}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Application Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Application End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Describe the internship role, responsibilities, and requirements"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit">Create Internship</button>
      </form>
    </div>
  );
};


