import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file



const authenticateJWT = (req, res, next) => {
    let token = req.headers.authorization;

    if (token) {
         // Handle 'Bearer <token>' format
         if (token.startsWith('Bearer ')) {
            token = token.split(' ')[1];
        }

        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            req.user = user;
            next();
        });
    }else {
        res.sendStatus(401); // Unauthorized
    }
};

export default authenticateJWT;