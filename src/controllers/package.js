import * as packageServices from '../services/package.js';

export async function getPackages(req, res) {
    const result = await packageServices.getPackages();
    if (result.error === null) {
        res.status(200).json({ packages: result.packages });
    } else {
        res.status(result.status).json({ message: result.error });
    };
};