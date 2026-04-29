import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewMembersPage.css';

const API_BASE = 'http://localhost:5000';

function MemberCard({ member, onDelete }) {
  const navigate = useNavigate();
  const imgSrc = member.image ? `${API_BASE}/uploads/${member.image}` : null;

  return (
    <div className="member-card">
      <div className="member-card-img-wrap">
        {imgSrc ? (
          <img src={imgSrc} alt={member.name} className="member-card-img" />
        ) : (
          <div className="member-card-avatar">
            {member.name.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="member-card-role-badge">{member.role}</span>
      </div>
      <div className="member-card-body">
        <h3 className="member-card-name">{member.name}</h3>
        <p className="member-card-roll">
          <span className="label">Roll</span>
          <span>{member.rollNumber}</span>
        </p>
        <p className="member-card-email">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          {member.email}
        </p>
        <div className="member-card-actions">
          <button className="btn btn-ghost" onClick={() => navigate(`/members/${member._id}`)}>
            View Details →
          </button>
          <button className="btn-delete" onClick={() => onDelete(member._id)} title="Delete member">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function ViewMembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchMembers = () => {
    setLoading(true);
    axios.get('/api/members')
      .then(res => { setMembers(res.data); setLoading(false); })
      .catch(() => { setError('Failed to load members. Is the backend running?'); setLoading(false); });
  };

  useEffect(() => { fetchMembers(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this member from the team?')) return;
    try {
      await axios.delete(`/api/members/${id}`);
      setMembers(prev => prev.filter(m => m._id !== id));
    } catch {
      alert('Failed to delete member.');
    }
  };

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase()) ||
    m.rollNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="view-header">
        <div>
          <p className="page-subtitle">JADz · All Members</p>
          <h1 className="page-title">MEET OUR<br /><span className="title-highlight">AMAZING TEAM</span></h1>
          <div className="accent-line" />
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/add')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Add Member
        </button>
      </div>

      {/* Search bar */}
      <div className="search-bar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          placeholder="Search by name, role or roll number..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button className="search-clear" onClick={() => setSearch('')}>✕</button>
        )}
      </div>

      {loading && (
        <div className="spinner-wrap">
          <div className="spinner" />
          <span>Loading team members...</span>
        </div>
      )}

      {error && <div className="alert alert-error">{error}</div>}

      {!loading && !error && (
        <>
          <p className="member-count">
            Showing <strong>{filtered.length}</strong> of <strong>{members.length}</strong> member{members.length !== 1 ? 's' : ''}
          </p>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">👥</span>
              <h3>{search ? 'No results found' : 'No members yet'}</h3>
              <p>{search ? 'Try a different search term.' : 'Start by adding your first team member!'}</p>
              {!search && (
                <button className="btn btn-primary" onClick={() => navigate('/add')}>Add First Member</button>
              )}
            </div>
          ) : (
            <div className="members-grid">
              {filtered.map(m => (
                <MemberCard key={m._id} member={m} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ViewMembersPage;
