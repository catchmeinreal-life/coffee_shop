import dotenv from 'dotenv';

import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';

import authenticateJWT from './middleware/authenticateJWT.js'; // Import the JWT authentication middleware

dotenv.config(); // Load environment variables from .env file


const app = express();
app.use(bodyParser.json());

const SECRET_KEY = process.env.SECRET_KEY;

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
            }, SECRET_KEY, {expiresIn: '1h'});

        res.json({auth: true, token});
        console.log(`${username} log in`);
        // res.redirect('/index');



    // } else if (user && !bcrypt.compareSync(password, user.password)) {
    //     res.status(401).json({auth: false, token: null});  //msg : invalid username or password 
        
    } else {
        console.log(`${username} attempted to log in`);
        res.status(401).json(
            {
                auth: false,
                token: null,
                message: 'Invalid username or password'
            });
    }
});



app.get('/index', authenticateJWT, (req, res) => {
    res.send(`Welcome to the index page, ${req.user.username}`);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
