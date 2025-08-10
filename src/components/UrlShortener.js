import React, { useState } from 'react';
import axios from 'axios';
import '../styles/UrlShortener.css';

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!originalUrl) {
      setError('Please enter a URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(originalUrl);
    } catch {
      setError('Please enter a valid URL');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/api/shorten', {
        originalUrl
      });
      
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      setError(error.response?.data?.error || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setOriginalUrl('');
    setShortUrl('');
    setError('');
    setCopied(false);
  };

  return (
    <div className="url-shortener">
      <div className="container">
        <h1>URL Shortener</h1>
        <p className="subtitle">Shorten your long URLs with ease</p>
        
        <form onSubmit={handleSubmit} className="url-form">
          <div className="input-group">
            <input
              type="text"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Enter your long URL here..."
              className="url-input"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="shorten-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Shortening...' : 'Shorten'}
            </button>
          </div>
        </form>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {shortUrl && (
          <div className="result">
            <h3>Your shortened URL:</h3>
            <div className="short-url-container">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="short-url-input"
              />
              <button 
                onClick={copyToClipboard}
                className="copy-btn"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <button onClick={reset} className="reset-btn">
              Shorten Another URL
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlShortener;