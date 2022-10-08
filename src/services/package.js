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

export async function buyNewCardService(_userID, _packageID) {
    const client = await db.connect();
    try {
        await db.begin(client);
        
        const findBrand = await packageQueries.findBrand(client, _packageID);
        const brandData = findBrand.res[0];
        const { brand_id, brand_name, card_price, rare, ultra_rare } = brandData;

        function getRandomIntNumber(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min)
        }
        const randomRarity = getRandomIntNumber(0,100);
        let rarity = '';
        if (randomRarity <= ultra_rare) rarity = 'Ultra Raro';
        else if (randomRarity <= rare)  rarity = 'Raro';
        else                            rarity = 'Comum';
        
        const raffleCharacter = await packageQueries.raffleCharacter(client, brand_id, rarity);
        const CharacterRaffled = raffleCharacter.res[0];
        const { character_id, character_name } = CharacterRaffled;

        const createNewCard = await packageQueries.createNewCard(client, _userID, character_id);
        const { card_id } = createNewCard.res[0];

        const debitPriceFromUserCoins = await packageQueries.debitPriceFromUserCoins(client, _userID, card_price);
        const { user_coins } = debitPriceFromUserCoins.res[0];

        await db.commit(client);
        db.release(client);

        return { card_id, brand_id, brand_name, character_id, character_name, user_coins, rarity, 'error': null };
    } catch (error) {
        console.error(error);

        await db.rollback(client);
        db.release(client);

        return {'status': error.status || 500, 'error': error.message};
    };
};