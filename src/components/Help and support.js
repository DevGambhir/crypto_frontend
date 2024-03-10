import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WhatsAppOutlined, HomeOutlined, BulbOutlined, FundOutlined } from '@ant-design/icons';

function HelpAndSupport() {
  const [isLoading, setIsLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [whatsAppNumber, setWhatsAppNumber] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Show loading indicator
      try {
        // Replace with your API call to fetch user contact information
        const response = await fetch('/api/user-contact-info');
        const data = await response.json();

        if (data.success) {
          setPhoneNumber(data.phoneNumber);
          setEmailAddress(data.emailAddress);
          setWhatsAppNumber(data.whatsAppNumber);
        } else {
          // Handle API errors gracefully, e.g., display an error message to the user
          console.error('Error fetching data:', data.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle general errors gracefully, e.g., display a generic error message to the user
      } finally {
        setIsLoading(false); // Hide loading indicator
      }
    };

    fetchData();
  }, []); // Run only once on component mount

  return (
    <div>
      <h1>Help and Support</h1>
        <h3>Need Help? We're Here for You!</h3>

        <p>Our customer service team is available 24/7 to help you with any questions or problems you may have</p>
        <p>You can reach us by phone, email, or WhatsApp.</p>
        <p>We understand you may have questions or feedback for our website. We encourage you to reach out to our support team! Here are three ways to
get in touch:</p>

   <p>1. Send Feedback: Let us know your thoughts and suggestions by using our convenient feedback form. Your input helps us improve your 
      experience.</p>
   <p>2. Contact Us by Email: For any questions or inquiries, feel free to send us an email at [dev.gambhir@cme.christuniversity.in]. We aim to respond to all 
      emails within 24 hours.</p>
   <p>3. Contact Us on WhatsApp: Connect with us directly on WhatsApp at [9837714777]. Our support team is available on WhatsApp during
      business hours to answer your questions quickly and easily.</p>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Phone Number: {"9837714777"}</p>
          <p>Email Address: {"devgambhir12@gmail.com"}</p>
          <p>WhatsApp Number: {"9837714777"}</p>
          <Link to="/">
            <WhatsAppOutlined/> WhatsApp
          </Link>
          <Link to="/faq">
            <BulbOutlined /> gmail
          </Link>
          <Link to="/donate">
            <FundOutlined /> Trade
          </Link>
        </>
      )}
    </div>
  );
}

export default HelpAndSupport;
