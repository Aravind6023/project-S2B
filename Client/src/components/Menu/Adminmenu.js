import React, { useEffect, useState } from "react";
import logo from "../../assests/logo.jpg"
import { Link, useParams } from "react-router-dom";

export function Adminmenu() {
    // Menu global variables -- START
    var { admin_id } = useParams();
    console.log(admin_id);
    const [fname, setFname] = useState('');
    const [adminid, setAdminId] = useState('');
    const [loading, setLoading] = useState(true); // Added loading state
    // //Menu global variables -- END

    // //Menu JS to fetch particular user name using the id's -- START
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3456/getadmin/${admin_id}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data[0]) {
                        setFname(data[0].admin_email);
                        setAdminId(data[0].admin_id);
                    }
                } else {
                    console.error("Error fetching admin data:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching admin data:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [admin_id]);  
    //Menu JS to fetch particular user name using the id's -- END  
    
    
    //Menu JS function to logout
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
                                <Link className="navbar-brand" to="/userhome/:id"><img className='rounded-circle logo' src={logo} alt="logo"></img></Link>
                                <button className="navbar-toggler bg-success" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                                    <ul className="navbar-nav mb-2 w-75 mb-lg-0 d-lg-flex align-items-lg-center justify-content-evenly">
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to={`/homepage/${adminid}`}>Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to={`/users/${adminid}`}>Users</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to={`/sellers/${adminid}`}>Sellers</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to={`/products/${adminid}`}>Products</Link>
                                        </li>
                                        <li className="nav-item">
                                            <button className="bg-transparent border-0 text-white" onClick={handleLogout}>Logout</button>
                                        </li>
                                        <li>
                                            <h6 className="text-white m-0">Welcome {fname}</h6>
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