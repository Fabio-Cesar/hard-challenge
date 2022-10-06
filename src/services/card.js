import * as db from '../repositories/index.js';
import * as cardQueries from '../repositories/card.js';

export async function getUserCards(_userID) {
    const client = await db.connect();
    try {
        const findCards = await cardQueries.selectUserCards(client, _userID);
        return findCards;
    } catch (error) {
        console.error(error);
        return {'status': error.status || 500, 'error': error.message};
    } finally {
        db.release(client);
    };
};

export async function getChangeableCards(_userID) {
    const client = await db.connect();
    try {
        const findCards = await cardQueries.selectChangeableCards(client, _userID);
        return findCards;
    } catch (error) {
        console.error(error);
        return {'status': error.status || 500, 'error': error.message};
    } finally {
        db.release(client);
    };
}

export async function getUserChangeableCards(_userID) {
    const client = await db.connect();
    try {
        const findCards = await cardQueries.selectUserChangeableCards(client, _userID);
        return findCards;
    } catch (error) {
        console.error(error);
        return {'status': error.status || 500, 'error': error.message};
    } finally {
        db.release(client);
    };
}