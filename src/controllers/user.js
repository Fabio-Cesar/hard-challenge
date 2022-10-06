import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
import * as userServices from '../services/user.js';

export async function createUser(req, res) {
    const { name, email, password } = req.body;
    const result = await userServices.createUser(name, email, password);
    if (result.error === null) {
        res.status(200).json({ message: 'Usuário criado com sucesso!' });
    } else {
        res.status(result.status).json({ message: result.error });
    };
};

export async function updateUser(req, res) {
    const { userID, userType, userCoins } = req;
    const { name, email, password } = req.body;
    const result = await userServices.updateUser(userID, name, email, password);
    if (result.error === null) {
        res.clearCookie('token');
        const token = jwt.sign({ userID, userType, userEmail : email, userName : name, userCoins }, process.env.SECRET, { expiresIn: 3600 });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ userID: `${userID}`, name: `${name}`, message: 'Usuário atualizado com sucesso!' });
    } else {
        res.status(result.status).json({ message: result.error });
    };
}