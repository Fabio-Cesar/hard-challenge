import * as cardServices from '../services/card.js';

export async function getCardsByUserID(req, res) {
    const userID = req.userID;
    const result = await cardServices.getUserCards(userID);
    if(result.error === null) {
        res.status(200).json({ cards: result.cards, error: result.error })
    } else {
        res.status(result.status).json({ message: result.error })
    }
}

export async function getChangeableCards(req, res) {
    const userID = req.userID;
    const result = await cardServices.getChangeableCards(userID);
    if(result.error === null) {
        res.status(200).json({ cards: result.cards, error: result.error })
    } else {
        res.status(result.status).json({ message: result.error })
    }
}

export async function getChangeableCardsByUserID(req, res) {
    const userID = req.userID;
    const result = await cardServices.getUserChangeableCards(userID);
    if(result.error === null) {
        res.status(200).json({ cards: result.cards })
    } else {
        res.status(result.status).json({ message: result.error })
    }
}