import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Plain CSS is defined here as a template literal.
// This style block can be placed inside the component for encapsulation.
const styles = `
  body {
    background-color: #f4f7f9;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
    line-height: 1.6;
    margin: 0;
  }

  .profile-container {
    max-width: 1000px;
    margin: 40px auto;
    padding: 30px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 77, 153, 0.1);
    border: 1px solid #e0e0e0;
  }

  /* Header Section */
  .profile-header {
    display: flex;
    align-items: center;
    padding-bottom: 25px;
    border-bottom: 2px solid #f0f0f0;
    margin-bottom: 25px;
  }

  .profile-pic {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 25px;
    border: 4px solid #007bff;
  }

  .header-info h1 {
    margin: 0;
    font-size: 2.2rem;
    color: #1a253c;
    font-weight: 700;
  }

  .header-info p {
    margin: 5px 0 0;
    font-size: 1.1rem;
    color: #555;
  }
  
  /* General Section Styling */
  .section {
    margin-bottom: 30px;
  }
  
  .section-title {
    font-size: 1.6rem;
    color: #0056b3;
    font-weight: 600;
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 3px solid #007bff;
    display: inline-block;
  }

  /* Grid for Info Items */
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .info-item strong {
    color: #333;
    display: block;
    margin-bottom: 5px;
  }
  
  .info-item span {
    color: #666;
  }

  /* Skills & Technologies */
  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .tag {
    background-color: #eaf4ff;
    color: #0056b3;
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: 500;
    font-size: 0.95rem;
  }

  /* Projects Section */
  .project-card {
    background-color: #fcfcfc;
    border: 1px solid #eee;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 15px;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }

  .project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  .project-card h4 {
    margin: 0 0 10px 0;
    color: #003366;
  }
  
  .project-card p {
      margin-bottom: 15px;
  }

  /* Links & Buttons */
  .links-container {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }

  .action-link {
    display: inline-block;
    padding: 10px 22px;
    border-radius: 5px;
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    text-align: center;
    transition: all 0.3s ease;
  }
  .action-link:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  .github { background-color: #333; }
  .linkedin { background-color: #0A66C2; }
  .portfolio { background-color: #c71610; }
  .project-link { background-color: #007bff; }
  .download-btn { background-color: #28a745; }
  
  /* Resume Section */
  .resume-iframe {
    width: 100%;
    height: 600px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 20px;
  }
`;

// Mock user data based on your Mongoose schema for demonstration.
// In a real app, this would come from an API call.
const mockUser = {
  name: "Johnathan Smith",
  email: "john.smith.dev@example.com",
  phone: "+1-555-123-4567",
  profilePic: "https://placehold.co/200x200/007bff/ffffff?text=JS",
  university: "Metropolis University",
  degree: "Master of Science",
  branch: "Artificial Intelligence",
  yearOfStudy: 2,
  cgpa: 3.9,
  skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Data Visualization", "AWS", "Docker"],
  projects: [
    {
      title: "Neural Network Visualizer",
      description: "A web-based tool to visualize the architecture and activation functions of neural networks in real-time.",
      technologies: ["React", "D3.js", "Flask"],
      link: "https://github.com/example/nn-visualizer"
    },
    {
      title: "Sentiment Analysis API",
      description: "A RESTful API that provides sentiment analysis for text, deployed as a serverless function on AWS Lambda.",
      technologies: ["Python", "NLTK", "AWS Lambda"],
      link: "https://github.com/example/sentiment-api"
    }
  ],
  // NOTE: The resume URL must be embeddable. Some services like Google Drive
  // require a specific embed URL format. A direct link to a PDF should work.
  resume: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", // Sample PDF
  linkedIn: "https://linkedin.com/in/example-dev",
  github: "https://github.com/example",
  portfolio: "https://example-dev.com",
};

const UserProfileForHR = () => {
  let navigate = useNavigate();
  let {id,internid}= useParams();
  let [user,setUser]= useState("");
  let [internship,setInternship]= useState("");
  let [uh,setUh]= useState("");
  let [hr,setHr]= useState("");
  useEffect(()=>{
    axios.get(`http://localhost:8000/app/hr/getuserforhr/${id}/${internid}`,{
        withCredentials:true
    })
    .then((res)=>{
      setUser(res.data?.user);
      setInternship(res.data?.internship);
      setUh(res.data?.uh);
      setHr(res.data?.hr)
    })
    .catch(()=>alert("Problem to fetch user details"))
  },[])
  let handelShortlist= ()=>{
    axios.get(`http://localhost:8000/app/hr/condition/shortlisted/${user._id}/${internship._id}`,{
      withCredentials:true
    })
    .then((res)=>alert("status updated"))
    .catch(()=>{
      alert("problem to update status");
    })
  }
  let handelReject= ()=>{
    axios.get(`http://localhost:8000/app/hr/condition/reject/${user._id}/${internship._id}`,{
      withCredentials:true
    })
    .then((res)=>alert("status updated"))
    .catch(()=>{
      alert("problem to update status");
    })
  }
  return (
    <>
      <style>{styles}</style>
      <div className="profile-container">
        
        <header className="profile-header">
          <img src={user.profilePic} alt={`${user.name}'s profile`} className="profile-pic" />
          <div className="header-info">
            <h1>{user.name}</h1>
            <p>{user.email} &bull; {user.phone}</p>
          </div>
        </header>

        <section className="section">
          <h2 className="section-title">Professional Links</h2>
          <div className="links-container">
            <a href={user.github} target="_blank" rel="noopener noreferrer" className="action-link github">GitHub</a>
            <a href={user.linkedIn} target="_blank" rel="noopener noreferrer" className="action-link linkedin">LinkedIn</a>
            <a href={user.portfolio} target="_blank" rel="noopener noreferrer" className="action-link portfolio">Portfolio</a>
          </div>
        </section>
        
        <section className="section">
          <h2 className="section-title">Education</h2>
          <div className="info-grid">
            <div className="info-item"><strong>University:</strong> <span>{user.university}</span></div>
            <div className="info-item"><strong>Degree:</strong> <span>{user.degree} in {user.branch}</span></div>
            <div className="info-item"><strong>Year of Study:</strong> <span>{user.yearOfStudy}</span></div>
            <div className="info-item"><strong>CGPA:</strong> <span>{user.cgpa} /10</span></div>
          </div>
        </section>
        
        <section className="section">
          <h2 className="section-title">Core Skills</h2>
          <div className="tags-container">
            {user?.skills?.map((skill, index) => (
              <span key={index} className="tag">{skill}</span>
            ))}
          </div>
        </section>
        
        <section className="section">
          <h2 className="section-title">Projects</h2>
          {user?.projects?.map((project, index) => (
            <div key={index} className="project-card">
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <strong>Technologies:</strong>
              <div className="tags-container" style={{ marginTop: '10px', marginBottom: '20px' }}>
                {project?.technologies?.map((tech, i) => <span key={i} className="tag">{tech}</span>)}
              </div>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="action-link project-link">View Project on GitHub</a>
            </div>
          ))}
        </section>
        
        <section className="section">
          <h2 className="section-title">Resume</h2>
          <iframe src={user.resume} title={`${user.name}'s Resume`} className="resume-iframe">
            Your browser does not support embedded PDFs. Please use the download link.
          </iframe>
          <a href={user.resume} download={`${user.name}_Resume.pdf`} className="action-link download-btn">
            Download Resume
          </a>
        </section>
        {uh.status==="pending"?(
          <div>
            <button onClick={handelShortlist} >Shortlist</button>
            <br></br>
            <br></br>
            <button onClick={handelReject}>Reject</button>
          </div>
        ):(<button>{uh.status}</button>)}
      </div>
    </>
  );
};

export default UserProfileForHR;