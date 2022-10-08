import * as dotenv from 'dotenv';
dotenv.config();
import authenticateService from '../services/authenticate.js';
import jwt from 'jsonwebtoken';

export async function authenticateUser(req, res) {
    const { email , password } = req.body;
    const result = await authenticateService(email, password);
    if (result.error === null) {
        const { userID, userType, userEmail, userName, userCoins, admin } = result;
        const alreadyHasToken = req.cookies.token;
        if (alreadyHasToken) { res.clearCookie('token'); };
        const token = jwt.sign({ userID, userType, userEmail, userName, userCoins }, process.env.SECRET, { expiresIn: 3600 });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ admin });
    } else {
        res.status(result.status).json({message: result.error});
    };
};

export async function logout(req, res) {
    res.clearCookie('token');
    res.status(200).json();
};

export async function verified(req, res) {
    const type = req.userType;
    if (type === 'user') {
        res.status(200).json({ userID: req.userID, userEmail: req.userEmail, userName: req.userName, userCoins: req.userCoins});
    } else {
        res.status(403).json({ message: 'Usuário não autorizado!' });
    };
};

export async function authorized(req, res) {
    const type = req.userType;
    if (type === 'admin') {
        res.status(200).json({ userID: req.userID, userName: req.userName });
    } else {
        res.status(403).json({ message: 'Usuário não autorizado!' });
    };
};