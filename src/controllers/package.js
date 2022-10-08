import * as packageServices from '../services/package.js';

export async function getPackages(req, res) {
    const result = await packageServices.getPackages();
    if (result.error === null) {
        res.status(200).json({ packages: result.packages });
    } else {
        res.status(result.status).json({ message: result.error });
    };
};

export async function buyNewCard(req, res) {
    const userID = req.userID;
    const packageID = req.params.packageID;
    const aquiredCard = await packageServices.buyNewCardService(userID, packageID);

    if(aquiredCard.error === null) {
        res.status(200).json({ card: aquiredCard });
    } else {
        res.status(result.status).json({ message: aquiredCard.error });
    };
};