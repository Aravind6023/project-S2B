import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';


export function Home() {
    //NO JS function because its landing page.
    return (
        <>
            <main className="container-fluid p-0">
                <div className='row w-100 mx-0'>
                    <section className='home-Bg-Image min-vh-100 col-12 home-Content p-0' id='top'>
                        <div className='about d-flex justify-content-center align-items-center h-100'>
                            <section className='col-10 d-flex justify-content-center align-items-center py-5 text-center' id="about">
                                <div className="about-container d-flex flex-column justify-content-evenly">
                                    <h1>Welcome to S2B - Your Ultimate Marketplace</h1>
                                    <h3 className='py-2'>Please, fill out the for below to be notified for the latest products!</h3>
                                    <form role="form" className="php-email-form">
                                        <div className="row g-2 py-3 justify-content-center">
                                            <div className="col-md-4 col-lg-5 form-group pr-md-1">
                                                <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                                            </div>
                                            <div className="col-md-4 col-lg-5 form-group pl-md-1">
                                                <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                                            </div>
                                        </div>
                                        <div className="text-center"><button className='btn bg-danger my-3' type="submit">Notify me!</button></div>
                                    </form>
                                </div>
                            </section>
                        </div>
                    </section>
                    <sectoin className='px-5 landing-page'>
                        <div className=''>
                            <div className='row'>
                                <div className='col-12 d-flex flex-column align-items-center py-5'>
                                    <div className='row g-4'>
                                        <div className='col-12 col-md-6'>
                                            <img className='w-100 h-100 rounded-5' src='https://images.pexels.com/photos/3307862/pexels-photo-3307862.jpeg?auto=compress&cs=tinysrgb'></img>
                                        </div>
                                        <div className='col-12 col-md-6 d-flex flex-column justify-content-evenly'>
                                            <h1 className='pb-1'>Shop with Confidence</h1>
                                            <h4>Got items you no longer need? Turn them into cash! S2B provides a user-friendly platform for sellers to list their products. It's as easy as snap, list, and sell. Plus, our secure payment system ensures you receive your earnings hassle-free.</h4>
                                            <ul className='list-unstyled'>
                                                <h4>
                                                    <li className='py-1'><FontAwesomeIcon className='px-3' icon={faCheckDouble} />With S2B, decluttering your space and earning extra money has never been simpler.</li>
                                                    <li className='py-1'><FontAwesomeIcon className='px-3' icon={faCheckDouble} />We connect buyers and sellers in a seamless online marketplace designed for your convenience.</li>
                                                    <li className='py-1'><FontAwesomeIcon className='px-3' icon={faCheckDouble} />Join our community today and start selling your items with ease on S2B!</li></h4>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <h2 className='text-center py-4'>Why Choose Us?</h2>
                                    <div className='row justify-content-evenly'>
                                        <div className='col-12 col-md-3 d-flex'>
                                            <div class="card">
                                                <img src="https://images.pexels.com/photos/39584/censorship-limitations-freedom-of-expression-restricted-39584.jpeg?auto=compress&cs=tinysrgb" class="card-img-top" alt="no image" />
                                                <div class="card-body d-flex flex-column align-items-center justify-content-between">
                                                    <h5 class="card-title">Safety First</h5>
                                                    <p class="card-text">We prioritize your safety. Secure messaging system and verified user profiles give you peace of mind when interacting with others.</p>
                                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12 col-md-3 d-flex'>
                                            <div class="card">
                                                <img src="https://images.pexels.com/photos/7412072/pexels-photo-7412072.jpeg?auto=compress&cs=tinysrgb" class="card-img-top" alt="no image" />
                                                <div class="card-body d-flex flex-column align-items-center justify-content-between">
                                                    <h5 class="card-title">Local and Global</h5>
                                                    <p class="card-text">Whether you want to buy or sell locally or expand your reach globally, we've got you covered.</p>
                                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12 col-md-3 d-flex'>
                                            <div class="card">
                                                <img src="https://images.pexels.com/photos/1250452/pexels-photo-1250452.jpeg?auto=compress&cs=tinysrgb&w=600" class="card-img-top" alt="no image" />
                                                <div class="card-body d-flex flex-column align-items-center justify-content-between">
                                                    <h5 class="card-title">Support</h5>
                                                    <p class="card-text">Our dedicated support team is here to assist you every step of the way, ensuring your success.</p>
                                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 py-5'>
                                    <div className='row'>
                                        <div className='col-12 col-md-8'>
                                            
                                        </div>
                                        <div className='col-12 col-md-4'>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </sectoin>
                    <section className='product mb-5 d-flex flex-column justify-content-center align-items-center'>
                        <h1 className='py-5'>Our Latest Products</h1>
                        <div id="carouselExampleInterval" className="carousel slide w-75" data-bs-ride="carousel" data-bs-interval="2000">
                            <div class="carousel-inner h-100 rounded-5">
                                <div class="carousel-item active">
                                    <div className='carousel-card1 d-flex align-items-center justify-content-evenly'>
                                        <div class="card mb-3">
                                            <div class="row g-0">
                                                <div class="col-4">
                                                    <img className='w-100 h-100 p-1' src='https://images.pexels.com/photos/2676096/pexels-photo-2676096.jpeg?auto=compress&cs=tinysrgb&w=600' alt='no Image'></img>
                                                </div>
                                                <div class="col-8 d-flex align-items-center">
                                                    <div class="card-body">
                                                        <h5 class="card-title">Mitsubishi</h5>
                                                        <p class="card-text d-none d-md-block">Selling My Well-Maintained Diesel Pajero Sport GSR - Low Mileage, Excellent Condition. Contact me for details!.</p>
                                                        <p class="card-text d-none d-md-block"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                                                        <button className='btn bg-danger'>View</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <div className='carousel-card2 d-flex align-items-center justify-content-evenly'>
                                        <div class="card mb-3">
                                            <div class="row g-0">
                                                <div class="col-4">
                                                    <img className='w-100 h-100 p-1' src='https://images.pexels.com/photos/819805/pexels-photo-819805.jpeg?auto=compress&cs=tinysrgb' alt='no Image'></img>
                                                </div>
                                                <div class="col-8 d-flex align-items-center">
                                                    <div class="card-body">
                                                        <h5 class="card-title">BMW</h5>
                                                        <p class="card-text d-none d-md-block">Selling My BMW R75/5 nerboruta Bike - Excellent Condition, Low Mileage. Contact me for more details!.</p>
                                                        <p class="card-text d-none d-md-block"><small class="text-body-secondary">Last updated 1 hour ago</small></p>
                                                        <button className='btn bg-danger'>View</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <div className='carousel-card3 d-flex align-items-center justify-content-evenly'>
                                        <div class="card mb-3">
                                            <div class="row g-0">
                                                <div class="col-4">
                                                    <img className='w-100 h-100 p-1' src='https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg?auto=compress&cs=tinysrgb' alt='no Image'></img>
                                                </div>
                                                <div class="col-8 d-flex align-items-center">
                                                    <div class="card-body">
                                                        <h5 class="card-title">Nikon</h5>
                                                        <p class="card-text d-none d-md-block">Nikon Camera Lens for Sale: Nikon AF-S NIKKOR 50mm f/1.8G - Excellent Condition, Ideal for Photography. Contact me for more details!.</p>
                                                        <p class="card-text d-none d-md-block"><small class="text-body-secondary">Last updated 2 days ago</small></p>
                                                        <button className='btn bg-danger'>View</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                        <button className='btn rounded-3 bg-danger my-5'><Link to="/login" className='text-decoration-none text-black'>View all our products</Link></button>
                    </section>
                    <div className='bottom-50 position-fixed'>
                        <Link className='p-3 bg-dark rounded-circle text-warning' to='/top'><FontAwesomeIcon className='fs-5' icon={faArrowUp} /></Link>
                    </div>
                </div>
                <footer className="footer bg-dark text-white-50">
                <div className="container">
                    <div className="row py-5">
                        <div className="col-md-4">
                            <h5>Contact Us</h5>
                            <address>
                                S2B<br/>
                                006 Main Street<br/>
                                Coimbatore, Tamilnadu - 35<br/>
                                Phone: 9865321047<br/>
                                Email: <a className='text-white-50' href="mailto:info@example.com">s2b@gmail.com</a>
                            </address>
                        </div>
                        <div class="col-md-2">
                            <h5>Quick Links</h5>
                            <ul class="list-unstyled">
                                <li><a  className='text-white-50' href="#">Home</a></li>
                                <li><a className='text-white-50' href="#">About Us</a></li>
                                <li><a className='text-white-50' href="#">Services</a></li>
                                <li><a className='text-white-50' href="#">Products</a></li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                        <h6>Join our vibrant community of buyers and sellers today and experience the future of online commerce! Start exploring now and make S2B your go-to destination for all your buying and selling needs.</h6>
                        <h6 className='py-2'>Ready to get started? Sign up now and embark on a journey of endless possibilities.</h6>
                        </div>
                    </div>
                </div>
                </footer>
            </main>
        </>
    );
}