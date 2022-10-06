import * as db from '../repositories/index.js';
import * as cardQueries from '../repositories/card.js';

export async function getCard(_userID) {
    const client = await db.connect();
    try {
        // const begin = await db.begin();
        const findCard = await cardQueries.getCard(client, _userID)
        // const commit = await db.commit();
        return findCard;
    } catch (error) {
        console.error(error);
        // await db.rollback();
        return {'status': 500, 'error': error.message};
    } finally {
        db.release(client);
    };
};