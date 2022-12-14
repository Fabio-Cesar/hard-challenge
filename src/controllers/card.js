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

export async function getCardsByUserIDFilter(req, res) {
    const userID = req.userID;
    const { filter } = req.params;
    const result = await cardServices.getUserCardsFilter(userID, filter);
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

export async function getChangeableCardsFilter(req, res) {
    const userID = req.userID;
    const { filter } = req.params;
    const result = await cardServices.getChangeableCardsFilter(userID, filter);
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

export async function getChangeableCardsByUserIDFilter(req, res) {
    const userID = req.userID;
    const { filter } = req.params;
    const result = await cardServices.getUserChangeableCardsFilter(userID, filter);
    if(result.error === null) {
        res.status(200).json({ cards: result.cards, error: result.error })
    } else {
        res.status(result.status).json({ message: result.error })
    }
}

export async function toggleCardChangeable(req, res) {
    const card = req.body.card;
    const change = req.body.change;
    const result = await cardServices.toggleCardChangeable(card, change);
    if(result.error === null) {
        res.status(200).json({ change_available: result.change_available })
    } else {
        res.status(result.status).json({ message: result.error })
    }
}