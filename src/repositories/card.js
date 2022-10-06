export async function getCard(_client, _userID) {
    const query = {
        'text': 'SELECT id as cardID, character_id as characterID FROM card WHERE user_id = $1',
        'values': [_userID]
    };
    const res = await _client.query(query);
    if (res.rows.length == 0) {
        throw new Error(`Você não possui nenhum card!.`);
    };
    return {'cardsArray': res.rows, 'error': null};
};