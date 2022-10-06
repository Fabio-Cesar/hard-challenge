import * as db from '../repositories/index.js';
import * as changeRequestQueries from '../repositories/changerequest.js';

export async function getChangeRequests(_cardID) {
    const client = await db.connect();
    try {
        const findCards = await changeRequestQueries.selectCards(client, _cardID);
        return findCards;
    } catch (error) {
        console.error(error);
        return {'status': error.status || 500, 'error': error.message};
    } finally {
        db.release(client);
    };
}