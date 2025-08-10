const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testAllFunctions() {
  console.log('🧪 Testing URL Shortener API Functions\n');
  
  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    try {
      const healthResponse = await axios.get(`${BASE_URL}/health`);
      console.log('✅ Health Check:', healthResponse.data);
    } catch (error) {
      console.log('❌ Health Check Failed:', error.message);
    }

    // Test 2: URL Shortening
    console.log('\n2. Testing URL Shortening...');
    try {
      const shortenResponse = await axios.post(`${BASE_URL}/api/shorten`, {
        originalUrl: 'https://www.google.com'
      });
      console.log('✅ URL Shortening:', shortenResponse.data);
      var shortCode = shortenResponse.data.shortCode;
    } catch (error) {
      console.log('❌ URL Shortening Failed:', error.response?.data || error.message);
    }

    // Test 3: Get All URLs (Admin)
    console.log('\n3. Testing Admin - Get All URLs...');
    try {
      const urlsResponse = await axios.get(`${BASE_URL}/api/urls`);
      console.log('✅ Get All URLs:', urlsResponse.data);
    } catch (error) {
      console.log('❌ Get All URLs Failed:', error.response?.data || error.message);
    }

    // Test 4: URL Redirection (if we got a short code)
    if (shortCode) {
      console.log('\n4. Testing URL Redirection...');
      try {
        // This will follow redirects
        const redirectResponse = await axios.get(`${BASE_URL}/${shortCode}`, {
          maxRedirects: 0,
          validateStatus: function (status) {
            return status >= 200 && status < 400; // Accept redirects
          }
        });
        console.log('✅ URL Redirection working (status:', redirectResponse.status, ')');
      } catch (error) {
        if (error.response && error.response.status === 302) {
          console.log('✅ URL Redirection working (302 redirect to:', error.response.headers.location, ')');
        } else {
          console.log('❌ URL Redirection Failed:', error.message);
        }
      }
    }

    // Test 5: Duplicate URL handling
    console.log('\n5. Testing Duplicate URL Handling...');
    try {
      const duplicateResponse = await axios.post(`${BASE_URL}/api/shorten`, {
        originalUrl: 'https://www.google.com'
      });
      console.log('✅ Duplicate URL Handling:', duplicateResponse.data);
    } catch (error) {
      console.log('❌ Duplicate URL Handling Failed:', error.response?.data || error.message);
    }

    // Test 6: Invalid URL
    console.log('\n6. Testing Invalid URL Handling...');
    try {
      const invalidResponse = await axios.post(`${BASE_URL}/api/shorten`, {
        originalUrl: ''
      });
      console.log('❌ Should have failed for empty URL');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('✅ Invalid URL Handling:', error.response.data);
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }

    // Test 7: Non-existent short code
    console.log('\n7. Testing Non-existent Short Code...');
    try {
      const nonExistentResponse = await axios.get(`${BASE_URL}/nonexistent`);
      console.log('❌ Should have failed for non-existent code');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('✅ Non-existent Short Code Handling:', error.response.data);
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }

    console.log('\n🎉 API Testing Complete!');

  } catch (error) {
    console.error('💥 General Error:', error.message);
  }
}

// Wait a moment for servers to start, then run tests
setTimeout(testAllFunctions, 3000);