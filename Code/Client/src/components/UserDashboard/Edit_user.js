import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Useredit() {

    //set user details -- START
    const { user_id } = useParams()
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')
    const [password, setPassword] = useState('')

    //JS to fetch a particular user using the user_id to display the data in the input fields -- START
    useEffect(() => {
        fetch(`http://localhost:3456/editoneuser/${user_id}`)
            .then(data => data.json())
            .then((response) => {
                setFname(response[0].first_name)
                setLname(response[0].last_name)
                setEmail(response[0].email)
                setGender(response[0].gender)
                setAge(response[0].age)
                setPassword(response[0].password)
                const formatDOB = (dob) => {
                  const currentDate = new Date(dob);
                  return currentDate.toISOString().split('T')[0];
              };
              setDob(formatDOB(response[0].dob))
            })
    }, [user_id])
    //JS to fetch a particular user using the user_id to display the data in the input fields -- END
    //set user details -- END

    //JS Function to update the user by getting the values -- START
    function handleupdate(event) {
        event.preventDefault()
        var fname = document.getElementById("firstName").value
        var lname = document.getElementById("lastName").value
        var email = document.getElementById("email").value
        var dob = document.getElementById("dob").value
        var gender = document.getElementById("gender").value
        var age = document.getElementById("age").value
        var password = document.getElementById("password").value
        
        var updatedetails = {
            first_name: fname,
            last_name: lname,
            email: email,
            dob: dob,
            gender: gender,
            age: age,
            password: password
        }
        if (!fname) {
            alert("Enter the fname")
        }
        else {
            axios.put(`http://localhost:3456/updateuserdata/${user_id}`, updatedetails)
            .then(response => {
                if (response.data.status === 'success') {
                  alert('Data updated successfully');
                } else {
                  alert('Failed to update data');
                }
              })
              .catch(error => {
                console.error(error);
                alert('An error occurred while updating the product');
              });
        }
      }
      //JS Function to update the user by getting the values -- END

      
      //JS Function to delete a user by using the id -- START
      const [deletionStatus, setDeletionStatus] = useState('');

      const handleDeleteUser = async () => {
        try {
          const response = await fetch(`http://localhost:3456/deleteuser/${user_id}`, {
            method: "DELETE",
          });
    
          if (response.status === "error") {
            setDeletionStatus("error");
            alert("User not available");
          } else {
            setDeletionStatus("success");
            alert("User deleted");
            window.location.href="/login";
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          setDeletionStatus("error");
        }
      }
      //JS Function to delete a user by using the id -- START


    return (
        <>
            <section className="container-fluid edit_profile bg-dark d-flex align-items-center">
                <div>
                    <form className="row fs-5 d-flex align-items-end justify-content-center" onSubmit={handleupdate}>
                        <div className="input-Container border-0 my-3 col-10 col-md-5">
                            <label>First Name</label>
                            <input className='w-100 border-0 my-2 ps-3 py-2 rounded-3' type="text" id='firstName' value={fname} onChange={(updatedata) => { setFname(updatedata.target.value) }}  required />
                        </div>
                        <div className="input-Container border-0 my-3 col-10 col-md-5">
                            <label>Last Name</label>
                            <input className='w-100 border-0 my-2 ps-3 py-2 rounded-3' type="text" id='lastName' value={lname} onChange={(updatedata) => { setLname(updatedata.target.value) }}  required />
                        </div>
                        <div className="input-Container border-0 my-3 col-10 col-md-5">
                            <label>Email</label>
                            <input className='w-100 border-0 my-2 ps-3 py-2 rounded-3' type="text" id='email' value={email} required />
                        </div>
                        <div className="input-Container border-0 my-3 col-10 col-md-5">
                            <label>Date of Birth</label>
                            <input className='w-100 border-0 my-2 ps-3 py-2 rounded-3' type="text" id='dob' value={dob} placeholder="YYYY-MM-DD"  onChange={(updatedata) => { setDob(updatedata.target.value) }}  required />
                        </div>
                        <div className="input-Container border-0 my-3 col-10 col-md-5">
                            <label>Gender</label>
                            <input className='w-100 border-0 my-2 ps-3 py-2 rounded-3' type="text" id='gender' value={gender} onChange={(updatedata) => { setGender(updatedata.target.value) }}  required />
                        </div>
                        <div className="input-Container border-0 my-3 col-10 col-md-5">
                            <label>Age</label>
                            <input className='w-100 border-0 my-2 ps-3 py-2 rounded-3' type="text" id='age' value={age} onChange={(updatedata) => { setAge(updatedata.target.value) }}  required />
                        </div>
                        <div className="input-Container border-0 my-3 col-10 col-md-5">
                            <label>Password</label>
                            <input className='w-100 border-0 my-2 ps-3 py-2 rounded-3' type="text" id='password' value={password} onChange={(updatedata) => { setPassword(updatedata.target.value) }}  required />
                        </div>
                        <div className="my-3 col-10 col-md-5 d-flex flex-wrap justify-content-evenly">
                        <button type="submit" className="btn btn-success fs-5 border-0 my-2 ps-3 py-2 rounded-3">Update</button>
                        <button onClick={handleDeleteUser} className="btn btn-danger fs-5 border-0 my-2 ps-3 py-2 rounded-3">Delete account</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
    }