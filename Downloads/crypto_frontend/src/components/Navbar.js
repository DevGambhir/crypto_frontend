import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Alert from "./Alert";
import priceContext from '../context/PriceContext';
import { useContext } from 'react';
import '../css/Navbar.css';



export default function Navbar() {

  const navigate = useNavigate();
  const context = useContext(priceContext);
  const { alert } = context;

  function handlelogout() {
    localStorage.removeItem('token')
    navigate('/login')

  }
  return (
    <>
    <div>


   
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand displayRight" to="/">Cryptocompass</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                           
              <li className="nav-item">
                <Link className="nav-link displayRight" to="/cryptocurrency/watchlist">Your Watchlist</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link displayRight Dhidden" to="/cryptocurrency">Cryptocurrencies</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link displayRight Dhidden" to="/news">News</Link>
              </li>
              
              
            </ul>

            {!localStorage.getItem('token') ?

              <form className="d-flex" role="search">
                <Link className="btn btn-light btn-sm mx-2 boldText" to="/login" role="button" style={{fontWeight:"500"}} >Log In</Link>
                <Link className="btn btn-light btn-sm mx-1 boldText" to="/signup" role="button" style={{fontWeight:"500"}} >Sign Up</Link>
              </form> :
              <button className="btn btn-light btn-sm mx-2 boldText" onClick={handlelogout} style={{fontWeight:"500"}}>Log Out</button>

            }

          </div>
        </div>
      </nav>
    
    <Alert alert={alert}/>
    </div>
    
    </>
  );
}
