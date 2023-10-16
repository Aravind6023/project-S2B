import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import logo from '../../assests/logo.jpg';

export function Register() {

    //calculate age by DOB -- START
    const [age, setAge] = useState('');

    const handleDobChange = (e) => {
        const inputDate = e.target.value;
        calculateAge(inputDate);
    };

    const calculateAge = (inputDate) => {
        const birthdate = new Date(inputDate);
        const currentDate = new Date();
        const ageInMilliseconds = currentDate - birthdate;
        const ageInYears = new Date(ageInMilliseconds).getUTCFullYear() - 1970;
        setAge(ageInYears);
    };
    //calculate age by DOB -- END


    //create random id -- START
    function generateRandomId(length = 8) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomId = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomId += characters.charAt(randomIndex);
        }
        return randomId;
    }
    //create random id -- END


    //SignUp for the user, seller -- START
    function handleregister(event) {
        event.preventDefault()
        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var dob = document.getElementById("dob").value;
        var gender = document.getElementById("gender").value;
        var age = document.getElementById("age").value;
        var role = document.getElementById("role").value;
        var generateId = generateRandomId();

        const currentDate = new Date(dob);
        const formattedDate = currentDate.toISOString().split('T')[0];


        var userdetails = {
            genid: generateId,
            fname: firstName,
            lname: lastName,
            email: email,
            password: password,
            dob: formattedDate,
            gender: gender,
            age: age,
            role: role
        }

        if ((role.toLowerCase() === 'user')) {
            axios.post("http://localhost:3456/createuser", userdetails)
                .then((response) => {
                    if (response.data.Status === "error") {
                        alert("Check the given data (or) User may already exist")
                    }
                    else if (response.data.Status === "Success") {
                        alert("User created successfully")
                        window.location.href = '/login'
                    }
                })
        }
        else if (role.toLowerCase() === 'seller') {
            axios.post("http://localhost:3456/createseller", userdetails)
                .then((response) => {

                    if (response.data.Status === "error") {
                        alert("Check the given data (or) User may already exist")
                        console.log("Seller no");
                    }
                    else if (response.data.Status === "Success") {
                        alert("User created successfully")
                        window.location.href = '/login'
                    }
                })
        }
        else {
            alert("Please check your details.");
        }
    }
    //SignUp for the user, seller -- END

    return (
        <>
            <main className='container-fluid'>
                <section className='row registerSection d-flex justify-content-center'>
                    <div className='col-12 logoContainer'>
                        <Link className='w-auto' to='/'><img className='rounded-circle logo my-3' src={logo} alt='logo'></img></Link>
                    </div>
                    <div class="col-12 signUpContainer d-flex justify-content-center align-items-center">
                        <div class="col-10 col-lg-4 col-md-5 form-wrapper p-4">
                            <h2 className='text-center'>Sign Up</h2>
                            <form onSubmit={handleregister} className='row d-flex justify-content-evenly'>
                                <div class="input-Container border-0 my-3 col-md-5">
                                    <input className='w-100' type="text" id='firstName' required />
                                    <label>First Name</label>
                                </div>
                                <div class="input-Container border-0 my-3 col-md-5">
                                    <input className='w-100' type="text" id='lastName' required />
                                    <label>Last Name</label>
                                </div>
                                <div class="input-Container border-0 my-3 col-md-5">
                                    <input className='w-100' type="text" id='email' required />
                                    <label>Email</label>
                                </div>
                                <div class="input-Container border-0 my-3 col-md-5">
                                    <input className='w-100' type="date" id='dob' onChange={handleDobChange} required />
                                    <label></label>
                                </div>
                                <div class="input-Container border-0 my-3 col-md-5">
                                    <input className='w-100' type="text" id='gender' required />
                                    <label>Gender</label>
                                </div>
                                <div class="input-Container border-0 my-3 col-md-5">
                                    <input className='w-100' type="text" id='age' defaultValue={age} required />
                                    <label>Age</label>
                                </div>
                                <div class="input-Container border-0 my-3 col-md-5">
                                    <input className='w-100' type="password" id='password' required />
                                    <label>Password</label>
                                </div>
                                <div class="input-Container border-0 my-3 col-md-5">
                                    <input className='w-100' type="text" id='role' placeholder='Enter user or seller' required />
                                </div>
                                <button className="text-white w-50 py-2 border-0 bg-danger" type="submit">Sign Up</button>
                                <div class="form-help d-flex justify-content-between align-items-center">
                                    <div class="remember-me py-3">
                                        <input type="checkbox" id="remember-me" />
                                        <label className='px-2 text-white-50' for="remember-me">Remember me</label>
                                    </div>
                                </div>
                                <p className="text-white">Already have an account? <Link className='text-decoration-none text-white-50' to="/login">Sign in now</Link></p>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}