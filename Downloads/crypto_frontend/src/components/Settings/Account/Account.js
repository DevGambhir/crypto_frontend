import React, { useState, useEffect } from 'react';
import PrimaryButton from '../../UI/PrimaryButton';
import { Form, Button, Input, Select, Space } from "antd";
import ReactCountryFlag from "react-country-flag";
import { countryCodeAndFlag, timezoneData } from '../Data/data';
import { getCitiesByCountryFn, getAllCountriesFn } from '../Utils/utils';


function Account() {

  const [userData, setUserData] = useState({
    name: "Dev Gambhir",
    emailId: "devgambhir@gmail.com",
    mobile: "9999999999",
    country: "India",
    city: "Bangalore",
    timezone: "Asia/Kolkata",
  });
  const [countries, setCountries] = useState([]);
  const [citiesByCountry, setCitiesByCountry] = useState([]);

  const onPersonalDetailsSubmit = (values) => {
    console.log("The values are", values);

    setUserData({
      name: values.fullname,
      emailId: values.emailId,
      mobile: values.mobile,
      country: values.country,
      city: values.city,
      timezone: values.timezone,
    });

  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
    const requestBody = {
      country: value,
    };

    getCitiesByCountryFn(requestBody).then((cities) => {
      setCitiesByCountry(cities);
    });
  };

  useEffect(() => {
    getAllCountriesFn().then((value) => {
      setCountries(value);
    });

    const requestBody = {
      country: userData.country,
    };

    getCitiesByCountryFn(requestBody).then((cities) => {
      setCitiesByCountry(cities);
    });


  }, []);


  return (
    <div className="bg-white rounded-[10px] p-[30px] w-[700px] ">

      <Form
        onFinish={onPersonalDetailsSubmit}
        variant="outlined"
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
        initialValues={{
          fullName: userData.name,
          emailId: userData.emailId,
          mobileNumber: userData.mobile,
          country: userData.country,
          city: userData.city,
          timezone: userData.timezone,
        }}
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
          <Input className="text-base font-normal h-[40px]" />
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
            <Input className="text-base font-normal h-[40px]" />
          </Form.Item>

          <Form.Item
            name="mobileNumber"
            label="Mobile Number"
            rules={[
              { required: true, message: "Mobile number is required" },
              { pattern: /^[0-9]+$/, message: "Please enter numbers only" },
              { max: 10, message: "Please enter a valid mobile number" }
            ]}
            className="font-medium text-primary w-full"
            style={{ marginBottom: 10 }}
          >
            <div className="flex gap-0 w-full">
              <Select
                optionLabelProp="label"
                options={countryCodeAndFlag}
                optionRender={(option) => (
                  <div className='h-[40px]'>
                    <ReactCountryFlag countryCode={option.data.emoji} svg />
                    {option.label}
                  </div>
                )}
                defaultValue={['+91']}
                style={{ width: 100, height: 40 }}
                dropdownStyle={{ width: 110 }}
                showSearch
                size='large'
              />
              <Input className="text-base font-normal h-[40px] w-full" />
            </div>
          </Form.Item>
        </div>

        <div className="flex flex-row gap-[30px] min-w-full">
          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: "Country name is required" }]}
            className="font-medium text-primary w-full"
            style={{ marginBottom: 10 }}
          >
            <Select
              options={countries}
              style={{ fontSize: 16, height: 40 }}
              size='large'
              showSearch
              onChange={onChange}
            />
          </Form.Item>

          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: "City is required" }]}
            className="font-medium text-primary w-full"
            style={{ marginBottom: 10 }}
          >
            <Select
              showSearch
              options={citiesByCountry}
              style={{ fontSize: 16, height: 40 }}
              size='large'
            />
          </Form.Item>
        </div>

        <Form.Item
          name="timezone"
          label="Timezone"
          rules={[{ required: true, message: "Timezone is required" }]}
          className="font-medium text-primary"
          style={{ marginBottom: 10 }}
        >
          <Select
            showSearch
            options={timezoneData}
            style={{ fontSize: 16, height: 40 }}
            size='large'
          />
        </Form.Item>

        <div className="flex flex-row justify-end mt-2">

          <Form.Item style={{ marginBottom: 0 }}>
            <PrimaryButton title={"Save"} />
          </Form.Item>

        </div>
      </Form>

    </div>
  )
}

export default Account
