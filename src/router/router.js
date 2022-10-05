import { Router } from 'express';
import * as authControllers from '../controllers/authenticate.js';
import verifyJWT from '../middlewares/verify.js';

const app = Router();

app.get('/home', verifyJWT, authControllers.verified);

app.post('/login', authControllers.authenticateUser);
app.post('/logout', authControllers.logout);
// app.post('/signin', createUser);
// app.post('/cards', verifyJWT, createCard);
// app.post('/package', verifyJWT, createPackage);
// app.post('/character', verifyJWT, createCharacter);

// app.put()

// app.delete()

export default app;