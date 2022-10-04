import * as dotenv from 'dotenv';
dotenv.config();
import authenticateService from '../services/authenticate.js';
import jwt from 'jsonwebtoken';

export async function authenticateUser(req, res) {
    const { email , password } = req.body;
    const result = await authenticateService(email, password);
    if (result.error === null) {
        const { userID, userType } = result;
        const alreadyHasToken = req.cookies.token;
        if (alreadyHasToken) { res.clearCookie('token'); };
        const token = jwt.sign({ userID, userType }, process.env.SECRET, { expiresIn: 3600 });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({auth: true });
    } else {
        res.status(result.status).json({auth: false, message: result.error});
    };
};

export async function logout(req, res) {
    res.clearCookie('token');
}

export async function verified(req, res) {
    res.status(200).json({sucess: 'wheee'});
};