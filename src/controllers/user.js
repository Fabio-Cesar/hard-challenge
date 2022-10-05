import * as dotenv from 'dotenv';
dotenv.config();
import * as userServices from '../services/user.js';

export async function createUser(req, res) {
    const { name, email, password } = req.body;
    const result = await userServices.createUser(name, email, password);
    if (result.error === null) {
        console.log (`userID: ${userID}, userType: ${userType}`);
        res.status(200).json({ message: 'user created succesfully!' });
    } else {
        res.status(result.status).json({ message: result.error });
    };
};