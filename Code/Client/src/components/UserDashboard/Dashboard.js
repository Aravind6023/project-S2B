import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";

export function Dashboard() {

    const { user_id } = useParams();

    //JS to get all the product from the product_table -- START
    const [product, setProduct] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3456/getall")
            .then((response) => response.json())
            .then((details) => setProduct(details));
    }, [user_id]);
    //JS to get all the product from the product_table -- END


    return (
        <>
            <main className="container-fluid product-dashboard bg-dark">
                <div className="row">
                    <section className="col-12 d-flex flex-column align-items-center">
                        <h1 className="text-center text-white py-4">Our Latest Products</h1>
                        <div className="row w-100 d-flex justify-content-evenly">
                            {product.map((value) => (
                                <>
                                    <div class="card col-10 col-md-5 col-lg-3 m-lg-3 my-3 d-flex align-items-center cus-card-bg-image border-0 rounded-4" style={{ backgroundImage: `url(${value.product_image})` }}>
                                        <Link to={`/itemdashboard/${user_id}/${value.seller_id}/${value.product_id}`} className="w-100 text-decoration-none">
                                            <div className="blur"></div>
                                            <div class="card-body text-white w-100">
                                                <h3 class="card-title">{value.product_name}</h3>
                                                <p className="card-text">{value.product_description}</p>
                                                <h2 class="card-price"><FontAwesomeIcon icon={faIndianRupeeSign} />{value.product_price}</h2>
                                            </div>
                                        </Link>
                                    </div>
                                </>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}