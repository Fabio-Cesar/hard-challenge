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