import * as db from '../repositories/index.js';
import * as packageQueries from '../repositories/package.js';

export async function getPackages() {
    const client = await db.connect();
    try {
        const findPackages = await packageQueries.selectPackages(client);
        return findPackages;
    } catch (error) {
        console.error(error);
        return {'status': error.status || 500, 'error': error.message};
    } finally {
        db.release(client);
    };
};