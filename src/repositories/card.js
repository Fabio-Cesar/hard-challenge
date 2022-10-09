export async function selectUserCards(_client, _userID) {
    const query = {
        'text': 'SELECT card.id as cardID, card.character_id as characterID, card.change_available as change_available, character.name as characterName, character.rarity as characterRarity FROM card INNER JOIN character ON card.character_id = character.id WHERE card.user_id = $1 AND card.deleted_at IS NULL',
        'values': [_userID]
    };
    const res = await _client.query(query);
    return {'cards': res.rows, 'error': null};
};

export async function selectChangeableCards(_client, _userID) {
    const query = {
        'text': 'SELECT card.id as cardID, card.character_id as characterID, character.name as characterName, character.rarity as characterRarity FROM card INNER JOIN character ON card.character_id = character.id WHERE card.change_available IS TRUE AND card.user_id <> $1 AND card.deleted_at IS NULL',
        'values': [_userID]
    };
    const res = await _client.query(query);
    return {'cards': res.rows, 'error': null};
}

export async function selectUserChangeableCards(_client, _userID) {
    const query = {
        'text': 'SELECT card.id as cardID, card.character_id as characterID, character.name as characterName, character.rarity as characterRarity FROM card INNER JOIN character ON card.character_id = character.id WHERE card.change_available IS TRUE AND card.user_id = $1 AND card.deleted_at IS NULL',
        'values': [_userID]
    };
    const res = await _client.query(query);
    return {'cards': res.rows, 'error': null};
}

export async function toggleCardChangeable(_client, _cardID, _isAvailable) {
    const query = {
        'text': 'UPDATE card SET change_available = $2 WHERE id = $1',
        'values': [_cardID, _isAvailable]
    };
    const res = await _client.query(query);
    return {'cards': res.rows, 'error': null};
}