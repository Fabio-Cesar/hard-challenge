export async function selectCards(client, _cardID) {
    const query = {
        'text': 'SELECT change_request.offeredcard_id FROM change_request INNER JOIN card ON change_request.offeredcard_id = card.id WHERE change_request.requestcard_id = $1 AND change_request.finished_at IS NULL AND change_request.cancelled_at IS NULL',
        'values': [_cardID]
    };
    const res = await _client.query(query);
    return {'cards': res.rows, 'error': null};
};