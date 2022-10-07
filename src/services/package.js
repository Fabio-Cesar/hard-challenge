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
        await db.begin();
        
        const findBrand = await packageQueries.findBrand(client, _packageID);
        const { brandID, cardPrice, rare, ultraRare } = findBrand;

        function getRandomIntNumber(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min)
        }
        const rarityNumber = getRandomIntNumber(0,100);
        let rarity = '';
        if (rarityNumber <= ultraRare)  rarity = 'ultrarare';
        else if (rarityNumber <= rare)  rarity = 'rare';
        else                            rarity = 'common';
        
        console.log(`sorteio: ${rarityNumber}`,rarity)

        const raffleCharacter = await packageQueries.raffleCharacter(client, brandID, rarity);
        const { characterID, characterName } = raffleCharacter;

        const createNewCard = await packageQueries.createNewCard(client, _userID, characterID);
        const { cardID } = createNewCard;

        const debitPriceFromUserCoins = await packageQueries.debitPriceFromUserCoins(client, _userID, cardPrice);
        const { userCoins } = debitPriceFromUserCoins;

        await db.commit();
        
        return { cardID, characterID, characterName, userCoins };
    } catch (error) {
        console.error(error);
        await db.rollback();
        return {'status': 500, 'error': error.message};
    } finally {
        db.release(client);
    };
};