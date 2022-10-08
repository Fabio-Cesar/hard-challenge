import * as packageServices from '../services/package.js';
import jwt from 'jsonwebtoken';

export async function getPackages(req, res) {
    const result = await packageServices.getPackages();
    if (result.error === null) {
        res.status(200).json({ packages: result.packages });
    } else {
        res.status(result.status).json({ message: result.error });
    };
};

export async function createNewPackage(req, res) {
    const { brand, type, price, chancerare, chanceultrarare } = req.body;
    const result = await packageServices.createNewPackage(brand, type, price, chancerare, chanceultrarare);
    if (result.error === null) {
        res.status(201).json({ packageID: result.packageID });
    } else {
        res.status(result.status).json({ message: result.error });
    };
}

export async function createNewPackageImage(req, res) {
    if (req.invalidFile) {
        return res.status(400).json({ message: 'Apenas imagens png e imagens jpg são permitidas!' })
    }
    return res.status(201).json({ message: 'Upload com sucesso'})
}

export async function buyNewCard(req, res) {
    const { userID, userType, userEmail, userName } = req;
    const packageID = req.params.packageID;
    const aquiredCard = await packageServices.buyNewCardService(userID, packageID);

    if(aquiredCard.error === null) {
        res.clearCookie('token');
        const token = jwt.sign({ userID, userType, userEmail, userName, userCoins : aquiredCard.user_coins }, process.env.SECRET, { expiresIn: 3600 });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ card: aquiredCard });
    } else {
        res.status(aquiredCard.status).json({ message: aquiredCard.error });
    };
};