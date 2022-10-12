import * as db from '../repositories/index.js';
import * as userQueries from '../repositories/user.js';
import bcrypt from 'bcrypt';
const saltRounds = 10;

export async function createUser(_name, _email, _password, _type) {
    const client = await db.connect();
    try {
        await db.begin(client);
        const checkUserExists = await userQueries.checkExists(client, _email)
        if ( _name === undefined || _name === '') {
            const error = new Error('Necessário informar um nome de usuário!');
            error.status = 400;
            throw error;
        }
        if ( _email === undefined || !_email.includes('@')) {
            const error = new Error("Necessário informar um email com @");
            error.status = 400;
            throw error;
        }
        if ( _password === undefined || _password.length < 4) {
            const error = new Error("Necesário informar uma senha de ao menos 4 caracteres!");
            error.status = 400;
            throw error;
        }
        const hash = await bcrypt.hash(_password, saltRounds);
        const addUser = await userQueries.createUser(client, _type, _name, _email, hash, 100)
        await db.commit(client);
        db.release(client);
        return addUser;
    } catch (error) {
        console.error(error);
        await db.rollback(client);
        db.release(client);
        return {'status': error.status || 500, 'error': error.message};
    };
};

export async function updateUser(_id, _name, _email, _password) {
    const client = await db.connect();
    try {
        const queryColumnsArray = ['updated_at'];
        const queryValues = [_id, 'now()'];
        if (_name !== undefined) {
            queryValues.push(_name); queryColumnsArray.push('name');
        }
        if (_email !== undefined) {
            if (_email.includes('@')) { 
                queryValues.push(_email); queryColumnsArray.push('email');
            } else {
                const error = new Error('Necessário informar um email com @!');
                error.status = 400;
                throw error;
            }
        }
        if (_password !== undefined) {
            if (_password.length >= 4) { 
                const hash = await bcrypt.hash(_password, saltRounds);
                queryValues.push(hash); queryColumnsArray.push('password');
            } else {
                const error = new Error("Necesário informar uma senha de ao menos 4 caracteres!");
                error.status = 400;
                throw error;
            }
        }
        let queryColumns = queryColumnsArray[0];
        let queryRef = '$2';
        for (let i = 1; i < queryColumnsArray.length; i++) {
            queryColumns = queryColumns.concat(', ', queryColumnsArray[i]);
            queryRef = queryRef.concat(`, $${i + 2}`);
        };
        const update = await userQueries.update(client, queryColumns, queryRef, queryValues);
        db.release(client);
        return update;
    } catch (error) {
        console.error(error);
        db.release(client);
        return {'status': error.status || 500, 'error': error.message};
    };
};