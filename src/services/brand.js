import * as db from '../repositories/index.js';
import * as brandQueries from '../repositories/brand.js';

export async function getBrands() {
    const client = await db.connect();
    try {
        const selectBrands = await brandQueries.selectBrands(client);
        db.release(client);
        return selectBrands;
    } catch (error) {
        console.error(error);
        db.release(client);
        return {'status': error.status || 500, 'error': error.message};
    }
};

export async function createNewBrand(_name, _series) {
    const client = await db.connect();
    try {
        const begin = await db.begin(client);
        const checkBrandExists = await brandQueries.filterBrand(client, _name, _series);
        const createBrand = await brandQueries.insertBrand(client, _name, _series);
        const commit = await db.commit(client);
        db.release(client);
        return commit;
    } catch (error) {
        console.error(error);
        await db.rollback(client);
        db.release(client);
        return {'status': error.status || 500, 'error': error.message};
    }
};