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
    const userID = req.userId;       //ver como isso vem do front
    const packageID = req.packageId; //ver como isso vem do front
    const result = await packageServices.buyNewCardService(userID, packageID);
    if(result.error === null) {
        res.status(200).json({ card: result })
    } else {
        res.status(result.status).json({ message: result.error })
    }
}