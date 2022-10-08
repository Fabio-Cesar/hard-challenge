export async function select(_client, _email) {
    const query = {
        'text': 'SELECT id, password, email, user_type, name, coins FROM users WHERE email = $1 AND deleted_at IS NULL',
        'values': [_email]
    };
    const res = await _client.query(query);
    if (res.rows.length == 0) {
        throw new Error(`Nenhum usuário encontrado com esse email e senha.`);
    }
    return {'userID': res.rows[0].id, 'password': res.rows[0].password, 'userType': res.rows[0].user_type, 'userEmail': res.rows[0].email, 'userName': res.rows[0].name, 'userCoins': res.rows[0].coins, 'error': null};
};

export async function selectAdmin(_client, _email, _password) {
    const query = {
        'text': 'SELECT id, email, user_type, name, coins FROM users WHERE email = $1 AND password = $2 AND deleted_at IS NULL',
        'values': [_email, _password]
    };
    const res = await _client.query(query);
    if (res.rows.length == 0) {
        throw new Error(`Nenhum usuário encontrado com esse email e senha.`);
    }
    return {'userID': res.rows[0].id, 'userType': res.rows[0].user_type, 'userEmail': res.rows[0].email, 'userName': res.rows[0].name, 'userCoins': res.rows[0].coins, 'error': null};
};

export async function createUser(_client, _userType, _name, _email, _password, _coins) {
    const query = {
        'text': `INSERT INTO users (user_type, name, email, password, coins) VALUES ($1,$2,$3,$4,$5);`,
        'values': [_userType, _name, _email, _password, _coins]
    };
    const res = await _client.query(query);
    return { 'error': null };
};

export async function update(_client, _queryColumns, _queryRef, _queryValues) {
    if(_queryValues.length === 2) {
        const query = {
            text: `UPDATE users SET updated_at = $2 WHERE id = $1 RETURNING name, email`,
            values: _queryValues
        }
        const res = await _client.query(query);
        return { 'newName': res.rows[0].name, 'newEmail': res.rows[0].email, 'error': null };
    } else {
        const query = {
            text: `UPDATE users SET (${_queryColumns}) = (${_queryRef}) WHERE id = $1 RETURNING name, email`,
            values: _queryValues
        }
        const res = await _client.query(query);
        return { 'newName': res.rows[0].name, 'newEmail': res.rows[0].email, 'error': null };
    };
};