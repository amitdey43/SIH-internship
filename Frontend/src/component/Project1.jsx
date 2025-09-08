import { useState } from "react";

export let Project1 = function({ projects, setProjects }) {

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    let updated = [...projects];
    updated[index][name] = value;
    setProjects(updated);
  };

  const addProject = () => {
    setProjects([...projects, { title: "", description: "", technologies: "", link: "" }]);
  };

  const removeProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  return (
    <div className="projects-section">
      <h3>Projects</h3>

      {projects.map((project, index) => (
        <div key={index} className="project-card">
          <label>Project Title</label>
          <input type="text" name="title" value={project.title} required
            onChange={(e) => handleChange(index, e)} placeholder="e.g. Online Bookstore" />

          <label>Project Description</label>
          <input type="text" name="description" value={project.description} required
            onChange={(e) => handleChange(index, e)} placeholder="Briefly describe your project" />

          <label>Technologies Used</label>
          <input type="text" name="technologies" value={project.technologies} required
            onChange={(e) => handleChange(index, e)} placeholder="e.g. React, Node.js, MongoDB" />

          <label>Project Link</label>
          <input type="text" name="link" value={project.link}
            onChange={(e) => handleChange(index, e)} placeholder="Live demo / GitHub link" />

          <button type="button" className="remove-btn" onClick={() => removeProject(index)}>
            ❌ Remove Project
          </button>
        </div>
      ))}

      <button type="button" className="add-btn" onClick={addProject}>
        ➕ Add Another Project
      </button>
    </div>
  );
};
