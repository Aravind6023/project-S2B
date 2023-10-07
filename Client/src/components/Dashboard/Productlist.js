import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Productlist() {

    const[data,setData]=useState([])

    useEffect(()=>{
        fetch("http://localhost:3456/getproductdetails")
        .then(response => response.json())
        .then(details=>setData(details))
    },[])

    function handledelete(id){
        alert(id);
        var Deleteuser={
            id:id
        }

        alert(Deleteuser.id)

        axios.post("http://localhost:3456/delete",Deleteuser)
        .then((response)=>{
            if(response.data.status==="error"){
                alert("User is not deleted")
            }
            else if(response.data.status==="success"){
                alert("User is deleted")
            }
        })
    }
    return (
        <>
            <section className="container-fluid show-users bg-dark">
                <div className="row d-flex justify-content-center">
                <h1 className="text-center p-3">Product List</h1>
                    <div className="col-11 table-responsive">
                        <table className="table w-100">
                            <thead>
                                <tr>
                                    <th className="bg-transparent">Product Id</th>
                                    <th className="bg-transparent">Product Name</th>
                                    <th className="bg-transparent">Product Category</th>
                                    <th className="bg-transparent">Product Description</th>
                                    <th className="bg-transparent">Product Image</th>
                                    <th className="bg-transparent">Product Price</th>
                                    <th className="bg-transparent">Seller Phone Number</th>
                                    <th className="bg-transparent">Seller Id</th>
                                    <th className="bg-transparent">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((value, index) => (
                                        <>
                                            <tr key={index}>
                                                <td className="bg-transparent">{value.product_id}</td>
                                                <td className="bg-transparent">{value.product_name}</td>
                                                <td className="bg-transparent">{value.product_category}</td>
                                                <td className="bg-transparent">{value.product_description}</td>
                                                <td className="bg-transparent">
                                                    <img className="w-100" src={value.product_image}></img></td>
                                                <td className="bg-transparent">{value.product_price}</td>
                                                <td className="bg-transparent">{value.phone_number}</td>
                                                <td className="bg-transparent">{value.seller_id}</td>
                                                <td className="bg-transparent">
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