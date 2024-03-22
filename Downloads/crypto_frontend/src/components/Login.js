import React from 'react'
import '../css/Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import priceContext from '../context/PriceContext';
import { useContext } from 'react';

export default function Login(props) {

  const context = useContext(priceContext);
    const { showAlert } = context;

    const navigate = useNavigate();
    const [credentials,setCredentials] = useState({email: "", password:""})

    async function handleSubmit(e){
        e.preventDefault();
        

        const response = await fetch(`https://backendcrypto.adaptable.app/api/auth/login`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
              
            },
            body: JSON.stringify({email: credentials.email,password: credentials.password})
    
          });
          console.log("login info");
          const json = await response.json();
          console.log(json);
          if(json.success){
            localStorage.setItem('token', json.authtoken)
            navigate('/');
            showAlert("Successfully Loged-In",'success','Thank You')
          }
          else{
            showAlert("Email-id or password is incorrect",'danger','Sorry')
          }
    
    }
    function onChange(e){
       
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }


  return (
    <div className="container_login">
        <div id="contain">
            <h2>Login to your Cryptocompass</h2>
            <hr id="line"/>
            <div className="myform">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 login_form">
                        <i className="fa-solid fa-envelope icon"></i>
                        <label htmlFor="exampleInputEmail1" className="form-label login_form" >Email address</label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp"
                            placeholder="Enter your email" value={credentials.email} onChange={onChange}/>
                        <div id="emailHelp">Test Email : test001@gmail.com</div>
                    </div>
                    <div className="mb-3 login_form">
                        <i className="fa-sharp fa-solid fa-key icon"></i>
                        <label htmlFor="exampleInputPassword1" className="form-label login_form">Password</label>
                        <input type="password" className="form-control" id="password" name='password'
                            placeholder="Enter your password" value={credentials.password} onChange={onChange}/>
                            <div id="emailHelp" >Password : admin123</div>
                    </div>

                    <button type="submit" className="btn btn-secondary">Submit</button>
                </form>

            </div>

        </div>



    </div>
  )
}
