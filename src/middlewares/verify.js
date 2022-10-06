import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

function verifyJWT(req, res, next){
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: 'Para prosseguir, faça login novamente.' });
    };
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) {
        return res.status(401).json({ message: 'Para prosseguir, faça login novamente.' });
      };

      req.userID = decoded.userID;
      req.userType = decoded.userType;
      req.userName = decoded.userName;
      req.userEmail = decoded.userEmail;
      req.userCoins = decoded.userCoins;
      next();
    });
};

export default verifyJWT;