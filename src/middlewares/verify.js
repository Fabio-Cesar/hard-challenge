import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

function verifyJWT(req, res, next){
    const { token } = req.cookies;
    console.log(token);
    if (!token) {
        return res.status(401).json({ auth: false, message: 'No token provided.' });
    };
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) {
        return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
      };

      req.userId = decoded.id;
      req.userType = decoded.userType;
      next();
    });
};

export default verifyJWT;