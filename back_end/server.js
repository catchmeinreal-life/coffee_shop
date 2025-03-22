require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const cors = require("cors");

// const path = require("path");
// const { connectDB } = require("./config/database_config");


//config objects



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
let db = mysql.createConnection({  //import db
    host : process.env.HOST,
    user : process.env.USER, //mysql user name
    password : process.env.PASSWORD, //mysql password
    database : process.env.DATABASE
});

db.connect((err) => {  //db.connect()
    if (err) throw err;
    console.log("landed to the moon..");

    // try{
    //     let sql = 'CREATE DATABASE coffee_shop1;';
    //     db.query(sql);
    //     console.log('database created....');
    // }catch (err){
    //     console.log(err, 'error creating database')
    // };
    // try {
        
    //     let sql = ""
    
    //     con.end((err)=>{
    //         if(err) throw err;
    //     });
    // } catch(err){
    //     console.log(err.name);
    // }
})


//routes
app.get("/register", (req, res) => {
    res.render("register");
})

app.get("/login", (req, res) => {
    res.render("login");
})

//user REGESTRATION Endpoint
app.post("/register", async (req, res) => {

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

        //insert intO database
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

    } catch (error) {
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