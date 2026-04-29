import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddMemberPage from './pages/AddMemberPage';
import ViewMembersPage from './pages/ViewMembersPage';
import MemberDetailsPage from './pages/MemberDetailsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddMemberPage />} />
            <Route path="/view" element={<ViewMembersPage />} />
            <Route path="/members/:id" element={<MemberDetailsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
