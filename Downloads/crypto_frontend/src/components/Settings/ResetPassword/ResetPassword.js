import React, { useState } from 'react';
import { Form, Button, Input, Select, Space } from "antd";
import PrimaryButton from '../../UI/PrimaryButton';

function ResetPassword() {

  const [userData, setUserData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const onFinish = (values) => {
    setUserData({
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    });
  };


  return (
    <div className="bg-white rounded-[10px] p-[30px] w-[700px] ">

      <Form
        name="resetPassword"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        style={{ minWidth: '100%' }}
        requiredMark={false}
        initialValues={{
          newPassword: userData.name,
          confirmPassword: userData.emailId,
        }}
      >
        <Form.Item
          label="New Password"
          name="newPassword"
          style={{ marginBottom: 20 }}
          rules={[
            {
              required: true,
              message: (
                <div className=" font-normal text-[10px] text-red-500 mt-1">
                  Please input your new password!
                </div>
              ),
            },
          ]}
          validateTrigger="onBlur"
          className="font-medium text-primary"
        >
          <Input.Password placeholder="Enter your confirm password" className="text-base font-normal h-[40px]" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["newPassword"]}
          style={{ marginBottom: 20 }}
          rules={[
            {
              required: true,
              message: (
                <div className=" font-normal text-[10px] text-red-500 mt-1">
                  Please confirm your password!
                </div>
              ),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
          validateTrigger="onBlur"
          className="font-medium text-primary"
        >
          <Input.Password placeholder="Enter your confirm password" className="text-base font-normal h-[40px]" />
        </Form.Item>

        <div className="flex flex-row justify-end mt-2">

          <Form.Item style={{ marginBottom: 0 }}>
            <PrimaryButton title={'Reset Password'} />
          </Form.Item>

        </div>

      </Form>

    </div>
  )
}

export default ResetPassword
