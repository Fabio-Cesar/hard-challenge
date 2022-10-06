export async function selectPackages(_client) {
    const query = {
        'text': 'SELECT package.id as id, brand.name as brand, package.type as type, package.price as price, package.chance_rare as chance_rare, package.chance_ultrarare as chance_ultrarare FROM package INNER JOIN brand ON package.brand = brand.id WHERE finished_at IS NULL'
    };
    const res = await _client.query(query);
    return {'packages': res.rows, 'error': null};
};