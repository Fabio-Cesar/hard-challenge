import * as packageServices from '../services/package.js';

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
    const userID = req.userId;       //ver como isso vem do front
    const packageID = req.packageId; //ver como isso vem do front
    const result = await packageServices.buyNewCardService(userID, packageID);
    if(result.error === null) {
        res.status(200).json({ card: result })
    } else {
        res.status(result.status).json({ message: result.error })
    }
}