import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";

export function Sellerdashboard() {
    const { seller_id } = useParams();

    // Create a random id generator function
    function generateRandomId(length = 8) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomId = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomId += characters.charAt(randomIndex);
        }
        return randomId;
    }

    // State for storing product details
    const [details, setDetails] = useState([]);

    // Fetch product details on component mount
    useEffect(() => {
        axios.get(`http://localhost:3456/getonesellerproduct/${seller_id}`)
            .then(response => {
                const data = response.data;
                if (data.length > 0) {
                    setDetails(data);
                } else {
                    console.log("No products were added");
                    console.log(details)
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, [seller_id]);

    // Handle adding a new product
    function handleAddProduct(event) {
        event.preventDefault();
        const pname = document.getElementById("productName").value;
        const pcategory = document.getElementById("productCategory").value;
        const pdescription = document.getElementById("productDescription").value;
        const pprice = document.getElementById("productPrice").value;
        const pimage = document.getElementById("productImage").value;
        const mobileno = document.getElementById("mobileNumber").value;

        const genId = generateRandomId();

        const updatedetails = {
            product_id: genId,
            product_name: pname,
            product_category: pcategory,
            product_description: pdescription,
            product_price: pprice,
            product_image: pimage,
            phone_number: mobileno
        };

        axios.post(`http://localhost:3456/addproduct/${seller_id}`, updatedetails)
            .then(response => {
                if (response.data.status === 'success') {
                    alert('Product added successfully');
                } else {
                    alert('Failed to add product');
                }
            })
            .catch(error => {
                console.error(error);
                alert('An error occurred while adding the product');
            });
    }

    // Handle deleting a product
    const [deletionStatus, setDeletionStatus] = useState('');

    async function handleDeleteProduct(product_id) {
        try {
            const response = await axios.delete(`http://localhost:3456/deleteproduct/${product_id}`);

            if (response.data.status === "success") {
                setDeletionStatus("success");
                alert("Product was deleted");
                // You can choose to update the product list here as well
            } else {
                setDeletionStatus("error");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            setDeletionStatus("error");
        }
    }
    //JS function to delete a product in the database -- END

    return (
        <>
            <section className="container-fluid bg-dark seller-product">
                <div className="row d-flex justify-content-center">
                    <div className="col-10 mb-4">
                        <h1 className="py-4 text-center">Add your products</h1>
                        <form className="row fs-5 d-flex align-items-end justify-content-center" onSubmit={handleAddProduct}>
                            <div className="input-Container border-0 my-3 col-10 col-md-5">
                                <label>Product Name</label>
                                <input className='w-100 border-0 my-2 ps-3 py-2 rounded-3' type="text" id='productName' placeholder="Enter your product name" required />
                            </div>
                            <div className="input-Container border-0 my-3 col-10 col-md-5">
                                <label>Product Category</label>
                                <input className='w-100 border-0 my-2 ps-3 py-2 rounded-3' type="text" id='productCategory' placeholder="Enter your product category" required />
                            </div>
                            <div className="input-Container border-0 my-3 col-10 col-md-5">
                                <label>Product description</label>
                                <input className='w-100 border-0 my-2 ps-3 py-2 rounded-3' type="textarea" id='productDescription' placeholder="Enter your product description" required />
                            </div>
                            <div className="input-Container border-0 my-3 col-10 col-md-5">
                                <label>Product price</label>
                                <input className='w-100 border-0 my-2 ps-3 py-2 rounded-3' type="text" id='productPrice' placeholder="Enter your product price" required />
                            </div>
                            <div className="input-Container border-0 my-3 col-10 col-md-5">
                                <label>Product Image URL</label>
                                <input className='w-100 border-0 my-2 ps-3 py-2 rounded-3' type="text" id='productImage' placeholder="Enter your image URL" required />
                            </div>
                            <div className="input-Container border-0 my-3 col-10 col-md-5">
                                <label>Contact Number</label>
                                <input className='w-100 border-0 my-2 ps-3 py-2 rounded-3' type="text" id='mobileNumber' placeholder="Enter your phone number" required />
                            </div>
                            <div className="input-Container border-0 my-3 col-10 col-md-5">
                                <button type="submit" className="btn btn-danger w-100 py-2">Submit</button>
                            </div>
                        </form>
                    </div>
                    <h1 className="text-center py-4">My Products</h1>
                    {Object.keys(details).length > 0 ? (
                        details.map((value,index) => 
                            (
                            <div key={index} className="col-10 mb-5">
                            <div className="row rounded-5 bg-gradient">
                                <div className="col-lg-6 p-0">
                                    <img src={value.product_image} className="w-100 rounded-5" alt="Not yet added" />
                                </div>
                                <div className="col-lg-6 d-flex flex-column justify-content-around align-items-center">
                                    <div>
                                        <h1 className="py-3">{value.product_name}</h1>
                                        <h3>{value.product_description}</h3>
                                        <h5 className="py-3"><FontAwesomeIcon icon={faIndianRupeeSign} /> {value.product_price}</h5>
                                    </div>
                                    <div className="text-end">
                                    <button onClick={() => handleDeleteProduct(value.product_id)} className="btn btn-danger fs-5 border-0 my-2 ps-3 py-2 rounded-3">Delete my product</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))
                        ):(
                        <div className="col-10">
                            <h1 className="text-center">No products uploaded</h1>
                        </div>) 
}
                </div>
            </section>
        </>
    );
}