import React from "react";
import { Label } from "../component/ui/input";
import { Input } from "../component/ui/input";
import { cn } from "../lib/utils";

export let Project = function ({ formData, setFormData }) {
  let handleChange = (index, e) => {
    let { name, value } = e.target;
    let updatedForm = [...formData.projects];
    updatedForm[index][name] = value;
    setFormData({ ...formData, projects: updatedForm });
  };

  let addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { title: "", description: "", technologies: "", link: "" },
      ],
    }));
  };

  let removeProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((project, i) => i !== index),
    }));
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
        Projects
      </h3>

      {formData?.projects?.map((project, index) => (
        <div
          key={index}
          className="relative my-6 rounded-xl border border-neutral-200 p-6 shadow-sm dark:border-neutral-700"
        >
          <LabelInputContainer>
            <Label>Project Title</Label>
            <Input
            className="dark:text-neutral-500"
              type="text"
              name="title"
              value={project.title}
              required
              onChange={(e) => handleChange(index, e)}
              placeholder="e.g. Online Bookstore"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label>Project Description</Label>
            <Input
            className="dark:text-neutral-500"
              type="text"
              name="description"
              required
              value={project.description}
              onChange={(e) => handleChange(index, e)}
              placeholder="Briefly describe your project"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label>Technologies Used</Label>
            <Input
            className="dark:text-neutral-500"
              type="text"
              name="technologies"
              required
              value={project.technologies}
              onChange={(e) => handleChange(index, e)}
              placeholder="e.g. React, Node.js, MongoDB"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label>Project Link</Label>
            <Input
            className="dark:text-neutral-500"
              type="text"
              name="link"
              value={project.link}
              onChange={(e) => handleChange(index, e)}
              placeholder="Live demo / GitHub link"
            />
          </LabelInputContainer>

          <button
            type="button"
            onClick={() => removeProject(index)}
            className="mt-4 w-full rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
          >
            ❌ Remove Project
          </button>
        </div>
      ))}

      <button
        type="button"
        className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        onClick={addProject}
      >
        ➕ Add Another Project
      </button>
    </div>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2 mb-4", className)}>
      {children}
    </div>
  );
};
