import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

const SECRET_KEY = process.env.SECRET_KEYy;

const authenticateJWT = (req, res, next) => {
    // let token = req.headers.authorization; for json
    const token = req.cookies.token;


    if (token) {
         // Handle 'Bearer <token>' format
        //  if (token.startsWith('Bearer ')) {
        //     token = token.split(' ')[1];
        // }  for json

        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            req.user = user;
            next();
        });
    }else {
        res.redirect('/login'); // Redirect to login page if token is not present
        // res.render('login', { message: 'Please login to access this page.' });
        // res.sendStatus(401); // Unauthorized
    }
};

export default authenticateJWT;