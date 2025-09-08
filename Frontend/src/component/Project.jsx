import { useState } from "react";

export let Project= function({formData,setFormData}){

    let handleChange= (index,e)=>{
        let {name,value}= e.target;
        let updatedForm = [...formData.projects];
        updatedForm[index][name]= value;
        setFormData({...formData,projects:updatedForm});
    }
    let addProject = () => {
        setFormData((prev) => ({
        ...prev,
        projects: [...prev.projects, { title: "", description: "", technologies: "", link: "" }]
        }));
    };
    let removeProject= (index)=>{
        setFormData((prev)=>({ 
            ...prev,
            projects: prev.projects.filter((project,i)=>i!==index)
        }))
    }
    return (
        <div className="projects-section">
  <h3>Projects</h3>

  {formData?.projects?.map((project, index) => (
    <div key={index} className="project-card">
      <label>Project Title</label>
      <input
        type="text"
        name="title"
        value={project.title}
        required
        onChange={(e) => handleChange(index, e)}
        placeholder="e.g. Online Bookstore"
      />

      <label>Project Description</label>
      <input
        type="text"
        name="description"
        required
        value={project.description}
        onChange={(e) => handleChange(index, e)}
        placeholder="Briefly describe your project"
      />

      <label>Technologies Used</label>
      <input
        type="text"
        name="technologies"
        required
        value={project.technologies}
        onChange={(e) => handleChange(index, e)}
        placeholder="e.g. React, Node.js, MongoDB"
      />

      <label>Project Link</label>
      <input
        type="text"
        name="link"
        value={project.link}
        onChange={(e) => handleChange(index, e)}
        placeholder="Live demo / GitHub link"
      />

      <button
        type="button"
        className="remove-btn"
        onClick={() => removeProject(index)}
      >
        ❌ Remove Project
      </button>
    </div>
  ))}

  <button type="button" className="add-btn" onClick={addProject}>
    ➕ Add Another Project
  </button>
</div>

    );
}