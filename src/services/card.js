import * as db from '../repositories/index.js';
import * as cardQueries from '../repositories/card.js';

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