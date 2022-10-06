import * as db from '../repositories/index.js';
import * as userQueries from '../repositories/user.js';

export async function createUser(_name, _email, _password) {
    const client = await db.connect();
    try {
        if ( _name === undefined || _name === '') {
            const error = new Error('Necessário informar um nome de usuário!');
            error.status(400);
            throw error;
        }
        if ( _email === undefined || _email === '' || !_email.includes('@')) {
            const error = new Error("Necessário informar um email com @");
            error.status(400);
            throw error;
        }
        if ( _password === undefined || _password.length < 4) {
            const error = new Error("Necesário informar uma senha de ao menos 4 caracteres!");
            error.status(400);
            throw error;
        }
        const addUser = await userQueries.createUser(client, 'user', _name, _email, _password, 50)
        return addUser;
    } catch (error) {
        console.error(error);
        return {'status': error.status || 500, 'error': error.message};
    } finally {
        db.release(client);
    };
};