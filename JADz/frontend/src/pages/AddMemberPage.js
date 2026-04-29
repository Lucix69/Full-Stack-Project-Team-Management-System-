import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddMemberPage.css';

const initialForm = {
  name: '', role: '', email: '', rollNumber: '',
  year: '', degree: 'B.Tech', aboutProject: '',
  hobbies: '', certificate: '', internship: '', aboutYourAim: '',
};

function AddMemberPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
  const [serverMsg, setServerMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    if (errors.image) setErrors(prev => ({ ...prev, image: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.role.trim()) errs.role = 'Role is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.rollNumber.trim()) errs.rollNumber = 'Roll number is required';
    if (!form.year.trim()) errs.year = 'Year is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setStatus('loading');
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (image) data.append('image', image);

      await axios.post('/api/members', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setStatus('success');
      setServerMsg('Member added successfully!');
      setTimeout(() => navigate('/view'), 1800);
    } catch (err) {
      setStatus('error');
      setServerMsg(err.response?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setImage(null);
    setPreview(null);
    setErrors({});
    setStatus(null);
  };

  return (
    <div className="page add-page">
      <div className="page-header">
        <p className="page-subtitle">Team · JADz</p>
        <h1 className="page-title">Add Member</h1>
        <div className="accent-line" />
      </div>

      <div className="add-layout">
        {/* Left: Image preview */}
        <div className="add-sidebar">
          <div className="img-upload-box">
            {preview ? (
              <img src={preview} alt="Preview" className="img-preview" />
            ) : (
              <div className="img-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.3">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <span>Photo Preview</span>
              </div>
            )}
          </div>
          <label className="upload-btn-label">
            <input type="file" accept="image/*" onChange={handleImage} className="file-hidden" />
            <span className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Upload Photo
            </span>
          </label>
          {errors.image && <p className="error-msg">{errors.image}</p>}

          <div className="sidebar-info">
            <h4>Guidelines</h4>
            <ul>
              <li>Use a professional photo</li>
              <li>JPG, PNG, WebP formats</li>
              <li>Max file size: 5MB</li>
              <li>Fields marked with * are required</li>
            </ul>
          </div>
        </div>

        {/* Right: Form */}
        <div className="add-form-wrap">
          {status === 'success' && <div className="alert alert-success">✅ {serverMsg}</div>}
          {status === 'error' && <div className="alert alert-error">❌ {serverMsg}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-section">
              <h3 className="form-section-title">Personal Info</h3>
              <div className="grid-2">
                <div className="form-group">
                  <label>Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" className={errors.name ? 'error' : ''} />
                  {errors.name && <p className="error-msg">{errors.name}</p>}
                </div>
                <div className="form-group">
                  <label>Role *</label>
                  <input name="role" value={form.role} onChange={handleChange} placeholder="e.g. Frontend Developer" className={errors.role ? 'error' : ''} />
                  {errors.role && <p className="error-msg">{errors.role}</p>}
                </div>
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="student@srmist.edu.in" className={errors.email ? 'error' : ''} />
                {errors.email && <p className="error-msg">{errors.email}</p>}
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label>Roll Number *</label>
                  <input name="rollNumber" value={form.rollNumber} onChange={handleChange} placeholder="RA2211003010XXX" className={errors.rollNumber ? 'error' : ''} />
                  {errors.rollNumber && <p className="error-msg">{errors.rollNumber}</p>}
                </div>
                <div className="form-group">
                  <label>Year *</label>
                  <input name="year" value={form.year} onChange={handleChange} placeholder="e.g. 2024" className={errors.year ? 'error' : ''} />
                  {errors.year && <p className="error-msg">{errors.year}</p>}
                </div>
              </div>
              <div className="form-group">
                <label>Degree</label>
                <input name="degree" value={form.degree} onChange={handleChange} placeholder="B.Tech" />
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">Academic & Achievements</h3>
              <div className="form-group">
                <label>About Project</label>
                <textarea name="aboutProject" value={form.aboutProject} onChange={handleChange} placeholder="Briefly describe your project..." />
              </div>
              <div className="form-group">
                <label>Hobbies (comma separated)</label>
                <input name="hobbies" value={form.hobbies} onChange={handleChange} placeholder="Reading, Coding, Music..." />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label>Certificate</label>
                  <input name="certificate" value={form.certificate} onChange={handleChange} placeholder="e.g. AWS Cloud Practitioner" />
                </div>
                <div className="form-group">
                  <label>Internship</label>
                  <input name="internship" value={form.internship} onChange={handleChange} placeholder="e.g. TCS, Infosys..." />
                </div>
              </div>
              <div className="form-group">
                <label>About Your Aim</label>
                <textarea name="aboutYourAim" value={form.aboutYourAim} onChange={handleChange} placeholder="What are your career goals?" />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
              <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <><span className="btn-spinner" /> Submitting...</>
                ) : (
                  <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg> Add Member</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMemberPage;
