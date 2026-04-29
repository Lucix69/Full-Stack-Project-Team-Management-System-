import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './MemberDetailsPage.css';

const API_BASE = 'http://localhost:5000';

function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="info-row">
      <span className="info-label">{label}</span>
      <span className="info-value">{value}</span>
    </div>
  );
}

function MemberDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`/api/members/${id}`)
      .then(res => { setMember(res.data); setLoading(false); })
      .catch(err => {
        setError(err.response?.status === 404 ? 'Member not found.' : 'Failed to load member details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="page"><div className="spinner-wrap"><div className="spinner" /><span>Loading member details...</span></div></div>
  );
  if (error) return (
    <div className="page"><div className="alert alert-error">{error}</div><button className="btn btn-secondary" onClick={() => navigate('/view')}>← Back to Members</button></div>
  );
  if (!member) return null;

  const imgSrc = member.image ? `${API_BASE}/uploads/${member.image}` : null;
  const hobbies = Array.isArray(member.hobbies) ? member.hobbies : [];

  return (
    <div className="page details-page">
      <button className="back-btn" onClick={() => navigate('/view')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
        Back to Members
      </button>

      <div className="details-layout">
        {/* Left column: Photo + quick info */}
        <div className="details-sidebar">
          <div className="details-photo-wrap">
            {imgSrc ? (
              <img src={imgSrc} alt={member.name} className="details-photo" />
            ) : (
              <div className="details-avatar">{member.name.charAt(0).toUpperCase()}</div>
            )}
            <div className="details-glow" />
          </div>

          <div className="details-identity">
            <h1 className="details-name">{member.name}</h1>
            <span className="tag">{member.role}</span>
          </div>

          <div className="quick-info-card">
            <div className="quick-info-row">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <a href={`mailto:${member.email}`}>{member.email}</a>
            </div>
            <div className="quick-info-row">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              <span>Roll No. {member.rollNumber}</span>
            </div>
            <div className="quick-info-row">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              <span>{member.degree} · {member.year}</span>
            </div>
          </div>

          <div className="details-meta">
            <span className="tag tag-green">JADz Team</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text2)', fontFamily: 'var(--font-mono)' }}>
              Joined {new Date(member.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Right column: Details */}
        <div className="details-main">
          {member.aboutProject && (
            <section className="detail-section">
              <h2 className="detail-section-title">
                <span className="section-icon">🚀</span> About Project
              </h2>
              <p className="detail-text">{member.aboutProject}</p>
            </section>
          )}

          {member.aboutYourAim && (
            <section className="detail-section">
              <h2 className="detail-section-title">
                <span className="section-icon">🎯</span> Career Aim
              </h2>
              <p className="detail-text">{member.aboutYourAim}</p>
            </section>
          )}

          <section className="detail-section">
            <h2 className="detail-section-title">
              <span className="section-icon">📋</span> Academic Details
            </h2>
            <div className="info-table">
              <InfoRow label="Full Name" value={member.name} />
              <InfoRow label="Roll Number" value={member.rollNumber} />
              <InfoRow label="Degree" value={member.degree} />
              <InfoRow label="Year" value={member.year} />
              <InfoRow label="Email" value={member.email} />
              <InfoRow label="Role" value={member.role} />
              <InfoRow label="Certificate" value={member.certificate} />
              <InfoRow label="Internship" value={member.internship} />
            </div>
          </section>

          {hobbies.length > 0 && (
            <section className="detail-section">
              <h2 className="detail-section-title">
                <span className="section-icon">✨</span> Hobbies
              </h2>
              <div className="hobbies-wrap">
                {hobbies.map((h, i) => (
                  <span key={i} className="tag">{h}</span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemberDetailsPage;
