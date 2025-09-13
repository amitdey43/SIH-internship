// http://localhost:8000/app/user/internships

import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Sample data for demonstration. In a real application, you would pass this data as a prop.
const sampleInternship = {
  title: "Frontend Developer",
  companyName: "Innovate Solutions Inc.",
  mode: "Hybrid",
  department: "Engineering",
  domain: "Web Development",
  skills: ["React", "JavaScript", "HTML", "CSS"],
  stipend: 25000,
  numberOfOpenings: 5,
  city: "Bangalore",
  startDate: new Date("2024-09-15"),
  endDate: new Date("2025-03-15"),
  description: "Join our dynamic team to build and maintain user-facing web applications. You will work on cutting-edge projects and contribute to the entire software development lifecycle.",
};

const formatDate = (date) => {
  if (!date) return 'N/A';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const formatDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return 'N/A';
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30.44); 
  return `${diffMonths} months`;
};

const InternshipDetails = ({ internship = sampleInternship }) => {
  const [interviewQuestions, setInterviewQuestions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  let [user,setUser]= useState("");
  let navigate= useNavigate();  

  let [formdata,setFormdata]= useState({})
  let {id}= useParams();
  let form={
    id
  }
  useEffect(()=>{
    axios.post("http://localhost:8000/app/user/internship",form,{
        withCredentials:true,
    }).then((res)=>{setFormdata(res.data?.internship);
        setUser(res.data?.user)
    }).catch(()=>{
        alert("Cann't show Internship details due to internal issue");
    })
  },[])

  
  
  const generateInterviewQuestions = async () => {
    setIsLoading(true);
    setInterviewQuestions(null);
    setMessage(null);
    
   
    
    try {
      const userPrompt = `Generate a list of 5-7 common interview questions for a ${formdata.title} position at ${formdata.createdBy.companyName}, considering the required skills: ${formdata.skills.join(', ')}. Provide the questions as a JSON array of strings.`;

      const payload = {
          contents: [{ parts: [{ text: userPrompt }] }],
          tools: [{ "google_search": {} }],
          systemInstruction: {
              parts: [{ text: "You are an expert recruiter. Generate a list of common interview questions for a given job description. Provide the response as a JSON object with a single key 'questions' containing an array of strings." }]
          },
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                "questions": {
                  type: "ARRAY",
                  items: { "type": "STRING" }
                }
              },
              "propertyOrdering": ["questions"]
            }
          }
      };
      
    const apikey= 'AIzaSyBHsXEt92G7B6pbC7fSZmLGQgNglRNMpXE';
    const apiUrl= `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apikey}`

      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      const jsonText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (jsonText) {
        const parsedJson = JSON.parse(jsonText);
        setInterviewQuestions(parsedJson.questions);
      } else {
        setInterviewQuestions(["Could not generate questions. Please try again."]);
      }
    } catch (error) {
      console.error("Error generating interview questions:", error);
      setInterviewQuestions([`An error occurred: ${error.message}. Please try again later.`]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        /* Global CSS */
        body {
          font-family: 'Inter', sans-serif;
        }
        
        .container {
          background-color: #0f172a;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          position: relative;
        }

        .card {
          background-color: #1e293b;
          color: #fff;
          border-radius: 1rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          padding: 2rem;
          max-width: 56rem;
          width: 100%;
          transition: all 0.3s ease-in-out;
        }

        .card:hover {
          box-shadow: 0 0 40px #06b6d4;
        }

        .header-section {
          text-align: center;
          margin-bottom: 2rem;
        }

        .title {
          font-size: 2.25rem;
          font-weight: 800;
          color: #22d3ee;
          margin-bottom: 0.5rem;
        }
        
        @media (min-width: 768px) {
          .title {
            font-size: 3rem;
          }
        }

        .subtitle {
          font-size: 1.5rem;
          font-weight: 600;
          color: #d1d5db;
        }

        .details-grid {
          display: grid;
          gap: 1.5rem;
          font-size: 1.125rem;
          margin-bottom: 2rem;
        }
        
        @media (min-width: 768px) {
          .details-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        .detail-item {
          background-color: #334155;
          padding: 1rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          transition: transform 0.3s ease;
        }

        .detail-item:hover {
          transform: translateY(-5px);
        }

        .detail-icon {
          color: #22d3ee;
          margin-right: 0.75rem;
          font-size: 1.5rem;
        }

        .label {
          font-weight: 500;
          color: #9ca3af;
        }
        
        .value {
          font-weight: 600;
        }

        .skills-section {
          margin-bottom: 2rem;
        }
        
        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #e5e7eb;
          margin-bottom: 1rem;
        }

        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .skill-tag {
          background-color: #0ea5e9;
          color: #fff;
          font-size: 0.875rem;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .description-text {
          color: #ffffff; /* Updated to pure white */
          line-height: 1.625;
        }
        
        .detail-info {
          font-size: 1.125rem;
          line-height: 1.5;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .detail-info .label {
          font-weight: 600;
          color: #e5e7eb;
        }
        
        .detail-info .value {
          color: #d1d5db;
        }

        .button-group {
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        @media (min-width: 768px) {
            .button-group {
                flex-direction: row;
                justify-content: center;
            }
        }

        .action-button {
          background: linear-gradient(to right, #9333ea, #06b6d4);
          color: #fff;
          font-weight: 700;
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease, transform 0.2s ease-in-out;
          border: none;
          cursor: pointer;
        }
        
        .action-button:hover {
          background: linear-gradient(to right, #a855f7, #22d3ee);
          transform: scale(1.05);
        }
        .action-button:disabled {
          background: #334155;
          cursor: not-allowed;
        }

        .ai-output-section {
          margin-top: 2rem;
          padding: 1.5rem;
          background-color: #1a2332;
          border-radius: 1rem;
          border: 1px solid #334155;
        }

        .ai-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #e2e8f0;
          margin-bottom: 1rem;
        }
        
        .ai-text {
          color: #cbd5e1;
          line-height: 1.6;
          white-space: pre-wrap;
        }

        .ai-list {
          list-style: none;
          padding: 0;
        }

        .ai-list li {
          margin-bottom: 0.5rem;
          color: #cbd5e1;
        }

        .ai-list li:before {
          content: '•';
          color: #06b6d4;
          font-weight: bold;
          display: inline-block;
          width: 1em;
          margin-left: -1em;
        }

        .message-box-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .message-box {
          background-color: #1e293b;
          color: #fff;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          text-align: center;
          max-width: 400px;
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card h3{
            color:#22d3ee;;
        }
        .detail-item{
            background-color:#fff;
        }

      `}</style>
      <div className="container">
        <div className="card">
          <header className="header-section">
            <h1 className="title">
              {formdata.title}
            </h1>
            <h2 className="subtitle">
              {formdata.companyName}
            </h2>
          </header>

          <section className="details-grid">
            <div className="detail-item">
              <span className="detail-icon">🌍</span>
              <div>
                <p className="label">Mode</p>
                <p className="value">{formdata.mode}</p>
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-icon">🏢</span>
              <div>
                <p className="label">Department</p>
                <p className="value">{formdata.department}</p>
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-icon">🧠</span>
              <div>
                <p className="label">Domain</p>
                <p className="value">{formdata.domain}</p>
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-icon">💰</span>
              <div>
                <p className="label">Stipend</p>
                <p className="value">₹{formdata.stipend}</p>
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <div>
                <p className="label">City</p>
                <p className="value">{formdata.city}</p>
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-icon">⏳</span>
              <div>
                <p className="label">Duration</p>
                <p className="value">{formdata.duration} months</p>
              </div>
            </div>
          </section>

          <section className="skills-section">
            <h3 className="section-title">Skills Required</h3>
            <div className="skills-list">
              {formdata.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="skill-tag"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="skills-section">
            <h3 className="section-title">About the Internship</h3>
            <p className="description-text" style={{color:"white"}}>
              {formdata.description}
            </p>
          </section>

          <section className="skills-section">
            <h3 className="section-title">Internship Application Details</h3>
            <div className="detail-info">
              <p><span className="label">Start Date:</span> <span className="value">{formatDate(formdata.startDate)}</span></p>
              <p><span className="label">End Date:</span> <span className="value">{formatDate(formdata.endDate)}</span></p>
              <p><span className="label">Openings:</span> <span className="value">{formdata.numberOfOpenings}</span></p>
            </div>
          </section>

           {user.role==="Student"?( 
            <div className="button-group">
              
              {user.appliedInterships?.map(app => app.internship.toString()).includes(formdata._id) ? (
                <button className="action-button">Already applied</button>
              ) : (
                <button
                  onClick={() => navigate(`/internship/apply/${formdata._id}`)}
                  className="action-button"
                >
                  Apply Now
                </button>
              )}


              
              <button onClick={generateInterviewQuestions} disabled={isLoading} className="action-button">
                Practice Questions
              </button>
            </div>
            ):""}   
          
          {isLoading && (
            <div className="ai-output-section">
              <p className="ai-title">Generating content...</p>
            </div>
          )}

          
          {interviewQuestions && !isLoading && (
            <div className="ai-output-section">
              <h4 className="ai-title">Potential Interview Questions</h4>
              <ul className="ai-list">
                {interviewQuestions.map((q, index) => (
                  <li key={index}>{q}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {message && (
        <div className="message-box-overlay">
          <div className="message-box">
            <p>{message}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default InternshipDetails;