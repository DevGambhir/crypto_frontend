import React from 'react';
import '../css/Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import priceContext from '../context/PriceContext';
import { useContext } from 'react';

export default function Signup() {

    const context = useContext(priceContext);
    const { showAlert } = context;

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: "", email: "", password: "", cpassword:""})

    async function handleSubmit(e) {
        e.preventDefault();
        

        if(credentials.password === credentials.cpassword){

            const response = await fetch(`https://backendcrypto.adaptable.app/api/auth/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
    
                },
                body: JSON.stringify({ name: credentials.username, email: credentials.email, password: credentials.password })
    
            });
            console.log("signup info");
            const json = await response.json();
            console.log(json);
            if (json.success) {
                localStorage.setItem('token', json.authtoken)
                navigate('/');
                showAlert("Account created successfully",'success','Thank you')
            }
            else if(json.error1){
                showAlert("Sorry, this email is already registered.",'danger','Sorry')

            }
            else {
                showAlert("Please enter in correct format",'danger','Error')
            }
        }
        else{
            showAlert("Please confirm the same password",'danger','Warning')
        }





    }
    function onChange(e) {

        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="container_login" style={{marginBottom:"20px"}}>
            <div id="contain">
                <h2>Sign-Up to the Note's App</h2>
                <hr id="line" />
                <div className="myform">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <i className="fa-solid fa-user icon"></i>
                            <label htmlFor="exampleInputPassword1" className="form-label login_form">Username</label>
                            <input type="text" className="form-control" id="username" name='username'
                                placeholder="Please enter a username" value={credentials.username} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <i className="fa-solid fa-envelope icon"></i>
                            <label htmlFor="exampleInputEmail1" className="form-label login_form" >Email address</label>
                            <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp"
                                placeholder="Please enter a email" value={credentials.email} onChange={onChange} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <i className="fa-sharp fa-solid fa-key icon"></i>
                            <label htmlFor="exampleInputPassword1" className="form-label login_form">Password</label>
                            <input type="password" className="form-control" id="password" name='password'
                                placeholder="Please enter a password" value={credentials.password} onChange={onChange} minLength={5} required/>
                        </div>
                        <div className="mb-3">
                            <i className="fa-sharp fa-solid fa-key icon"></i>
                            <label htmlFor="exampleInputPassword1" className="form-label login_form">Confirm Password</label>
                            <input type="password" className="form-control" id="cpassword" name='cpassword'
                                placeholder="Please confirm the password" value={credentials.cpassword} onChange={onChange} minLength={5} required/>
                        </div>

                        <button type="submit" className="btn btn-secondary">Submit</button>
                    </form>

                </div>

            </div>



        </div>
    )
}
