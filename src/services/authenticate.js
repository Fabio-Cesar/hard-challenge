import * as db from '../repositories/index.js';
import * as userQueries from '../repositories/user.js';

async function authenticate(_email, _password) {
    const client = await db.connect();
    try {
        // const begin = await db.begin();
        const findUser = await userQueries.select(client, _email, _password);
        // const commit = await db.commit();
        return findUser;
    } catch (error) {
        console.error(error);
        // await db.rollback();
        return {'status': 500, 'error': error.message};
    } finally {
        db.release(client);
    };
};

export default authenticate;