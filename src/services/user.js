import * as db from '../repositories/index.js';
import * as userQueries from '../repositories/user.js';

export async function createUser(_name, _email, _password) {
    const client = await db.connect();
    try {
        // const begin = await db.begin();
        const addUser = await userQueries.createUser(client, 'user', _name, _email, _password, 50)
        // const commit = await db.commit();
        return addUser;
    } catch (error) {
        console.error(error);
        // await db.rollback();
        return {'status': 500, 'error': error.message};
    } finally {
        db.release(client);
    };
};