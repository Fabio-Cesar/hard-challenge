import * as db from '../repositories/index.js';
import * as userQueries from '../repositories/user.js';
import bcrypt from 'bcrypt';

async function authenticate(_email, _password) {
    const client = await db.connect();
    try {
        const findUser = await userQueries.select(client, _email);
        const match = await bcrypt.compare(_password, findUser.password);
        if (match) {
            if (findUser.userType === 'admin') {
                findUser.admin = true;
            } else {
                findUser.admin = false;
            };
            db.release(client);
            return findUser;
        }
        return {'status': 400, 'error': 'Senha incorreta'}
    } catch (error) {
        console.error(error);
        db.release(client);
        return {'status': 500, 'error': error.message};
    } finally {
    };
};

export default authenticate;