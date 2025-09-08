import { useState } from "react";
import { CreateInternship } from "./Createintership";
import { Internships } from "./internships";

export const Hrdashboard = function () {
  const [activeTab, setActiveTab] = useState("overview");
    

  const [domains, setDomains] = useState([]);
  const [domainInput, setDomainInput] = useState("");

  const handleAddDomain = (e) => {
    e.preventDefault();
    const trimmed = domainInput.trim();
    if (trimmed && !domains.includes(trimmed)) {
      setDomains([...domains, trimmed]);
      setDomainInput("");
    }
  };

  const handleRemoveDomain = (domain) => {
    setDomains(domains.filter((d) => d !== domain));
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <h1>Internship Recommendation - HR Dashboard</h1>
        <div className="profile">
          <span className="profile-pic">👩‍💼</span>
          <span className="profile-name">Welcome, HR Manager</span>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">⚙️ Menu</h2>
        <nav>
          <button onClick={() => setActiveTab("overview")} className={activeTab === "overview" ? "active" : ""}>
            📊 Overview
          </button>
          <button onClick={() => setActiveTab("candidates")} className={activeTab === "candidates" ? "active" : ""}>
            👥 Candidates
          </button>
          <button onClick={() => setActiveTab("notifications")} className={activeTab === "notifications" ? "active" : ""}>
            🔔 Notifications
          </button>
          <button onClick={() => setActiveTab("createInternship")} className={activeTab === "createInternship" ? "active" : ""}>
            📝 Create Internship
          </button>
          <button onClick={() => setActiveTab("interviews")} className={activeTab === "interviews" ? "active" : ""}>
            📅 Interviews
          </button>
          <button onClick={() => setActiveTab("internships")} className={activeTab === "internships" ? "active" : ""}>
            📑 Interships
          </button>
          <button onClick={() => setActiveTab("settings")} className={activeTab === "settings" ? "active" : ""}>
            ⚙️ Settings
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="main">
        {activeTab === "overview" && (
                <div className="overview">
            <h2>📊 Overview</h2>
            <div className="cards">
                <div className="card">
                <div className="card-header">
                    <span>Total Candidates</span>
                    <span className="icon">👥</span>
                </div>
                <h3>128</h3>
                <div className="progress">
                    <div className="progress-bar" style={{ width: "100%" }}></div>
                </div>
                </div>

                <div className="card">
                <div className="card-header">
                    <span>Selected</span>
                    <span className="icon">✅</span>
                </div>
                <h3>52</h3>
                <div className="progress">
                    <div className="progress-bar" style={{ width: "40%" }}></div>
                </div>
                </div>

                <div className="card">
                <div className="card-header">
                    <span>Pending</span>
                    <span className="icon">⏳</span>
                </div>
                <h3>40</h3>
                <div className="progress">
                    <div className="progress-bar" style={{ width: "31%" }}></div>
                </div>
                </div>

                <div className="card">
                <div className="card-header">
                    <span>Rejected</span>
                    <span className="icon">❌</span>
                </div>
                <h3>36</h3>
                <div className="progress">
                    <div className="progress-bar" style={{ width: "28%" }}></div>
                </div>
                </div>
            </div>
            </div>

        )}

        {activeTab === "candidates" && (
          <div>
            <h2>👥 Candidates</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Applied For</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Amit Kumar</td>
                  <td>Frontend Intern</td>
                  <td>✅ Selected</td>
                </tr>
                <tr>
                  <td>Riya Sharma</td>
                  <td>Backend Intern</td>
                  <td>⏳ Pending</td>
                </tr>
                <tr>
                  <td>Raj Verma</td>
                  <td>HR Intern</td>
                  <td>❌ Rejected</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "notifications" && (
          <div>
            <h2>🔔 Notifications</h2>
            <ul className="notifications">
              <li>New candidate applied for Backend Intern</li>
              <li>HR round scheduled for Amit Kumar</li>
              <li>Reminder: Final interviews tomorrow</li>
            </ul>
          </div>
        )}

        {activeTab === "createInternship" && (
               <CreateInternship/>
        )}

        {activeTab === "interviews" && (
          <div>
            <h2>📅 Interviews</h2>
            <ul>
              <li>Interview with Riya Sharma - Tomorrow 11:00 AM</li>
              <li>Interview with Raj Verma - Sep 8, 2:30 PM</li>
            </ul>
          </div>
        )}

        {activeTab === "internships" && (
          <Internships/>
        )}

        {activeTab === "settings" && (
          <div>
            <h2>⚙️ Settings</h2>
            <form className="settings-form">
              <input type="text" placeholder="HR Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Change Password" />
              <button type="submit">Save Changes</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};
