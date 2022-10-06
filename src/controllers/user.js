import * as dotenv from 'dotenv';
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