import * as changeRequestServices from '../services/changerequest.js';

export async function getChangeRequestByCardID(req, res) {
    const { cardID } = req.params;
    const result = await changeRequestServices.getChangeRequests(cardID);
    if(result.error === null) {
        res.status(200).json({ cards: result.cards })
    } else {
        res.status(result.status).json({ message: result.error })
    }
}