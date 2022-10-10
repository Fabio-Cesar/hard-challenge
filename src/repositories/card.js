export async function selectUserCards(_client, _userID) {
    const query = {
        'text': 'SELECT card.id as cardID, card.character_id as characterID, character.name as characterName, character.rarity as characterRarity FROM card INNER JOIN character ON card.character_id = character.id WHERE card.user_id = $1 AND card.deleted_at IS NULL',
        'values': [_userID]
    };
    const res = await _client.query(query);
    return {'cards': res.rows, 'error': null};
};

export async function selectChangeableCards(_client, _userID) {
    const query = {
        'text': 'SELECT card.id as card_id, card.character_id as character_id, character.name as character_name, character.rarity as character_rarity FROM card INNER JOIN character ON card.character_id = character.id WHERE card.change_available IS TRUE AND card.user_id <> $1 AND card.deleted_at IS NULL',
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