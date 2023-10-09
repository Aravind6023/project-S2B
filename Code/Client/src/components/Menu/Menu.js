import React, { useEffect, useState } from "react";
import logo from "../../assests/logo.jpg"
import { Link, useParams } from "react-router-dom";

export function Menu() {
    //Menu global variables -- START
    var { user_id } = useParams();
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [userid, setuserid] = useState('');
    const [loading, setLoading] = useState(true); // Added loading state
    //Menu global variables -- END

    //Menu JS to fetch particular user name using the id's -- START
    useEffect(() => {
        fetch(`http://localhost:3456/getoneuser/${user_id}`)
            .then(data => data.json())
            .then((response) => {
                if (response && response[0]) {
                    setFname(response[0].first_name);
                    setLname(response[0].last_name);
                    setuserid(response[0].user_id);
                    setLoading(false); // Data is loaded
                } else {
                    setLoading(false); // Data is not available, set loading to false
                }
            })
            .catch((error) => {
                console.error("Error fetching seller data:", error);
                setLoading(false); // Set loading to false in case of an error
            });
    }, [user_id])
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
                                            <Link className="nav-link text-white" to={`/user_home/${userid}`}>Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to={`/user_products/${userid}`}>Products</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to={`/user_edit/${userid}`}>Edit</Link>
                                        </li>
                                        <li className="nav-item">
                                            <button className="bg-transparent border-0 text-white" onClick={handleLogout}>Logout</button>
                                        </li>
                                        <li>
                                            <h6 className="text-white m-0">Welcome {fname} {lname}</h6>
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