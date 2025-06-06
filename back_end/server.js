import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

const SECRET_KEY = process.env.SECRET_KEYy; // 


import express from 'express';

const app = express();

import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';

//user notification
import flash from 'connect-flash'; // Flash messages for user notifications
import session from 'express-session'; // Session management for flash messages

//use session and flash middleware
app.use(session({
    secret: process.env.SECRET_KEYy,
    resave: false,
    saveUninitialized: true,
}));

app.use(flash()); // Initialize flash messages

//cookie for storing token
import cookieParser from 'cookie-parser';

// Middleware

import authenticateJWT from './middleware/authenticateJWT.js'; // Import the JWT authentication middleware


import ejs from 'ejs';
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', 'views'); // Set the views directory for EJS templates
app.use(express.static('public')); // Serve static files from the "public" directory

app.use(bodyParser.urlencoded({ extended: true }));// Middleware to parse URL-encoded data

app.use(cookieParser()); //storing token on the browser

import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// import { error } from 'console';


// Middleware to parse JSON data
app.use(bodyParser.json());



// Mock database
const users = [
    {
        id: 1,
        username: 'eric',
        email: 'ericmatutu125@gmail.com',
        password: bcrypt.hashSync('password1', 8),
    },
    {
        id: 2,
        username: 'user2',
        email: 'ericbreezy6455@gmail.com',
        password: bcrypt.hashSync('password2', 8),
    }
];
// console.log(users[0].password)

//routes

app.get('/login', (req, res)=>{
    
    //check if user is already logged in by checking the cookie
    if (req.cookies.token) {
        return res.redirect('/index'); // Redirect to index page if token is present >>logged in
    }
    res.render('login', {
        error: req.flash('error'), // Pass flash error message to the login page
        messages: req.flash('success'), // Pass flash success message to the login page
    });  //if not logged in, render the login page
})

/**Store the token as a cookie in /login */
app.post('/login', (req, res) => {
    const {username, password} = req.body;
    const user = users.find(u => u.username === username); //sql query


    // const user = users.find(u => u.username === username && u.password === password); //sql query
    // const user = users.find(u => u.username === username && bcrypt.compareSync(u.password, password)); //sql query

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username
            }, SECRET_KEY, {expiresIn: '1h'}
        ); 
        res.cookie('token', token, { //send token as cookie or redirect
            httpOnly: true,
            maxAge: 36000000, // 1 hour
        });

        res.redirect('/index');
        // res.json({auth: true, token});
        console.log(`${username} logged in`);


    // } else if (user && !bcrypt.compareSync(password, user.password)) {
    //     res.status(401).json({auth: false, token: null});  //msg : invalid username or password 
        
    } else {
        res.status(401).render('login', { // Render the login page with an error message
            error : 'Invalid credentials',
            messages: {}
        }); 
        console.log(`${username} attempted to log in`);
        // res.status(401).json(
        //     {
        //         auth: false,
        //         token: null,
        //         message: 'Invalid username or password'
        //     });
    }
});



app.get('/index', authenticateJWT, (req, res) => {
    res.render('index', {
        user: req.user, // Pass the user object data to the index page
        messages: req.flash('success'), // Pass flash success message to the index page
    }); 
    // res.json({message: 'Welcome to the index page', user: req.user});
    // res.send(`Welcome to the index page, ${req.user.username}`);
});

//logout
app.get('/logout', authenticateJWT, (req, res) => {

    res.clearCookie('token'); // Clear the cookie
    req.flash('success', 'Logged out successfully'); // Set flash message
    res.redirect('/login'); // Redirect to the login page
    // res.json({message: 'Logged out successfully'});
    // res.send('Logged out successfully');
    // console.log(`${req.user.username} logged out`); >>add that message
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
