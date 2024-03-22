import React, { useState, useEffect } from 'react';
import ContactUs from './HelpandSupport/ContactUs/ContactUs';
import FAQs from './HelpandSupport/FAQs/FAQs';
import { Divider } from 'antd';




function HelpAndSupport() {
  const [isLoading, setIsLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [whatsAppNumber, setWhatsAppNumber] = useState('');

  const [showFAQs, setShowFAQs] = useState(true);


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
    <div className=' px-12 flex flex-row '>

      <div>
        <p className='text-3xl font-semibold'>Help and Support</p>
        {
          showFAQs ?

            <FAQs /> :

            <ContactUs />
        }
      </div>

      <div className=' ml-[120px] '>

        <div>
        <p onClick={() => { setShowFAQs(true) }} className=' cursor-pointer text-base font-semibold' >FAQs</p>
        <p onClick={() => { setShowFAQs(false) }} className=' cursor-pointer text-base font-semibold'>Contact Us</p>
        </div>
      </div>

    </div>
  );
}

export default HelpAndSupport;

{/* {isLoading ? (
  <p>Loading...</p>
) : (
  <>
    <p>Phone Number: {"9837714777"}</p>
    <p>Email Address: {"devgambhir12@gmail.com"}</p>
    <p>WhatsApp Number: {"9837714777"}</p>
    <Link to="/">
      <WhatsAppOutlined /> WhatsApp
    </Link>
    <Link to="/faq">
      <BulbOutlined /> gmail
    </Link>
    <Link to="/donate">
      <FundOutlined /> Trade
    </Link>
  </>
)} */}