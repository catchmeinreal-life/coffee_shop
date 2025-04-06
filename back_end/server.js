require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const mysql = require("mysql2");

// const DB = require('./config/database_config');

// const path = require("path");
const { DB } = require("./config/database_config");


//config objects

//---------------

const app = express();
const port = process.env.PORT ||6446;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ----
app.set("view engine", "ejs");
// app.search("views", path.join(__dirname, "front_end"));

//Serve static Files (css, mages, js)
// app.use(express.static(path.join(__dirname, "public")));

//database connection

// let db = mysql.createConnection({  //import db
//     host : process.env.HOST,
//     user : process.env.USER, //mysql user name
//     password : process.env.PASSWORD, //mysql password
//     database : process.env.DATABASE
// });

DB.connect((err) => {  //db.connect()
    if (err) throw err;
    console.log("landed to the moon..");
});


//routes

app.get("/", (req, res) =>{  //check if user is authenticated
    res.render('index');  
})

app.get("/login", (req, res) => {  //checkNotAuthenticated
    res.render("login");  // if not authenticated then render 'login' else render '/'
})

app.get("/register", (req, res) => { //checkNotAuthenticated if not then render this page if authenticated redirect to main page
    res.render("register");
})


//user REGESTRATION  and LOGIN Endpoint
app.post('/login', async (req, res)=>{
    const {email, password} = req.body;
/**
 * check if theres a user by that email in the db
 */
    try {
        //fetch user details from database
        const sql = `SELECT id, name, email, password FROM users WHERE email = ${email} `;

        db.query(sql,  (err, result) => {
            console.log(result.password);
            if (err) {
                console.error(err);
                // return res.status(500).json({
                //     message : "Database Error"
                // });
            } 
            res.status(200).json({
                message : "user login Successfully"
            });
        });
        
    } catch (error) {
       console.error('server error,,') ;
    }





})
app.post("/register", async (req, res) => { //check notAuthenticated

    const { name, email, password, gender} =req.body;
    if (!name || !email || !password || !gender) {
        return res.status(400).json({
            message : "All fields are required for Registration"
        });
    }

    //add to users

    try {
        //hash passsword  //create table Users
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //insert user details intO database
        const sql = "INSERT INTO users (name, email, password, gender) VALUES (?, ?, ?, ?)";

        db.query(sql, [name, email, hashedPassword, gender], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message : "Database Error"
                });
            } 
            res.status(201).json({
                message : "user Registered Successfully"
            });
        });
        // res.redirect('/login');
    } catch (error) { 
        res.redirect('/register');
        console.error("server error:", error)
        res.status(500).json({
            message : "server error",
            error
        });
    }
}); //

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})