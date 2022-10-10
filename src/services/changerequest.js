import * as db from '../repositories/index.js';
import * as changeRequestQueries from '../repositories/changerequest.js';

export async function getChangeRequests(_cardID) {
    const client = await db.connect();
    try {
        const findCards = await changeRequestQueries.selectCards(client, _cardID);
        db.release(client);
        return findCards;
    } catch (error) {
        console.error(error);
        db.release(client);
        return {'status': error.status || 500, 'error': error.message};
    };
}

export async function createChangeRequestService(_offeredcardID, _requestcardID) {
    const client = await db.connect();
    try {
        const changeRequest = await changeRequestQueries.createChangeRequestQuery(client, _offeredcardID, _requestcardID)
        db.release(client);
        return changeRequest;
    } catch (error) {
        console.error(error);
        db.release(client);
        return {'status': error.status || 500, 'error': error.message};
    }
}