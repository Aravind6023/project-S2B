import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assests/logo.jpg';


export function Homemenu() {
    return (
        <>
            <nav className="navbar w-100 navbar-expand-lg position-absolute">
                <div className="container-fluid">
                    <Link className="navbar-brand"><img className='rounded-circle logo' src={logo}></img></Link>
                    <button className="navbar-toggler bg-success" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/login">Log In</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/register">Sign Up</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}