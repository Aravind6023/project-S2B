import React, { useEffect, useState } from "react";
import logo from "../../assests/logo.jpg"
import { Link, useParams } from "react-router-dom";

export function SellerMenu() {

    //Global variables
    var {seller_id}=useParams();
    const[fname,setFname]=useState('');
    const[lname,setLname]=useState('');
    const [sellerid, setsellerid] = useState('');
    const [loading, setLoading] = useState(true);
    //Global variables

    //JS to fetch seller name -- START
    useEffect(() => {
      fetch(`http://localhost:3456/getoneseller/${seller_id}`)
        .then((data) => data.json())
        .then((response) => {
          if (response && response[0]) {
            setFname(response[0].first_name);
            setLname(response[0].last_name);
            setsellerid(response[0].seller_id);
            setLoading(false);
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching seller data:", error);
          setLoading(false);
        });
    }, [seller_id]);
    //JS to fetch seller name -- END

    const handleLogout = () => {
        window.location.href = "/login";
    };

      
    return (
        <>
            <main className="menu container-fluid bg-dark">
                <div className="row">
                    <section className="col-12 p-0">
                        <nav class="navbar navbar-expand-lg bg-transparent">
                            <div className="container-fluid">
                                <Link className="navbar-brand col-1" to={`/seller_home/${sellerid}`}><img className='rounded-circle logo col-12 col-lg-6' src={logo} alt="logo"></img></Link>
                                <button className="navbar-toggler bg-success" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                                    <ul className="navbar-nav mb-2 w-75 mb-lg-0 d-lg-flex align-items-lg-center justify-content-evenly">
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to={`/seller_home/${sellerid}`}>Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to={`/seller_edit/${sellerid}`}>Edit</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to={`/seller_products/${sellerid}`}>My Products</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to={`/seller_messages/${sellerid}`}>Messages</Link>
                                        </li>
                                        <li className="nav-item">
                                            <button className="bg-transparent border-0 text-white" onClick={handleLogout}>Logout</button>
                                        </li>
                                        <li>
                                            <h6 className="text-white m-0 py-3 p-lg-0">Welcome {fname} {lname}</h6>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </section>
                </div>
            </main>
        </>
    );
}