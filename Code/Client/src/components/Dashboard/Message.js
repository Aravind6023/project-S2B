import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Message() {
    const { seller_id } = useParams();
    const [details, setDetails] = useState([]);

    useEffect(() => {
        // Define an async function to fetch data
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:3456/getmessage/${seller_id}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        setDetails(data);
                    } else {
                        console.log("No messages found");
                    }
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (error) {
                console.error(error);
            }
        }

        // Call the fetchData function
        fetchData();
    }, [seller_id]);

    return (
        <section className="container-fluid bg-dark text-white">
            <div className="row d-flex justify-content-center">
                <h1 className="text-center py-3">Messages</h1>
                {details.length > 0 ? (
                    <div className="col-10">
                        {details.map((value, index) => (
                            <div key={index} className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={value.product_image} className="img-fluid rounded-start" alt="No image" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{value.product_name}</h5>
                                            <p className="card-text">{value.product_description}</p>
                                            <p className="card-text">{value.product_price}</p>
                                            <h5>The user "{value.user_first_name} {value.user_last_name}" has contacted you</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="col-10">
                        <h1 className="text-center py-3">No messages from buyers</h1>
                    </div>
                )}
            </div>
        </section>
    );
}
