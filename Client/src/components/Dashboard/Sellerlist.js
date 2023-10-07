import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Sellerlist() {

    const[data,setData]=useState([])

    useEffect(()=>{
        fetch("http://localhost:3456/getsellerdetails")
        .then(response => response.json())
        .then(details=>setData(details))
    },[])

    function handledelete(id){

        var Deleteseller={
            id:id
        }

        axios.delete(`http://localhost:3456/deleteselleradmin/${Deleteseller.id}`)
        .then((response)=>{
            if(response.data.status==="error"){
                alert("You can't delete the data of the sellers due to some privileges made by admin.")
            }
            else if(response.data.status==="success"){
                alert("Seller is deleted")
            }
        })
    }
    

    const formatDOB = (dob) => {
        const currentDate = new Date(dob);
        return currentDate.toISOString().split('T')[0];
    };
    return (
        <>
            <section className="container-fluid show-users bg-dark">
                <div className="row d-flex justify-content-center">
                    <div className="col-11 table-responsive">
                        <h1 className="text-center p-3">Seller List</h1>
                        <table className="table w-100">
                            <thead>
                                <tr>
                                    <th className="bg-transparent">First Name</th>
                                    <th className="bg-transparent">last Name</th>
                                    <th className="bg-transparent">E-Mail</th>
                                    <th className="bg-transparent">Password</th>
                                    <th className="bg-transparent">Date</th>
                                    <th className="bg-transparent">Gender</th>
                                    <th className="bg-transparent">Age</th>
                                    <th className="bg-transparent">Id</th>
                                    <th className="bg-transparent">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((value, index) => (
                                        <>
                                            <tr key={index}>
                                                <td className="bg-transparent">{value.first_name}</td>
                                                <td className="bg-transparent">{value.last_name}</td>
                                                <td className="bg-transparent">{value.email}</td>
                                                <td className="bg-transparent">{value.password}</td>
                                                <td className="bg-transparent">{formatDOB(value.dob)}</td>
                                                <td className="bg-transparent">{value.gender}</td>
                                                <td className="bg-transparent">{value.age}</td>
                                                <td className="bg-transparent">{value.seller_id}</td>
                                                <td className="bg-transparent">
                                                <Link to={`/sellersupdate/${value.seller_id}`} className="btn btn-success mx-1 mb-1">Update</Link>
                                                <button className="btn btn-danger mx-1 mb-1" onClick={() => { handledelete(value.seller_id) }}>Delete</button>
                                                </td>
                                            </tr>
                                        </>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
}