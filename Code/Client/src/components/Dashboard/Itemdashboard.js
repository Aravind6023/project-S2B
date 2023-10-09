import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export function Itemdashboard() {
    const { user_id, seller_id, product_id } = useParams();

    const [product_name, setproduct_name] = useState('');
    const [product_description, setproduct_description] = useState('');
    const [product_price, setproduct_price] = useState('');
    const [product_image, setproduct_image] = useState('');
    const [product_category, setproduct_category] = useState('');
    const [seller_contact_number, setseller_contact_number] = useState('');
    const [user_first_name, setUserFirstName] = useState('');
    const [user_last_name, setUserLastName] = useState('');

    function generateRandomId(length = 8) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomId = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomId += characters.charAt(randomIndex);
        }
        return randomId;
    }

    useEffect(() => {
        fetch(`http://localhost:3456/editoneuser/${user_id}`)
            .then(response => response.json())
            .then(details => {
                if (details.length > 0) {
                    setUserFirstName(details[0].first_name)
                    setUserLastName(details[0].last_name)
                }
                else{
                    alert("Can't fetch data");
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, [user_id]);


    useEffect(() => {
        fetch(`http://localhost:3456/getoneproduct/${product_id}`)
            .then(response => response.json())
            .then(details => {
                if (details.length > 0) {
                    setproduct_name(details[0].product_name)
                    setproduct_description(details[0].product_description)
                    setproduct_price(details[0].product_price)
                    setproduct_image(details[0].product_image)
                    setproduct_category(details[0].product_category)
                    setseller_contact_number(details[0].phone_number)
                } else {
                    alert("Product not found")
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, [product_id]);

    const alertuser = () => {
        alert("This ad has been reported");
    };

    const contact = (event) => {
        event.preventDefault();
        const phoneNumber = prompt("Please enter your 10-digit phone number:");

        if (phoneNumber === null) {
            console.log("User canceled the input.");
        } else {
            const pattern = /^\d{10}$/;
            if (pattern.test(phoneNumber)) {
                alert("Phone number has been added");
                var generateId = generateRandomId();

                var bookdetails = {
                    genid: generateId,
                    productName: product_name,
                    productCategory: product_category,
                    productDescription: product_description,
                    productPrice: product_price,
                    productImage: product_image,
                    sellerContactNumber: seller_contact_number,
                    userContactNumber: phoneNumber,
                    sellerId: seller_id,
                    userId: user_id,
                    userfname: user_first_name,
                    userlname: user_last_name
                }

                axios.post("http://localhost:3456/bookorder", bookdetails)
                    .then((response) => {
                        if (response.data.Status === "error") {
                            alert("Technical error")
                        } else if (response.data.Status === "Success") {
                            alert("The seller will contact you")
                        }
                    });
            } else {
                alert("Invalid input. Please enter a valid 10-digit phone number.");
            }
        }
    };

    return (
        <>
            <section className="cus-itemdashboard container-fluid d-flex flex-column justify-content-center bg-dark">
                <div className="row">
                    <div className="col-lg-6">
                        <img src={product_image} className="w-100 rounded-5" alt="Product_image" />
                    </div>
                    <div className="col-lg-6 d-flex flex-column justify-content-around">
                        <div>
                            <h1 className="py-3">{product_name}</h1>
                            <p>{product_description}</p>
                            <h3 className="py-3"><FontAwesomeIcon icon={faIndianRupeeSign} /> {product_price}</h3>
                        </div>
                        <div className="text-end">
                            <button className="btn mx-3 bg-success border-0" onClick={contact}><p className="mb-0 text-white">Contact this seller</p></button>
                            <button className="btn mx-3 bg-danger border-0" onClick={alertuser}><p className="mb-0"><FontAwesomeIcon icon={faCircleExclamation} className="px-2 text-white" />Report this ad!</p></button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
