
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const GlobalStyles = () => (
  <style>{`
    /* --- Basic Reset & Typography --- */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

    :root {
        --indigo-600: #4f46e5;
        --indigo-700: #4338ca;
        --indigo-50: #eef2ff;
        --gray-100: #f3f4f6;
        --gray-200: #e5e7eb;
        --gray-400: #9ca3af;
        --gray-500: #6b7280;
        --gray-600: #4b5563;
        --gray-800: #1f2937;
        --white: #ffffff;
        --green-100: #d1fae5;
        --green-700: #047857;
        --yellow-100: #fef9c3;
        --yellow-700: #a16207;
        --red-100: #fee2e2;
        --red-700: #b91c1c;
    }

    body {
        margin: 0;
        font-family: 'Inter', sans-serif;
        background-color: var(--gray-100);
        color: var(--gray-800);
        font-size: 16px;
        line-height: 1.5;
    }

    *, *::before, *::after { box-sizing: border-box; }
    h1, h2, h3, h4, p { margin: 0; }
    a { text-decoration: none; color: inherit; }
    ul { list-style: none; padding: 0; }

    /* --- Logo --- */
    .logo {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--indigo-600);
        cursor: pointer;
    }

    /* --- Dashboard --- */
    .dashboard-layout {
      display: flex;
      height: 100vh;
      background-color: var(--gray-100);
    }
    .dashboard-sidebar {
      width: 260px;
      background-color: var(--white);
      display: flex;
      flex-direction: column;
      border-right: 1px solid var(--gray-200);
      padding: 1.5rem;
      transition: width 0.3s ease;
    }
    .sidebar-header { margin-bottom: 2rem; }
    .sidebar-nav { flex-grow: 1; }
    .sidebar-nav button {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 0.75rem 1rem;
      border-radius: 0.375rem;
      color: var(--gray-600);
      font-weight: 500;
      margin-bottom: 0.5rem;
      transition: background-color 0.2s ease, color 0.2s ease;
      background: none;
      border: none;
      text-align: left;
      cursor: pointer;
      font-size: 1rem;
    }
    .sidebar-nav button:hover {
      background-color: var(--indigo-50);
      color: var(--indigo-700);
    }
    .sidebar-nav button.active {
      background-color: var(--indigo-600);
      color: var(--white);
    }
    .sidebar-nav button svg {
      width: 1.25rem;
      height: 1.25rem;
      margin-right: 0.75rem;
    }
    .sidebar-footer button {
      width: 100%; display: flex; align-items: center; justify-content: center;
      padding: 0.75rem 1rem; border-radius: 0.375rem;
      color: var(--gray-600); background-color: var(--gray-100);
      font-weight: 500; border: none; cursor: pointer;
    }
    .sidebar-footer button:hover { background-color: var(--gray-200); }
    .dashboard-main { flex: 1; display: flex; flex-direction: column; overflow-y: auto; }
    .dashboard-header {
      background-color: var(--white);
      padding: 1.5rem 2rem;
      border-bottom: 1px solid var(--gray-200);
      display: flex; justify-content: space-between; align-items: center;
    }
    .dashboard-header h1 { font-size: 1.5rem; font-weight: 700; }
    .user-profile {
      width: 2.5rem; height: 2.5rem; border-radius: 9999px;
      background-color: var(--gray-200);
      display:flex; align-items:center; justify-content:center;
      font-weight:bold; color: var(--gray-600);
    }
    .dashboard-content { padding: 2rem; }
    .dashboard-section {
      background-color: var(--white);
      padding: 1.5rem; border-radius: 0.5rem;
      box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1);
      margin-top: 2rem;
    }
    .dashboard-section:first-child { margin-top: 0; }
    .dashboard-section h2 { font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; }

    /* --- Stat Cards --- */
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
    .stat-card { background-color: var(--white); padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1); }
    .stat-card h3 { font-size: 1rem; color: var(--gray-500); font-weight: 500; }
    .stat-card .value { font-size: 2.25rem; font-weight: 700; margin: 0.5rem 0; }
    .stat-card .description { font-size: 0.875rem; color: var(--gray-500); }
    .progress-bar { width: 100%; background-color: var(--gray-200); border-radius: 9999px; height: 0.5rem; overflow: hidden; }
    .progress-bar div { height: 100%; background-color: var(--indigo-600); border-radius: 9999px; }

    /* --- Application List / Table --- */
    .application-list li, .application-table tr {
      display: grid; grid-template-columns: 3fr 2fr 1fr; align-items: center;
      padding: 1rem 0; border-bottom: 1px solid var(--gray-200);
    }
     .application-list li:last-child, .application-table tr:last-child { border-bottom: none; }
    .application-list .status, .application-table .status {
      padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem;
      font-weight: 500; text-align: center; justify-self: end;
    }
    .status.pending { background-color: var(--yellow-100); color: var(--yellow-700); }
    .status.approved { background-color: var(--green-100); color: var(--green-700); }
    .status.rejected { background-color: var(--red-100); color: var(--red-700); }

    /* --- Forms & Inputs --- */
    .form-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
    @media (min-width: 768px) { .form-grid { grid-template-columns: repeat(2, 1fr); } }
    .form-group { display: flex; flex-direction: column; }
    .form-group label { margin-bottom: 0.5rem; font-weight: 500; color: var(--gray-800); }
    .form-group input, .form-group select, .form-group textarea {
      padding: 0.75rem; border: 1px solid var(--gray-200); border-radius: 0.375rem;
      font-size: 1rem; font-family: 'Inter', sans-serif;
    }
    .form-group input:focus, .form-group textarea:focus { outline: none; box-shadow: 0 0 0 2px var(--indigo-600); }
    .form-actions {
        margin-top: 2rem;
        display: flex;
        justify-content: flex-end;
    }
     .btn-primary { background-color: var(--indigo-600); color: var(--white); border:none; padding: 0.75rem 1.5rem; border-radius: 0.375rem; font-weight: 600; cursor:pointer; }
     .btn-primary:hover { background-color: var(--indigo-700); }

    /* --- Settings Page --- */
    .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 0;
        border-bottom: 1px solid var(--gray-200);
    }
    .setting-item:last-child { border-bottom: none; }
    .toggle-switch {
        position: relative;
        display: inline-block;
        width: 3.5rem;
        height: 2rem;
    }
    .toggle-switch input { opacity: 0; width: 0; height: 0; }
    .slider {
        position: absolute; cursor: pointer;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: var(--gray-200);
        transition: .4s; border-radius: 34px;
    }
    .slider:before {
        position: absolute; content: "";
        height: 1.5rem; width: 1.5rem;
        left: 0.25rem; bottom: 0.25rem;
        background-color: white;
        transition: .4s; border-radius: 50%;
    }
    input:checked + .slider { background-color: var(--indigo-600); }
    input:checked + .slider:before { transform: translateX(1.5rem); }


    /* --- Responsive --- */
    @media (max-width: 768px) {
        .dashboard-layout { flex-direction: column; }
        .dashboard-sidebar {
            width: 100%; height: auto; flex-direction: row;
            align-items: center; padding: 0.5rem 1rem;
            border-right: none; border-bottom: 1px solid var(--gray-200);
        }
        .sidebar-header { margin-bottom: 0; margin-right: auto; }
        .sidebar-nav { display: flex; flex-grow: 0; }
        .sidebar-nav button { margin-bottom: 0; padding: 0.5rem; }
        .sidebar-nav button span { display: none; }
        .sidebar-nav button svg { margin-right: 0; }
        .sidebar-footer { display: none; }
        .dashboard-header, .dashboard-content { padding: 1rem; }
    }
  `}</style>
);

const DashboardIcon = () => (<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>);
const ApplicationsIcon = () => (<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>);
const ProfileIcon = () => (<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>);
const SettingsIcon = () => (<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);


const DashboardPage = ({user,setUser}) => {
    return(
        <>
        <div className="stats-grid">
        <div className="stat-card">
            <h3>Applications Sent</h3>
            <div className="value">{user?.appliedInterships?.length || 0}</div>
            <p className="description">Apply for more internships</p>
        </div>

        <div className="stat-card">
            <h3>Interviews Scheduled</h3>
            <div className="value">
            {user?.appliedInterships?.filter(app => app.status === "shortlisted").length || 0}
            </div>
            <p className="description">
            {user?.appliedInterships?.filter(app => app.status === "pending").length || 0} pending confirmation
            </p>
        </div>

        <div className="stat-card">
            <h3>Accepted Internship</h3>
            <div className="value">
            {user?.appliedInterships?.filter(app => app.status === "accepted").length || 0}
            </div>
            <p className="description">Let's go 🚀</p>
        </div>
        </div>

        <div className="dashboard-section">
            <h2>My Applications</h2>
            <ul className="application-list">
                {user?.appliedInterships?.map((intern)=>(
                    <li>
                        <div>
                            <p style={{fontWeight: '600'}}>{intern.internship.title}</p>
                            <p style={{color: 'var(--gray-500)', fontSize: '0.875rem'}}>{intern.internship.companyname || "TATA Steal"}</p>
                        </div>
                        <p style={{color: 'var(--gray-500)'}}>{intern.internship.duration || "0 months"}</p>
                        <span className="status pending">{intern.status}</span>
                    </li>
                ))}
                
              
            </ul>
        </div>
    </>
    );
    
};

const MyApplicationsPage = ({user,setUser}) => {
    let navigate= useNavigate();
    return(
    <div className="dashboard-section">
        <h2>All Applications</h2>
        <table className="application-table" style={{width: '100%'}}>
            <thead>
                <tr style={{textAlign: 'left', color: 'var(--gray-500)', fontWeight: 500}}>
                    <th>Role</th>
                    <th>Company</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {user?.appliedInterships?.map((intern)=>(
                   
                <tr>
                    <td>{intern.internship.title}</td>
                    <td>{intern.internship.companyname || "TATA Steal"}</td>
                    <td><span className="status pending">{intern.status}</span></td>
                    <button onClick={()=>navigate(`/intership/details/${intern.internship._id}`)} >View details</button>
                </tr>
                ))}
             
            </tbody>
        </table>
    </div>);
};

const ProfilePage = () => (
    <>
        <div className="dashboard-section">
            <h2>Personal Information</h2>
            <form className="form-grid">
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" defaultValue="Jane Doe" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" defaultValue="jane.doe@example.com" />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" defaultValue="+1 234 567 890" />
                </div>
                 <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" defaultValue="San Francisco, CA" />
                </div>
            </form>
        </div>
        <div className="dashboard-section">
            <h2>Resume & Skills</h2>
             <div className="form-group">
                <label htmlFor="resume">Your Resume</label>
                <input type="file" id="resume" />
            </div>
             <div className="form-group" style={{marginTop: '1.5rem'}}>
                <label htmlFor="skills">Skills (comma separated)</label>
                <textarea id="skills" rows="3" defaultValue="React, JavaScript, Node.js, Figma, Product Management"></textarea>
            </div>
        </div>
        <div className="form-actions">
            <button className="btn-primary">Save Changes</button>
        </div>
    </>
);

const SettingsPage = () => (
    <div className="dashboard-section">
        <h2>Settings</h2>
        <div className="setting-item">
            <div>
                <h3 style={{fontWeight: 600}}>Email Notifications</h3>
                <p style={{color: 'var(--gray-500)'}}>Receive updates on your applications.</p>
            </div>
            <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
            </label>
        </div>
        <div className="setting-item">
             <div>
                <h3 style={{fontWeight: 600}}>New Internship Alerts</h3>
                <p style={{color: 'var(--gray-500)'}}>Get notified about new relevant roles.</p>
            </div>
            <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
            </label>
        </div>
        <div className="setting-item">
             <div>
                <h3 style={{fontWeight: 600}}>Dark Mode</h3>
                <p style={{color: 'var(--gray-500)'}}>Toggle between light and dark themes.</p>
            </div>
            <label className="toggle-switch">
                <input type="checkbox" />
                <span className="slider"></span>
            </label>
        </div>
    </div>
);


export const Userdashboard=  function() {
    const [activePage, setActivePage] = useState('dashboard');
    let [user,setUser]= useState("");

    useEffect(()=>{
        axios.get("http://localhost:8000/app/user/dashboard",{
            withCredentials:true
        }).then((res)=>setUser(res.data?.user))
        .catch(()=>{
            alert("There is problem to fetch user data");
        })
    },[])

    const renderPage = () => {
        switch (activePage) {
            case 'dashboard':
                return <DashboardPage user={user} setUser={setUser}/>;
            case 'applications':
                return <MyApplicationsPage user={user} setUser={setUser}/>;
            case 'profile':
                return <ProfilePage />;
            case 'settings':
                return <SettingsPage />;
            default:
                return <DashboardPage />;
        }
    };

    return (
        <>
            <GlobalStyles />
            <div className="dashboard-layout">
                <aside className="dashboard-sidebar">
                    <div className="sidebar-header">
                        <div className="logo">YourLogo</div>
                    </div>
                    <nav className="sidebar-nav">
                        <button onClick={() => setActivePage('dashboard')} className={activePage === 'dashboard' ? 'active' : ''}><DashboardIcon /><span>Dashboard</span></button>
                        <button onClick={() => setActivePage('applications')} className={activePage === 'applications' ? 'active' : ''}><ApplicationsIcon /><span>My Applications</span></button>
                        <button onClick={() => setActivePage('profile')} className={activePage === 'profile' ? 'active' : ''}><ProfileIcon /><span>Profile</span></button>
                        <button onClick={() => setActivePage('settings')} className={activePage === 'settings' ? 'active' : ''}><SettingsIcon /><span>Settings</span></button>
                    </nav>
                    <div className="sidebar-footer">
                       <button>Log Out</button>
                    </div>
                </aside>
                <main className="dashboard-main">
                    <header className="dashboard-header">
                        <h1>
                           {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
                        </h1>
                        
                            <img className="user-profile" src={user.profilePic}  />
                        
                    </header>
                    <div className="dashboard-content">
                        {renderPage()}
                    </div>
                </main>
            </div>
        </>
    );
}