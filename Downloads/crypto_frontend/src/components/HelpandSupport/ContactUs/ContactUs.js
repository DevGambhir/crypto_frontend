import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import PrimaryButton from '../../UI/PrimaryButton';

function ContactUs() {
    return (
        <div className=' w-[800px]'>

            <div>

                <p className='text-xl font-semibold'>
                    Contact Us
                </p>

            </div>

            <div>
                <h3>Need Help? We're Here for You!</h3>

                <p>Our customer service team is available 24/7 to help you with any questions or problems you may have</p>
                <p>You can reach us by phone, email, or WhatsApp.</p>
                <p>We understand you may have questions or feedback for our website. We encourage you to reach out to our support team! Here are three ways to
                    get in touch:</p>

                <p>1. Send Feedback: Let us know your thoughts and suggestions by using our convenient feedback form. Your input helps us improve your
                    experience.</p>
                <p>2. Contact Us by Email: For any questions or inquiries, feel free to send us an email at [dev.gambhir@cme.christuniversity.in]. We aim to respond to all
                    emails within 24 hours.</p>
                <p className=' text-base font-bold'>3. Contact Us on WhatsApp: Connect with us directly on WhatsApp at [9837714777]. Our support team is available on WhatsApp during
                    business hours to answer your questions quickly and easily.</p>
            </div>

            <div>
                <Form
                    variant="outlined"
                    autoComplete="off"
                    layout="vertical"
                    style={{ marginTop: 20 }}
                    requiredMark={false}
                >
                    <Form.Item
                        name="fullName"
                        label="Full Name"
                        rules={[
                            {
                                type: "string",
                                required: true,
                                message: "Please enter a valid name",
                            },
                            {
                                max: 50,
                                message: "Name can only be less than 50 character",
                                warningOnly: true,
                            },
                        ]}
                        className="font-medium text-primary"
                        style={{ marginBottom: 10 }}
                    >
                        <Input className="text-base font-normal h-[40px]" style={{borderRadius: 6}} />
                    </Form.Item>

                    <div className="flex flex-row gap-[30px] min-w-full">
                        <Form.Item
                            name="emailId"
                            label="Email ID"
                            rules={[
                                { required: true, message: "Email is required" },
                                { type: "email", message: "Please enter a valid email" },
                            ]}
                            validateTrigger="onBlur"
                            className="font-medium text-primary w-full"
                            style={{ marginBottom: 10 }}
                        >
                            <Input className="text-base font-normal h-[40px]" style={{borderRadius: 6}} />
                        </Form.Item>

                        <Form.Item
                            name="mobileNumber"
                            label="Mobile Number"
                            rules={[
                                { required: true, message: "Mobile number is required" },
                                { pattern: /^[0-9]+$/, message: "Please enter numbers only" },
                            ]}
                            className="font-medium text-primary w-full"
                            style={{ marginBottom: 10 }}
                        >
                            <Input className="text-base font-normal h-[40px]" style={{borderRadius: 6}} />
                        </Form.Item>

                    </div>

                    <div className="flex flex-row w-full justify-end mt-5">
                        

                            <Form.Item style={{ marginBottom: 0 }}>
                                <PrimaryButton title={"Submit"} />
                            </Form.Item>
                       
                    </div>
                </Form>
            </div>


        </div>
    )
}

export default ContactUs
