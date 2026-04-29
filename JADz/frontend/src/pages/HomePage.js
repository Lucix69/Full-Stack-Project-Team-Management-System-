import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const [memberCount, setMemberCount] = useState(null);

  useEffect(() => {
    axios.get('/api/members')
      .then(res => setMemberCount(res.data.length))
      .catch(() => setMemberCount(0));
  }, []);

  return (
    <div className="home-page">
      {/* Background grid */}
      <div className="home-bg-grid" aria-hidden="true" />
      {/* Glowing orbs */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />

      <div className="home-hero">
        <div className="home-hero-badge">
          <span className="badge-dot" />
          <span>Full Stack Development — CLAT-2</span>
        </div>

        <h1 className="home-title">
          <span className="title-line">TEAM</span>
          <span className="title-line title-accent">JADz</span>
        </h1>

        <p className="home-tagline">
          Student Team Members Management Application
          <br />
          <span className="home-mono">21CSS301T · SRM Institute of Science and Technology</span>
        </p>

        <div className="home-stats">
          <div className="stat-card">
            <span className="stat-num">{memberCount !== null ? memberCount : '–'}</span>
            <span className="stat-label">Members</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">4</span>
            <span className="stat-label">Pages</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">5</span>
            <span className="stat-label">API Routes</span>
          </div>
        </div>

        <div className="home-cta">
          <button className="btn btn-primary cta-btn" onClick={() => navigate('/add')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
            Add Member
          </button>
          <button className="btn btn-secondary cta-btn" onClick={() => navigate('/view')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            View Members
          </button>
        </div>
      </div>

      {/* Feature cards */}
      <div className="home-features">
        {[
          { icon: '⚡', title: 'React Frontend', desc: 'Dynamic SPA with React Router, axios and component-based architecture.' },
          { icon: '🗄️', title: 'Node + Express', desc: 'RESTful API backend with Express.js handling all CRUD operations.' },
          { icon: '🍃', title: 'MongoDB Atlas', desc: 'NoSQL database storing all team member documents with Mongoose ODM.' },
          { icon: '🖼️', title: 'Image Upload', desc: 'Multer-powered image upload saved to local uploads/ directory.' },
        ].map(f => (
          <div key={f.title} className="feature-card">
            <span className="feature-icon">{f.icon}</span>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
