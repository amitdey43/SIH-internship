"use client";
import React, { useState } from "react";
import axios from "axios";
import { Label } from "./component/ui/input";
import { Input } from "./component/ui/input";
import { cn } from "./lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Project } from "./component/project";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    university: "",
    degree: "",
    branch: "",
    yearOfStudy: "",
    cgpa: "",
    skills: [],
    projects: [],
    linkedIn: "",
    github: "",
    portfolio: "",
    prefferedDomain: [],
  });

  const [data, setData] = useState({
    projects: [{ title: "", description: "", technologies: "", link: "" }],
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        form.append(key, JSON.stringify(value));
      } else {
        form.append(key, value);
      }
    });
    form.append("projects", JSON.stringify(data.projects));

    const profilePicFile = document.querySelector("#profile").files[0];
    const resumeFile = document.querySelector("#resume").files[0];
    if (profilePicFile) form.append("profilePic", profilePicFile);
    if (resumeFile) form.append("resume", resumeFile);

    axios
      .post("http://localhost:8000/app/user/register", form, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((res) => {
        console.log("Registered:", res.data);
        alert("Registration Successful!");

        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          university: "",
          degree: "",
          branch: "",
          yearOfStudy: "",
          cgpa: "",
          skills: [],
          projects: [],
          linkedIn: "",
          github: "",
          portfolio: "",
          prefferedDomain: [],
        });
        setData({
          projects: [
            { title: "", description: "", technologies: "", link: "" },
          ],
        });
      })
      .catch((err) => {
        console.log(err.response?.data || "Something went wrong");
        setError(err.response?.data || "Something went wrong");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-2xl rounded-none bg-white p-6 md:rounded-2xl md:p-10 dark:bg-black">
      <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
        Register Your Profile
      </h2>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
        Fill out the form to create your account
      </p>

      <form className="my-8 space-y-6" onSubmit={handleSubmit}>
        {/* Personal Info */}
        <LabelInputContainer>
          <Label htmlFor="name">Full Name</Label>
          <Input
            className="dark:text-neutral-500"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="email">Email</Label>
          <Input
            className="dark:text-neutral-500"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="password">Password</Label>
          <Input
            className="dark:text-neutral-500"
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            className="dark:text-neutral-500"
            id="phone"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
          />
        </LabelInputContainer>

        {/* Education */}
        <h3 className="text-lg font-semibold mt-6">Education</h3>
        <LabelInputContainer>
          <Label htmlFor="university">University</Label>
          <Input
            className="dark:text-neutral-500"
            id="university"
            name="university"
            placeholder="Enter university"
            value={formData.university}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="degree">Degree</Label>
          <Input
            className="dark:text-neutral-500"
            id="degree"
            name="degree"
            placeholder="Enter degree"
            value={formData.degree}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="branch">Branch</Label>
          <Input
            className="dark:text-neutral-500"
            id="branch"
            name="branch"
            placeholder="Enter branch"
            value={formData.branch}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="yearOfStudy">Year of Study</Label>
          <Input
            className="dark:text-neutral-500"
            id="yearOfStudy"
            name="yearOfStudy"
            type="number"
            min="1"
            max="5"
            placeholder="Enter your year (1–5)"
            value={formData.yearOfStudy}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="cgpa">CGPA</Label>
          <Input
            className="dark:text-neutral-500"
            id="cgpa"
            name="cgpa"
            type="number"
            step="0.01"
            min="0"
            max="10"
            placeholder="Enter your CGPA (0–10)"
            value={formData.cgpa}
            onChange={handleChange}
          />
        </LabelInputContainer>

        {/* Skills */}
        <LabelInputContainer>
          <Label htmlFor="skills">Skills</Label>
          <Input
            className="dark:text-neutral-500"
            id="skills"
            name="skills"
            placeholder="e.g. React, Node.js, Python"
            value={formData.skills.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                skills: e.target.value.split(",").map((s) => s.trim()),
              })
            }
          />
        </LabelInputContainer>

        {/* Projects */}
        <Project formData={data} setFormData={setData} />

        {/* Uploads */}
        <h3 className="text-lg font-semibold mt-6">Uploads</h3>
        <LabelInputContainer>
          <Label>Profile Picture</Label>
          <Input id="profile" type="file" className="dark:text-neutral-400" />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label>Resume</Label>
          <Input id="resume" type="file" className="dark:text-neutral-400" />
        </LabelInputContainer>

        {/* Social Links */}
        <h3 className="text-lg font-semibold mt-6">Social Links</h3>
        <LabelInputContainer>
          <Label htmlFor="linkedIn">LinkedIn</Label>
          <Input
            className="dark:text-neutral-500"
            id="linkedIn"
            name="linkedIn"
            placeholder="Enter LinkedIn URL"
            value={formData.linkedIn}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="github">GitHub</Label>
          <Input
            className="dark:text-neutral-500"
            id="github"
            name="github"
            placeholder="Enter GitHub URL"
            value={formData.github}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="portfolio">Portfolio</Label>
          <Input
            className="dark:text-neutral-500"
            id="portfolio"
            name="portfolio"
            placeholder="Enter portfolio URL"
            value={formData.portfolio}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="prefferedDomain">Preferred Domains</Label>
          <Input
            className="dark:text-neutral-500"
            id="prefferedDomain"
            name="prefferedDomain"
            placeholder="e.g. AI, Web Dev, Cloud"
            value={formData.prefferedDomain.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                prefferedDomain: e.target.value.split(",").map((d) => d.trim()),
              })
            }
          />
        </LabelInputContainer>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit Button */}
        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-blue-600 to-blue-800 font-medium text-white shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-900 transition"
          type="submit"
        >
          Register →
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);
