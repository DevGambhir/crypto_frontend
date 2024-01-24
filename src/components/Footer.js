import React from 'react';
import {
    Link,
} from "react-router-dom";

export default function Footer() {
    return (
        <div className="container footer" style={{ padding: "0px", position: "absolute", bottom: "0" }}>
            <footer className="py-3 my-4" style={{ backgroundColor: "#002147" }}>
                <ul className="nav border-bottom pb-3 mb-3" style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                    <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">This is a demo version of website.</Link></li>

                    <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Made by Aryan Kumar.</Link></li>

                </ul>

                <p className="text-center text-muted">&copy; 2022 Company, Inc</p>
            </footer>
        </div>
    )
}

