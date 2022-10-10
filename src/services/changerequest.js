import * as db from '../repositories/index.js';
import * as changeRequestQueries from '../repositories/changerequest.js';
import { createNewCard } from '../repositories/package.js';

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
        const changeRequest = await changeRequestQueries.createChangeRequest(client, _offeredcardID, _requestcardID)
        db.release(client);
        return changeRequest;
    } catch (error) {
        console.error(error);
}

export async function finishTrade(_reqcardID, _offcardID) {
    const client = await db.connect();
    try {
        await db.begin(client);
        const checkForChangeReq = await changeRequestQueries.selectChangeRequest(client, _reqcardID, _offcardID);
        const deleteReqCard = await changeRequestQueries.deleteCardFromOriginalUser(client, _reqcardID);
        const deleteOffCard = await changeRequestQueries.deleteCardFromOriginalUser(client, _offcardID);
        const createNewCardForReq = await createNewCard(client, deleteReqCard.user_id, deleteOffCard.character_id);
        const createNewCardForOff = await createNewCard(client, deleteOffCard.user_id, deleteReqCard.character_id);
        const finishTrade = await changeRequestQueries.finishChangeRequest(client, _reqcardID, _offcardID);
        const cancelPendingTradesForReq = await changeRequestQueries.cancelAnyOpenTrades(client, _reqcardID);
        const cancelPendingTradesForOff = await changeRequestQueries.cancelAnyOpenTrades(client, _offcardID);
        await db.commit(client);
        db.release(client);
        return {'error': null};
    } catch (error) {
        console.error(error);
        await db.rollback(client);
        db.release(client);
        return {'status': error.status || 500, 'error': error.message};
    }
}