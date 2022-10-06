import * as cardServices from '../services/card.js';

export async function getCard(req, res) {
    const userID = req.userId;
    const result = await cardServices.getCard(userID);
    if(result.error === null) {
        res.status(200).json({ message: '' })
    } else {
        res.status(result.status).json({ message: '' })
    }
}

export async function postCards() {

}