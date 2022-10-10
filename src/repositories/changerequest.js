export async function selectCards(_client, _cardID) {
    const query = {
        'text': 'SELECT change_request.offeredcard_id FROM change_request INNER JOIN card ON change_request.offeredcard_id = card.id WHERE change_request.requestcard_id = $1 AND change_request.finished_at IS NULL AND change_request.cancelled_at IS NULL',
        'values': [_cardID]
    };
    const res = await _client.query(query);
    return {'cards': res.rows, 'error': null};
};

export async function createChangeRequestQuery(_client, _offeredcardID, _requestcardID) {
    const query = {
        'text': 'INSERT INTO change_request (requestcard_id,offeredcard_id) VALUES ($1,$2)',
        'values': [_requestcardID, _offeredcardID]
    }
    await _client.query(query);
    return {'res': 'Pedido de troca realizado!', 'error': null};
}