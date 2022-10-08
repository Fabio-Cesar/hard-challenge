import * as db from '../repositories/index.js';
import * as characterQueries from '../repositories/character.js';

export async function createNewCharacter(_brand, _name, _rarity) {
    const client = await db.connect();
    try {
        const begin = await db.begin(client);
        const checkCharacterExists = await characterQueries.filterCharacter(client, _brand, _name, _rarity);
        const createCharacter = await characterQueries.insertCharacter(client, _brand, _name, _rarity);
        const commit = await db.commit(client);
        console.log(createCharacter);
        db.release(client);
        return createCharacter;
    } catch (error) {
        console.error(error);
        await db.rollback(client);
        db.release(client);
        return {'status': error.status || 500, 'error': error.message};
    }
}