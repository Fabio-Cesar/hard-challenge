export async function selectBrands(_client) {
    const query = {
        'text': 'SELECT id, name, series FROM brand'
    };
    const res = await _client.query(query);
    return {'brands': res.rows, 'error': null};
};

// Funções usuário admin criar nova brand

export async function filterBrand(_client, _name, _series) {
    const query = {
        'text': "SELECT id FROM brand WHERE name = $1 AND series = $2",
        'values': [_name, _series]
    }
    const res = await _client.query(query);
    if (res.rows.length > 0) {
        throw new Error(`Não foi possível criar coleção pois ela já existe!`);
    }
    return { 'error': null } ;
}

export async function insertBrand(_client, _name, _series) {
    const query = {
        'text': "INSERT INTO brand (name, series) VALUES ($1, $2)",
        'values': [_name, _series]
    }
    const res = await _client.query(query);
    return { 'error': null };
}