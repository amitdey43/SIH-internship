import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// A component to inject all the necessary CSS into the document's head.


// --- SVG Icon Components ---
const LightningIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
);

const SecurityIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
);

const SupportIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10h.01M15 10h.01M9 14h6"></path></svg>
);

const ChatIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
);

const Header = ()=>{
    let navigate = useNavigate();
    let [token,setToken]= useState("");
    let [role,setRole]= useState("");
    useEffect(()=>{
        axios.get("http://localhost:8000/app/mentor/check",{
            withCredentials:true
        }).then((res)=>{
            setToken(res.data?.token);
            setRole(res.data?.role);
        }).catch((err)=>{
            console.error(err);
            
        })
    },[])
    return (

        <header className="headerr">
            <nav className="container">
                <div className="nav-content">
                    <div className="logo">YourLogo</div>
                    <div className="nav-links">
                        <a href="#features">Features</a>
                        <a href="#generator">AI Generator</a>
                        <a href="#">Pricing</a>
                        <a href="#">Contact</a>
                    </div>
                    {
                    token === "" ? (
                        <button className="btn" onClick={() => navigate("/login")}>
                        Sign Up
                        </button>
                        
                    ) : (
                        <>
                        <button className="btn" onClick={() => navigate(`/${role==="Student"?"user":role.toLowerCase()}/dashboard`)}>
                        Dashboard
                        </button>
                        <button className="btn" onClick={() => navigate(`/internships`)}>
                        Internships
                        </button>
                        </>
                    )
                    }
                </div>
            </nav>
        </header>
    );

};

const Hero = () => (
    <section className="hero">
        <div className="container">
            <h1>Build Your Next Idea Faster</h1>
            <p>A simple, elegant, and powerful starting point for your next project. Use our AI to generate ideas and get started instantly.</p>
            <a href="#generator" className="btn btn-large">
                Try The AI Generator
            </a>
        </div>
    </section>
);

const AIGenerator = () => {
    const [idea, setIdea] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!idea.trim()) {
            setError('Please enter a business idea.');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const apikey= 'AIzaSyBHsXEt92G7B6pbC7fSZmLGQgNglRNMpXE';
            const apiUrl= `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apikey}`
            const systemPrompt = "You are a creative branding expert. A user will provide a business idea. Generate a creative business name, a catchy tagline, and three key features with brief descriptions. Return the response as a JSON object with the keys: 'businessName', 'tagline', and 'features' (an array of objects, each with 'title' and 'description').";
            const userQuery = `My business idea is: ${idea}`;

            const payload = {
                contents: [{ parts: [{ text: userQuery }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] },
                generationConfig: { responseMimeType: "application/json" }
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`API error: ${response.status} ${response.statusText}`);
            
            const apiResult = await response.json();
            const candidate = apiResult.candidates?.[0];

            if (candidate?.content?.parts?.[0]?.text) {
                setResult(JSON.parse(candidate.content.parts[0].text));
            } else {
                throw new Error("Invalid response structure from API.");
            }
        } catch (err) {
            console.error('Error calling Gemini API:', err);
            setError(`An error occurred: ${err.message}. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="generator" className="section">
            <div className="container">
                <div className="section-header">
                    <h2>Generate Your Next Big Idea ✨</h2>
                    <p>Describe your business concept and let our AI create a name, tagline, and key features for you.</p>
                </div>
                <div className="generator-card">
                    <textarea
                        rows="3"
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        placeholder="e.g., A subscription box for eco-friendly cleaning products"
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="btn"
                    >
                        {loading ? 'Generating...' : 'Generate Idea'}
                    </button>
                </div>

                {loading && <div className="spinner"></div>}
                {error && <div className="error-container">{error}</div>}
                
                {result && (
                    <div className="results-container">
                        <div className="result-header">
                            <h3>{result.businessName || 'Unnamed Idea'}</h3>
                            <p>"{result.tagline || 'No tagline generated.'}"</p>
                        </div>
                        <div className="result-features">
                            {(result.features || []).map((feature, index) => (
                                <div key={index} className="feature-card">
                                    <h4>{feature.title || 'Feature'}</h4>
                                    <p>{feature.description || 'No description available.'}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

const Features = () => (
    <section id="features" className="section" style={{backgroundColor: 'var(--white)'}}>
        <div className="container">
            <div className="section-header">
                <h2>Why Choose Us?</h2>
                <p>Everything you need to launch and grow your business.</p>
            </div>
            <div className="features-grid">
                <div className="feature-card">
                    <div className="feature-icon-wrapper"><LightningIcon /></div>
                    <h3>Lightning Fast</h3>
                    <p>Our platform is optimized for speed and performance, ensuring a great user experience.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon-wrapper"><SecurityIcon /></div>
                    <h3>Rock-Solid Security</h3>
                    <p>Your data is safe with us. We use industry-standard encryption and security practices.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon-wrapper"><SupportIcon /></div>
                    <h3>24/7 Support</h3>
                    <p>Our support team is always available to help you with any questions or issues.</p>
                </div>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="footer">
        <div className="container">
            <div className="footer-content">
                <p>&copy; 2025 YourCompany. All rights reserved.</p>
                <div className="footer-links">
                    <a href="#">Facebook</a>
                    <a href="#">Twitter</a>
                    <a href="#">Instagram</a>
                </div>
            </div>
        </div>
    </footer>
);

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([{ role: 'bot', text: 'Hello! How can I help you with your internship search today?' }]);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory, isTyping]);

    const handleSendMessage = async () => {
        const userMessage = message.trim();
        if (!userMessage) return;

        const newUserMessageObject = { role: 'user', text: userMessage };
        setChatHistory(prev => [...prev, newUserMessageObject]);
        setMessage('');
        setIsTyping(true);

        const apiChatHistory = [...chatHistory, newUserMessageObject]
            .map(msg => ({ role: msg.role === 'bot' ? 'model' : 'user', parts: [{ text: msg.text }] }));

        try {
            const apikey= 'AIzaSyBHsXEt92G7B6pbC7fSZmLGQgNglRNMpXE';
            const apiUrl= `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apikey}`
            const systemPrompt = "You are a friendly and helpful chatbot assistant for a website called 'InternPortal'. Your goal is to answer user questions about finding internships, preparing resumes, and general career advice. Keep your answers concise and encouraging. Do not provide information unrelated to internships or career development.";

            const payload = {
                contents: apiChatHistory,
                systemInstruction: { parts: [{ text: systemPrompt }] },
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => ({}));
                const errorMessage = errorBody?.error?.message || response.statusText || 'Something went wrong';
                throw new Error(`API error: ${errorMessage}`);
            }
            
            const result = await response.json();
            const botResponse = result.candidates?.[0]?.content?.parts?.[0]?.text;

            if (botResponse) {
                setChatHistory(prev => [...prev, { role: 'bot', text: botResponse }]);
            } else {
                throw new Error("No response from bot.");
            }
        } catch (error) {
            console.error("Chatbot Error:", error);
            setChatHistory(prev => [...prev, { role: 'bot', text: "Sorry, I'm having trouble connecting. Please try again later." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="chat-widget">
             <div className={`chat-window ${isOpen ? '' : 'closed'}`}>
                <div className="chat-header">
                    <h3>Internship Assistant</h3>
                    <button onClick={() => setIsOpen(false)} className="close-btn">&times;</button>
                </div>
                <div className="chat-body">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`chat-bubble ${msg.role === 'user' ? 'user' : 'bot'}`}>
                            {msg.text}
                        </div>
                    ))}
                    {isTyping && (
                         <div className="chat-bubble bot typing-indicator">
                            <span />
                            <span />
                            <span />
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                <div className="chat-footer">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask a question..."
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
            <button onClick={() => setIsOpen(true)} className={`chat-open-btn ${isOpen ? 'closed' : ''}`}>
                <ChatIcon />
            </button>
        </div>
    );
};


// --- Main App Compo nent ---
export const Home =  function() {
    return (
        <div className="hg">
           
            <Header />
            <main>
                <Hero />
                <AIGenerator />
                <Features />
            </main>
            <Footer />
            <Chatbot />
        </div>
    );
}