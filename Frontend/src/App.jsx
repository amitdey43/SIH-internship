import { useState } from "react";
import "./App.css";
import axios from "axios";
import { Project } from "./component/project";
import { useNavigate } from "react-router-dom";

function App() {
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
  let navigate= useNavigate();
  const [data, setData] = useState({
    projects: [
      {
        title: "",
        description: "",
        technologies: "",
        link: "",
      },
    ],
  });

  let [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("phone", formData.phone);
    form.append("university", formData.university);
    form.append("degree", formData.degree);
    form.append("branch", formData.branch);
    form.append("yearOfStudy", formData.yearOfStudy);
    form.append("cgpa", formData.cgpa);
    form.append("linkedIn", formData.linkedIn);
    form.append("github", formData.github);
    form.append("portfolio", formData.portfolio);

    form.append("skills", JSON.stringify(formData.skills));
    form.append("prefferedDomain", JSON.stringify(formData.prefferedDomain));
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
        setFormData({ name: "",
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
            {
              title: "",
              description: "",
              technologies: "",
              link: "",
            },
          ],
        })
        navigate("/user/dashboard")
      })
      .catch((err) => {
        console.log(err.response?.data || "Something went wrong");
        setError(err.response?.data || "Something went wrong");
         if (err.response?.data?.keyValues) {
          alert(
            "Error fields: " + Object.keys(err.response.data.keyValues).join(", ")
          );
        } else {
          alert("Something went wrong");
        }
        setFormData({ name: "",
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
            {
              title: "",
              description: "",
              technologies: "",
              link: "",
            },
          ],
        })
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>


<form onSubmit={handleSubmit} className="userform">
  <h2 className="form-title">Register Your Profile</h2>

  {/* Personal Info */}
  <div className="form-section">
    <h3>Personal Information</h3>

    <label>Full Name</label>
    <input
      type="text"
      name="name"
      placeholder="Enter your full name"
      value={formData.name}
      onChange={handleChange}
    />

    <label>Email</label>
    <input
      type="email"
      name="email"
      placeholder="Enter your email"
      value={formData.email}
      onChange={handleChange}
    />

    <label>Password</label>
    <input
      type="password"
      name="password"
      placeholder="Enter a secure password"
      value={formData.password}
      onChange={handleChange}
    />

    <label>Phone Number</label>
    <input
      type="text"
      name="phone"
      placeholder="Enter phone number"
      value={formData.phone}
      onChange={handleChange}
    />
  </div>

  {/* Education */}
  <div className="form-section">
    <h3>Education</h3>

    <label>University</label>
    <input
      type="text"
      name="university"
      placeholder="Enter university"
      value={formData.university}
      onChange={handleChange}
    />

    <label>Degree</label>
    <input
      type="text"
      name="degree"
      placeholder="Enter degree"
      value={formData.degree}
      onChange={handleChange}
    />

    <label>Branch</label>
    <input
      type="text"
      name="branch"
      placeholder="Enter branch"
      value={formData.branch}
      onChange={handleChange}
    />

    <label>Year of Study</label>
    <input
      type="number"
      name="yearOfStudy"
      placeholder="1 - 5"
      value={formData.yearOfStudy}
      onChange={handleChange}
      min="1"
      max="5"
    />

    <label>CGPA</label>
    <input
      type="number"
      name="cgpa"
      placeholder="Enter CGPA"
      value={formData.cgpa}
      onChange={handleChange}
      min="0"
      max="10"
    />
  </div>

 
  <div className="form-section">
    <h3>Skills & Projects</h3>

    <label>Skills</label>
    <input
      type="text"
      name="skills"
      placeholder="e.g. Java, Python, React"
      value={formData.skills}
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          skills: e.target.value.split(",").map((s) => s.trim()),
        }))
      }
    />

    <Project formData={data} setFormData={setData} />
  </div>

  {/* Uploads */}
  <div className="form-section">
    <h3>Uploads</h3>

    <label>Profile Picture</label>
    <input type="file" name="profilePic" id="profile" />

    <label>Resume(in jpg, jpeg, png, webp format only)</label>
    <input type="file" name="resume" id="resume"/>
  </div>

  {/* Social Links */}
  <div className="form-section">
    <h3>Social Links</h3>

    <label>LinkedIn</label>
    <input
      type="text"
      name="linkedIn"
      placeholder="Enter LinkedIn profile"
      value={formData.linkedIn}
      onChange={handleChange}
    />

    <label>GitHub</label>
    <input
      type="text"
      name="github"
      placeholder="Enter GitHub profile"
      value={formData.github}
      onChange={handleChange}
    />

    <label>Portfolio</label>
    <input
      type="text"
      name="portfolio"
      placeholder="Enter portfolio link"
      value={formData.portfolio}
      onChange={handleChange}
    />

    <label>Preferred Domains</label>
    <input
      type="text"
      name="prefferedDomain"
      placeholder="e.g. AI, Web Dev, Cloud"
      value={formData.prefferedDomain}
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          prefferedDomain: e.target.value.split(",").map((d) => d.trim()),
        }))
      }
    />
  </div>


  <button type="submit">Register</button>
</form>


    </>
  );
}

export default App;
