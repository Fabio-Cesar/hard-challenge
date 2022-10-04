import { Router } from 'express';
import * as authControllers from '../controllers/authenticate.js';
import { fileURLToPath } from 'url';
import verifyJWT from '../middlewares/verify.js';

const app = Router();

app.get('*', function (req, res) {
    const path = fileURLToPath(new URL('../../public/static/index.html', import.meta.url));
    res.sendFile(path);
});

app.post('/login', authControllers.authenticateUser);
app.post('/logout', authControllers.logout);
app.post('/home', verifyJWT, authControllers.verified);
// app.post('/signin', createUser);
// app.post('/cards', verifyJWT, createCard);
// app.post('/package', verifyJWT, createPackage);
// app.post('/character', verifyJWT, createCharacter);

// app.put()

// app.delete()

export default app;