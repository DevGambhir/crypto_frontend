import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HomeOutlined, BulbOutlined, FundOutlined } from '@ant-design/icons';

function Settings() {
  const [theme, setTheme] = useState('light'); // Current theme
  const [language, setLanguage] = useState(''); // Detected language

  useEffect(() => {
    // Fetch language details using suitable API (e.g., Google Translate API)
    const fetchLanguageDetails = async () => {
      try {
        // Replace with your preferred API call and implement error handling
        const response = await fetch('https://translation.googleapis.com/language/translate/v2/detect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer API_KEY`, // Replace with your API key
          },
          body: JSON.stringify({
            q: 'Please translate this text.', // Placeholder, replace with actual text
            targetLanguageCode: 'en', // Target language (optional)
          }),
        });

        const data = await response.json();

        if (data.translations) {
          setLanguage(data.translations[0].detectedLanguage.language);
        } else {
          console.error('Error fetching language:', data.error);
        }
      } catch (error) {
        console.error('Error fetching language:', error);
      }
    };

    fetchLanguageDetails();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleThemeToggle = () => {
    toggleTheme();

    // theme api
  };

  return (
    <div>
      <Link to="/">
        <HomeOutlined />
      </Link>
      <Link to="/settings">
        <BulbOutlined onClick={handleThemeToggle} />
      </Link>
      <Link to="/settings">
        <FundOutlined />
      </Link>
      <style>{`
        body {
          background-color: ${theme === 'dark' ? '#fff' : '#333'};
        }
      `}</style>
      <p>Detected language: {language || 'Unknown'}</p>
      {/* min working */}
    </div>
  );
}

export default Settings;
