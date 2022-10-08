import * as db from '../repositories/index.js';
import * as userQueries from '../repositories/user.js';

export async function createUser(_name, _email, _password) {
    const client = await db.connect();
    try {
        if ( _name === undefined || _name === '') {
            const error = new Error('Necessário informar um nome de usuário!');
            error.status = 400;
            throw error;
        }
        if ( _email === undefined || _email === '' || !_email.includes('@')) {
            const error = new Error("Necessário informar um email com @");
            error.status = 400;
            throw error;
        }
        if ( _password === undefined || _password.length < 4) {
            const error = new Error("Necesário informar uma senha de ao menos 4 caracteres!");
            error.status = 400;
            throw error;
        }
        const addUser = await userQueries.createUser(client, 'user', _name, _email, _password, 50)
        db.release(client);
        return addUser;
    } catch (error) {
        console.error(error);
        db.release(client);
        return {'status': error.status || 500, 'error': error.message};
    }
};

export async function updateUser(_id, _name, _email, _password) {
    const client = await db.connect();
    try {
        const queryColumnsArray = ['updated_at'];
        const queryValues = [_id, 'now()'];
        if (_name !== '') { queryValues.push(_name); queryColumnsArray.push('name'); } else {
            const error = new Error('Necessário informar um nome de usuário!');
            error.status = 400;
            throw error;
        };
        if (_email !== '') { queryValues.push(_email); queryColumnsArray.push('email'); } else {
            const error = new Error('Necessário informar um email com @!');
            error.status = 400;
            throw error;
        }
        if (_password.length >= 4) { queryValues.push(_password); queryColumnsArray.push('password'); } else {
            const error = new Error("Necesário informar uma senha de ao menos 4 caracteres!");
            error.status = 400;
            throw error;
        }
        let queryColumns = queryColumnsArray[0];
        let queryRef = '$2';
        for (let i = 1; i < queryColumnsArray.length; i++) {
            queryColumns = queryColumns.concat(', ', queryColumnsArray[i]);
            queryRef = queryRef.concat(`, $${i + 2}`);
        };
        const update = await userQueries.update(client, queryColumns, queryRef, queryValues);
        return update;
    } catch (error) {
        console.error(error);
        return {'status': error.status || 500, 'error': error.message};
    } finally {
        db.release(client);
    };
};