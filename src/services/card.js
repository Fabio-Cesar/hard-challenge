import * as db from '../repositories/index.js';
import * as cardQueries from '../repositories/card.js';
import { cancelAnyOpenTrades } from '../repositories/changerequest.js';

export async function getUserCards(_userID) {
    const client = await db.connect();
    try {
        const findCards = await cardQueries.selectUserCards(client, _userID);
        db.release(client);
        return findCards;
    } catch (error) {
        console.error(error);
        db.release(client);
        return {'status': error.status || 500, 'error': error.message};
    };
};

export async function getChangeableCards(_userID) {
    const client = await db.connect();
    try {
        const findCards = await cardQueries.selectChangeableCards(client, _userID);
        db.release(client);
        return findCards;
    } catch (error) {
        console.error(error);
        db.release(client);
        return {'status': error.status || 500, 'error': error.message};
    };
}

export async function getUserChangeableCards(_userID) {
    const client = await db.connect();
    try {
        const findCards = await cardQueries.selectUserChangeableCards(client, _userID);
        db.release(client);
        return findCards;
    } catch (error) {
        console.error(error);
        db.release(client);
        return {'status': error.status || 500, 'error': error.message};
    };
}

export async function toggleCardChangeable(_cardID, _isAvailable) {
    const client = await db.connect();
    try {
        await db.begin(client);
        let change;
        if (_isAvailable === 'false') {
            change = true;
        } else {
            change = false;
        }
        const findCards = await cardQueries.toggleCardChangeable(client, _cardID, change);

        const cancelPendingTrades = await cancelAnyOpenTrades(_cardID);
        await db.commit(client);
        db.release(client);
        return findCards;
    } catch (error) {
        console.error(error);
        await db.rollback(client);
        db.release(client);
        return {'status': error.status || 500, 'error': error.message};
    }
}