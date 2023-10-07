import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import logo from '../../assests/logo.jpg';

export function Login() {

    //Login for both user -- START
    function handlelogin(event) {
        event.preventDefault()
        var email = document.getElementById("email").value
        var password = document.getElementById("password").value
        var role = document.getElementById("role").value

        var loginDetails = {
            email: email,
            password: password,
            role: role
        }

        let apiUrl = '';

        if (role.toLowerCase() === 'user') {
            apiUrl = 'http://localhost:3456/loginuser';
        } else if (role.toLowerCase() === 'seller') {
            apiUrl = 'http://localhost:3456/loginseller';
        } else if (role.toLowerCase() === 'admin')
        {
            apiUrl = 'http://localhost:3456/loginadmin';
        }
        else {
            alert("Please enter a valid role user or seller");
        }

        axios.post(apiUrl, loginDetails).then((response) => {
                const { Status, designation, id } = response.data;

                if (Status === 'Success') {
                    if (designation === 'user') {
                        window.location.href = `/user_home/${id}`;
                    }
                    else if (designation === 'seller') {
                        window.location.href = `/seller_home/${id}`;
                    }
                    else if (designation === 'admin') {
                        window.location.href = `/homepage/${id}`;
                    }
                    else if (Status === 'invalid') {
                        alert('Invalid email or password');
                    }
                    else if (Status === 'empty_set') {
                        alert('User does not exist');
                    }
                    else
                    {
                        alert('Contact Admin');
                    }
                }});
    };
    //Login for both user -- END


    return (
        <>
            <main className='container-fluid'>
                <section className='row logInSection d-flex justify-content-center'>
                    <div className='col-12 logoContainer'>
                        <Link className='w-auto' to='/'><img className='rounded-circle logo my-3' src={logo} alt='logo'></img></Link>
                    </div>
                    <div class="col-12 signInContainer d-flex justify-content-center align-items-center">
                        <div class="col-12 col-lg-4 col-md-5 form-wrapper p-5">
                            <h2 className='text-center'>Sign In</h2>
                            <form onSubmit={handlelogin} className=''>
                                <div class="form-control border-0 my-3">
                                    <input type="text" id='email' required />
                                    <label>Email</label>
                                </div>
                                <div class="form-control border-0 my-3">
                                    <input type="password" id='password' required />
                                    <label>Password</label>
                                </div>
                                <div class="form-control border-0">
                                    <input type="text" id='role' required />
                                    <label>Role</label>
                                </div>
                                <small className='text-white'>Enter "User" or "seller"</small>

                                <button className="text-white w-100 py-2 border-0 bg-danger mt-3" type="submit">Sign In</button>
                                <div class="form-help d-flex justify-content-between align-items-center">
                                    <div class="remember-me py-3">
                                        <input type="checkbox" id="remember-me" />
                                        <label className='px-2 text-white-50' for="remember-me">Remember me</label>
                                    </div>
                                    <Link className='text-decoration-none text-white' to="#">Need help?</Link>
                                </div>
                            </form>

                            <p className="text-white">New to S2B? <Link className='text-decoration-none text-white text-white-50' to="/register">Sign up now</Link></p>
                            <small className="text-white-50">
                                This page is protected by Google reCAPTCHA to ensure you're not a bot.
                                <Link to="#">Learn more.</Link>
                            </small>
                        </div>
                    </div>

                </section>
            </main>
        </>
    );
}