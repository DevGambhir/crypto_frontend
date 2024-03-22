import React from 'react';
import { Collapse } from 'antd';

function FAQs() {
    const { Panel } = Collapse;

const text1 = `
Answer: To create an account, simply navigate to the homepage and click on the "Sign Up" button located at the top-right corner of the screen. Follow the instructions to provide your email address, create a password, and complete the registration process.

`;

const text2 = `
Answer: If you've forgotten your password, you can easily reset it by clicking on the "Forgot Password" link on the login page. Enter the email associated with your account, and we'll send you a link to reset your password.

`;

const text3 = `
Answer: To add cryptocurrencies to your watchlist, navigate to the "Watchlist" section in the sidebar menu. Click on the "Add to Watchlist" button next to the cryptocurrency you want to track. You can then view all your watched cryptocurrencies in one convenient location.

`;

const text4 = `
Answer: If you encounter any technical difficulties or issues while using our website, please reach out to our support team by clicking on the "Help and Support" option in the sidebar menu. You can submit a support ticket detailing the problem you're facing, and our team will assist you as soon as possible.

`;

const text5 = `
Answer: If you have any additional questions or require further assistance beyond the FAQs, you can contact our customer support team by clicking on the "Help and Support" option in the sidebar menu. From there, you can access our contact information and reach out to us via email or live chat for personalized support.

`;



  return (
    <div className=' w-[800px] '>

        <div>

            <p className='text-xl font-semibold'>
                FAQs
            </p>

        </div>
        <Collapse defaultActiveKey={['1']} style={{ borderRadius: 8}}>
          <Panel header="How do I create an account on your website?" key="1" >
            <p>{text1}</p>
          </Panel>
          <Panel header="I forgot my password. How can I reset it?" key="2">
            <p>{text2}</p>
          </Panel>
          <Panel header="How do I add cryptocurrencies to my watchlist?" key="3">
            <p>{text3}</p>
          </Panel>
          <Panel header="I'm experiencing issues with the website. What should I do?" key="4">
            <p>{text4}</p>
          </Panel>
          <Panel header="How can I contact customer support for further assistance?" key="5">
            <p>{text5}</p>
          </Panel>
        </Collapse>
      </div>
  )
}

export default FAQs
