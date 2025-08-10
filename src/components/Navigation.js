import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🔗</span>
          URLShort
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/admin" 
            className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;