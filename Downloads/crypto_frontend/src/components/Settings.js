import React, { useState, useEffect } from 'react';
import Account from './Settings/Account/Account';
import ResetPassword from './Settings/ResetPassword/ResetPassword';
import Notification from './Settings/Notification/Notification';

function Settings() {
  const [theme, setTheme] = useState('light'); // Current theme
  const [showAccount, setShowAccount] = useState(true);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showNotification, setShowNotification] = useState(false);


  // useEffect(() => {
  //   // Fetch language details using suitable API (e.g., Google Translate API)
  //   const fetchLanguageDetails = async () => {
  //     try {
  //       // Replace with your preferred API call and implement error handling
  //       const response = await fetch('https://translation.googleapis.com/language/translate/v2/detect', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer API_KEY`, // Replace with your API key
  //         },
  //         body: JSON.stringify({
  //           q: 'Please translate this text.', // Placeholder, replace with actual text
  //           targetLanguageCode: 'en', // Target language (optional)
  //         }),
  //       });

  //       const data = await response.json();

  //       if (data.translations) {
  //         setLanguage(data.translations[0].detectedLanguage.language);
  //       } else {
  //         console.error('Error fetching language:', data.error);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching language:', error);
  //     }
  //   };

  //   fetchLanguageDetails();
  // }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleThemeToggle = () => {
    toggleTheme();

    // theme api
  };

  return (
    <div className=' px-12 flex flex-row '>

      <div>
        <p className='text-3xl font-semibold'>Help and Support</p>
        
        {
          showAccount && <Account/>
        }
        {
          showResetPassword && <ResetPassword/>
        }
        {
          showNotification && <Notification/>
        }
      </div>
      <div className=' ml-[120px] '>
        <div>
        <p onClick={() => { setShowAccount(true); setShowNotification(false); setShowResetPassword(false)}} className=' cursor-pointer text-base font-semibold' >Account</p>
        <p onClick={() => { setShowAccount(false); setShowNotification(false); setShowResetPassword(true)}} className=' cursor-pointer text-base font-semibold'>Reset Password</p>
        <p onClick={() => { setShowAccount(false); setShowNotification(true); setShowResetPassword(false)}} className=' cursor-pointer text-base font-semibold'>Notification</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;