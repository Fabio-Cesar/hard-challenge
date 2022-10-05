export async function select(_client, _email, _password) {
    const query = {
        'text': 'SELECT id as userID, user_type as userType FROM users WHERE email = $1 AND password = $2',
        'values': [_email, _password]
    };
    const res = await _client.query(query);
    if (res.rows.length == 0) {
        throw new Error(`Nenhum usuário encontrado com esse email e senha.`);
    }
    return {'userID': res.rows[0].userID, 'userType': res.rows[0].userType, 'error': null};
};

export async function createUser(_client, _userType, _name, _email, _password, _coins) {
    const query = {
        'text': `INSERT INTO users (user_type, name, email, password, coins) VALUES ($1,$2,$3,$4,$5);`,
        'values': [_userType, _name, _email, _password, _coins]
    };
    const res = await _client.query(query);
    return { 'error': null };
};