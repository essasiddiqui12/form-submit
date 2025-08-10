import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/urls');
      setUrls(response.data);
    } catch (error) {
      setError('Failed to fetch URLs');
      console.error('Error fetching URLs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getTotalClicks = () => {
    return urls.reduce((total, url) => total + url.clicks, 0);
  };

  if (isLoading) {
    return (
      <div className="admin-panel">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-panel">
        <div className="container">
          <div className="error-message">{error}</div>
          <button onClick={fetchUrls} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="container">
        <h1>Admin Panel</h1>
        
        <div className="stats">
          <div className="stat-card">
            <h3>Total URLs</h3>
            <p className="stat-number">{urls.length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Clicks</h3>
            <p className="stat-number">{getTotalClicks()}</p>
          </div>
        </div>

        <div className="urls-table-container">
          <h2>All Shortened URLs</h2>
          {urls.length === 0 ? (
            <p className="no-urls">No URLs found</p>
          ) : (
            <div className="table-responsive">
              <table className="urls-table">
                <thead>
                  <tr>
                    <th>Original URL</th>
                    <th>Short Code</th>
                    <th>Clicks</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {urls.map((url) => (
                    <tr key={url._id}>
                      <td className="original-url">
                        <a 
                          href={url.originalUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          title={url.originalUrl}
                        >
                          {url.originalUrl.length > 50 
                            ? `${url.originalUrl.substring(0, 50)}...` 
                            : url.originalUrl
                          }
                        </a>
                      </td>
                      <td className="short-code">
                        <a 
                          href={`/${url.shortCode}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {url.shortCode}
                        </a>
                      </td>
                      <td className="clicks">
                        <span className="click-count">{url.clicks}</span>
                      </td>
                      <td className="created-at">
                        {formatDate(url.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <button onClick={fetchUrls} className="refresh-btn">
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;