const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mysql = require("mysql");

var expressfun = express()
expressfun.use(cors())
expressfun.use(bodyparser.json())
expressfun.use(express.json())
expressfun.use(bodyparser.urlencoded({ extended: true }))
expressfun.use(express.static("public"))

let db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "#1234@MYSQL@06",
    database: "s2b"
})

db.connect((error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("db connected");
    }
})

//create a user details in a user_table
expressfun.post("/createuser", (request, response) => {
    let { genid, fname, lname, email, password, dob, gender, age, role } = request.body;
    let createNewUser = "INSERT INTO user_details(user_id,first_name,last_name,email,password,dob,gender,age,role) values(?,?,?,?,?,?,?,?,?)";
    db.query(createNewUser, [genid, fname, lname, email, password, dob, gender, age, role], (error, result) => {
        if (error) {
            response.send({ "Status": "error" })
            console.log(error);
        }
        else {
            response.send({ "Status": "Success" })
            console.log(result);
        }
    })
});

//create a seller details in a seller_details
expressfun.post("/createseller", (request, response) => {
    let { genid, fname, lname, email, password, dob, gender, age, role } = request.body;
    let createNewUser = "INSERT INTO seller_details(seller_id,first_name,last_name,email,password,dob,gender,age,role) values(?,?,?,?,?,?,?,?,?)";
    db.query(createNewUser, [genid, fname, lname, email, password, dob, gender, age, role], (error, result) => {
        if (error) {
            response.send({ "Status": "error" });
            console.log(error);
        }
        else {
            response.send({ "Status": "Success" });
            console.log(result);
        }
    })
});

//login for the user.
expressfun.post("/loginuser", (request, response) => {
    let { email, password, role } = request.body
    console.log(email)
    console.log(password)
    console.log(role)
    let loginQuery = "SELECT * FROM user_details WHERE email=? AND password=? AND role=?";
    db.query(loginQuery, [email, password, role], (error, result) => {
        if (error) {
            response.send({ "Status": "error" })
            console.log("errors");
        }
        else if (result.length > 0) {
            let dbemail = result[0].email;
            let dbpassword = result[0].password;
            if (dbemail === email && dbpassword == password) {
                let id = result[0].user_id;
                let designation = result[0].role;
                response.send({ "Status": "Success", "id": id, "designation": designation })
            }
            else {
                response.send({ "status": "invalid" })
                console.log("invalid");
            }
        }
        else {
            response.send({ "status": "empty_set" })
            console.log("empty")
        }
    })
})

//login for the seller.
expressfun.post("/loginseller", (request, response) => {
    let { email, password, role } = request.body
    console.log(email)
    console.log(password)
    console.log(role)
    let loginQuery = "SELECT * FROM seller_details WHERE email=? AND password=? AND role=?";
    db.query(loginQuery, [email, password, role], (error, result) => {
        if (error) {
            response.send({ "Status": "error" })
            console.log("errors");
        }
        else if (result.length > 0) {
            console.log(`${result} is`)
            let dbemail = result[0].email;
            let dbpassword = result[0].password;
            if (dbemail === email && dbpassword == password) {
                let id = result[0].seller_id;
                let designation = result[0].role;
                console.log(id, designation)
                response.send({ "Status": "Success", "id": id, "designation": designation })
            }
            else {
                response.send({ "status": "invalid" })
                console.log(dbemail)
                console.log("invalid");
            }
        }
        else {
            response.send({ "status": "empty_set" })
            console.log("empty")
        }
    })
})

//login for the seller.
expressfun.post("/loginadmin", (request, response) => {
    let { email, password, role } = request.body
    let loginQuery = "SELECT * FROM admin WHERE admin_email=? AND admin_password=? AND role=?";
    db.query(loginQuery, [email, password, role], (error, result) => {
        if (error) {
            response.send({ "Status": "error" })
            console.log(error);
        }
        else if (result.length > 0) {
            let dbemail = result[0].admin_email;
            let dbpassword = result[0].admin_password;
            if (dbemail === email && dbpassword == password) {
                let id = result[0].admin_id;
                let designation = result[0].role;
                response.send({ "Status": "Success", "id": id, "designation": designation })
            }
            else {
                response.send({ "status": "invalid" })
            }
        }
        else {
            response.send({ "status": "empty_set" })
            console.log("empty")
        }
    })
})

//login for the individual user
expressfun.get("/getoneuser/:id", (request, response) => {
    let { id } = request.params
    let getQuery = "SELECT * FROM user_details WHERE user_id=?"
    db.query(getQuery, [id], (error, result) => {
        if (error) {
            response.send({ "status": "error" })
            console.send(error)
            alert(error)
        }
        else {
            response.send(result)
            console.log(result)
        }
    })
})

//login for the individual seller
expressfun.get("/getoneseller/:id", (request, response) => {
    let { id } = request.params;
    let getQuery = "SELECT * FROM seller_details WHERE seller_id=?";
    db.query(getQuery, [id], (error, result) => {
        if (error) {
            response.send({ "status": "error" })
            console.send(error)
        }
        else {
            response.send(result)
            console.log(result)
        }
    })
})

//login for the admin
expressfun.get("/getadmin/:id", (request, response) => {
    let { id } = request.params
    let getQuery = "SELECT * FROM admin WHERE admin_id=?"
    db.query(getQuery, [id], (error, result) => {
        if (error) {
            response.send({ "status": "error" })
            console.send(error)
            alert(error)
        }
        else {
            response.send(result)
            console.log(result)
        }
    })
})

//get all products
expressfun.get("/getall", (request, response) => {
    let selectQuery = "SELECT * FROM product_table";
    db.query(selectQuery, (error, result) => {
        if (error) {
            response.send(error)
            console.log(error)
        }
        else {
            response.send(result)
            console.log(result)
        }
    })
})

//get all products
expressfun.get("/getuserdetails", (request, response) => {
    let selectQuery = "SELECT * FROM user_details";
    db.query(selectQuery, (error, result) => {
        if (error) {
            response.send(error)
            console.log(error)
        }
        else {
            response.send(result)
            console.log(result)
        }
    })
})

//get all products
expressfun.get("/getsellerdetails", (request, response) => {
    let selectQuery = "SELECT * FROM seller_details";
    db.query(selectQuery, (error, result) => {
        if (error) {
            response.send(error)
            console.log(error)
        }
        else {
            response.send(result)
            console.log(result)
        }
    })
})

expressfun.get("/getproductdetails", (request,response) =>{
    let selectQuery = "SELECT * FROM product_table";
    db.query(selectQuery, (error, result) => {
        if (error) {
            response.send(error)
            console.log(error)
        }
        else {
            response.send(result)
            console.log(result)
        }
    })
})

//get a particular product
expressfun.get("/getoneproduct/:product_id", (request, response) => {
    let { product_id } = request.params;
    let getQuery = "SELECT * FROM product_table WHERE product_id=?"
    db.query(getQuery, [product_id], (error, result) => {
        if (error) {
            response.send({ "status": "error", message: "An error occurred while fetching the product." })
            console.send(error)
        }
        else {
            if (result.length > 0) {
                response.send(result)
                console.log(result)
            } else {
                response.send({ status: "not_found", message: "Product not found." });
            }
        }
    });
});


//get a particular product
expressfun.get("/getonesellerproduct/:seller_id", (request, response) => {
    let { seller_id } = request.params;
    let getQuery = "SELECT * FROM product_table WHERE seller_id=?"
    db.query(getQuery, [seller_id], (error, result) => {
        if (error) {
            response.send({ "status": "error", message: "An error occurred while fetching the product." })
            console.send(error)
        }
        else {
            if (result.length > 0) {
                response.send(result)
                console.log(result)
            } else {
                response.send({ status: "not_found", message: "Product not found." });
            }
        }
    });
});


expressfun.get("/editoneuser/:user_id", (request, response) => {
    let { user_id } = request.params
    console.log(user_id)
    let getQuery = "SELECT * FROM user_details WHERE user_id=?"
    db.query(getQuery, [user_id], (error, result) => {
        if (error) {
            console.error('Error querying the database:', error);
            response.send({ "status": "error", message: "Internal server error" });
        } else if (result.length === 0) {
            response.send({ status: 'not_found', message: 'Seller not found' })
        } else {
            response.send(result)
        }
    })
})

expressfun.get("/editoneseller/:seller_id", (request, response) => {
    let { seller_id } = request.params
    console.log(seller_id)
    let getQuery = "SELECT * FROM seller_details WHERE seller_id=?";
    db.query(getQuery, [seller_id], (error, result) => {
        if (error) {
            console.error('Error querying the database:', error);
            response.send({ "status": "error", message: "Internal server error" });
        } else if (result.length === 0) {
            response.send({ status: 'not_found', message: 'Seller not found' })
        } else {
            response.send(result)
        }
    })
})

expressfun.put('/updateuserdata/:user_id', (request, response) => {
    const { user_id } = request.params;
    const { first_name, last_name, email, dob, gender, age, password } = request.body;

    const updateQuery = 'UPDATE user_details SET first_name=?, last_name=?, email=?, dob=?, gender=?, age=?, password=? WHERE user_id=?';

    db.query(updateQuery, [first_name, last_name, email, dob, gender, age, password, user_id], (error, results) => {
        if (error) {
            console.error(error);
            response.send({ status: 'error', message: 'Failed to update data.' });
        } else {
            response.send({ status: 'success', message: 'Data updated successfully.' });
        }
    }
    );
});

expressfun.put('/updatesellerdata/:seller_id', (request, response) => {
    const { seller_id } = request.params;
    const { first_name, last_name, email, dob, gender, age, password } = request.body;

    const updateQuery = 'UPDATE seller_details SET first_name=?, last_name=?, email=?, dob=?, gender=?, age=?, password=? WHERE seller_id=?';

    db.query(updateQuery, [first_name, last_name, email, dob, gender, age, password, seller_id], (error, results) => {
        if (error) {
            console.error(error);
            response.send({ status: 'error', message: 'Failed to update data.' });
        } else {
            response.send({ status: 'success', message: 'Data updated successfully.' });
        }
    }
    );
});


expressfun.put('/updateproduct/:pid', (request, response) => {
    const { pid } = request.params;
    const { product_name, product_category, product_description, product_image, product_price, phone_number } = request.body;

    const updateQuery = 'UPDATE product_table SET product_name=?, product_category=?, product_description=?, product_image=?, product_price=?, phone_number=? WHERE product_id=?';

    db.query(updateQuery, [product_name, product_category, product_description, product_image, product_price, phone_number, pid], (error, results) => {
        if (error) {
            console.error(error);
            response.send({ status: 'error', message: 'Failed to update data.' });
        } else {
            response.send({ status: 'success', message: 'Data updated successfully.' });
        }
    });
});



expressfun.delete("/deleteuseradmin/:user_id", (request, response) => {

    const { user_id } = request.params;

    const deleteQuery = "DELETE FROM user_details WHERE user_id = ?";

    db.query(deleteQuery, [user_id], (error, result) => {
        if (error) {
            console.error("Error deleting user:", error);
            return response.send({ status: "error", message: "An error occurred while deleting the user." });
        }
        if (result.affectedRows === 0) {
            return response.send({ status: "not_found", message: "User not found." });
        }
        return response.send({ status: "success", message: "User deleted successfully." });
    });
});


expressfun.delete("/deleteselleradmin/:seller_id", (request, response) => {

    const { seller_id } = request.params;

    const deleteQuery = "DELETE FROM seller_details WHERE seller_id = ?";

    db.query(deleteQuery, [seller_id], (error, result) => {
        if (error) {
            console.error("Error deleting seller:", error);
            return response.send({ status: "error", message: "An error occurred while deleting the seller." });
        }
        if (result.affectedRows === 0) {
            return response.send({ status: "not_found", message: "seller not found." });
        }
        return response.send({ status: "success", message: "seller deleted successfully." });
    });
});

expressfun.delete("/deleteproduct/:product_id", (request, response) => {
    const { product_id } = request.params;
    const deleteQuery = "DELETE FROM product_table WHERE product_id = ?";

    db.query(deleteQuery, [product_id], (error, result) => {
        if (error) {
            console.error("Error deleting product:", error);
            return response.status(500).json({ status: "error", message: "An error occurred while deleting the product." });
        }
        if (result.affectedRows === 0) {
            return response.status(404).json({ status: "not_found", message: "Product not found." });
        }
        return response.status(200).json({ status: "success", message: "Product deleted successfully." });
    });
});

expressfun.post('/addproduct/:seller_id', (request, response) => {
    const sellerid = request.params.seller_id;
    const { product_id, product_name, product_category, product_description, product_price, product_image, phone_number } = request.body;

    const addProduct = 'INSERT INTO product_table (product_id, product_name, product_category, product_description, product_image, product_price, phone_number, seller_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(addProduct, [product_id, product_name, product_category, product_description, product_image, product_price, phone_number, sellerid], (error, results) => {
        if (error) {
            console.error('Error inserting data: ', error);
            response.send({ status: 'error', error: 'Error inserting data' });
        } else {
            response.send({ status: 'success', message: 'Product added successfully' });
        }
    });
});

//create a book details
expressfun.post("/bookorder", (request, response) => {
    let { genid, productName, productCategory, productDescription, productPrice, productImage, sellerContactNumber, userContactNumber, sellerId, userId, userfname, userlname } = request.body;
    let createNewUser = "INSERT INTO booking_details(booking_id,product_name,product_category,product_description,product_price, product_image,seller_contact_number,user_contact_number,seller_id,user_id,user_first_name,user_last_name) values(?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(createNewUser, [ genid, productName, productCategory, productDescription, productPrice, productImage, sellerContactNumber, userContactNumber, sellerId, userId, userfname, userlname], (error, result) => {
        if (error) {
            response.send({ "Status": "error" })
            console.log(error);
        }
        else {
            response.send({ "Status": "Success" })
            console.log(result);
        }
    })
});

expressfun.get("/getmessage/:seller_id", (request, response) => {
    const { seller_id } = request.params;
    const selectQuery = "SELECT * FROM booking_details WHERE seller_id=?";
    
    db.query(selectQuery, [seller_id], (error, result) => {
        if (error) {
            console.error(error);
            response.status(500).json({ error: "Internal server error" });
        } else {
            response.json(result);
        }
    });
});



expressfun.listen(3456, () => {
    console.log("Port is running");
})