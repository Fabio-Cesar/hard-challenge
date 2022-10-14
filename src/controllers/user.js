import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import * as userServices from '../services/user.js';

export async function createUser(req, res) {
    const { name, email, password, type } = req.body;
    const result = await userServices.createUser(name, email, password, type);
    if (result.error === null) {
        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } else {
        res.status(result.status).json({ message: result.error });
    };
};

export async function updateUser(req, res) {
    if (req.invalidFile) {
        return res.status(400).json({ message: 'Apenas imagens png e imagens jpg são permitidas!' })
    }
    const { userID, userType, userCoins } = req;
    const { name, email, password } = req.body;
    const result = await userServices.updateUser(userID, name, email, password);
    if (result.error === null) {
        res.clearCookie('token');
        const token = jwt.sign({ userID, userType, userEmail : result.newEmail, userName : result.newName, userCoins, image : 'true' }, process.env.SECRET, { expiresIn: 3600 });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ userID: `${userID}`, name: `${result.newName}`, message: 'Usuário atualizado com sucesso!' });
    } else {
        res.status(result.status).json({ message: result.error });
    };
}