import { Router } from 'express';
import * as authControllers from '../controllers/authenticate.js';
import * as changeRequestControllers from '../controllers/changerequest.js';
import * as characterControllers from '../controllers/character.js';
import * as packageControllers from '../controllers/package.js';
import * as userControllers from '../controllers/user.js';
import * as cardsControllers from '../controllers/card.js';
import verifyJWT from '../middlewares/verify.js';

const app = Router();

app.get('/user', verifyJWT, authControllers.verified);
app.get('/admin', verifyJWT, authControllers.authorized);
app.get('/packages', verifyJWT, packageControllers.getPackages);
app.get('/cards', verifyJWT, cardsControllers.getCardsByUserID);
app.get('/changeable-cards', verifyJWT, cardsControllers.getChangeableCards);
app.get('/user-changeable-cards', verifyJWT, cardsControllers.getChangeableCardsByUserID);
app.get('/change-requests/:cardID', verifyJWT, changeRequestControllers.getChangeRequestByCardID);

app.post('/login', authControllers.authenticateUser);
app.post('/logout', authControllers.logout);
app.post('/signup', userControllers.createUser);
// app.post('/packages/:packageID/rng/:rng', verifyJWT, packageControllers.buyPackage);
// app.post('/packages', verifyJWT, packageControllers.createPackage);
// app.post('/character', verifyJWT, characterControllers.createCharacter);
// app.post('/change-requests/:offeredcardID/for/:requestcardID', verifyJWT, changeRequestControllers.createChangeRequest);
// app.post('/trade', verifyJWT, changeRequestControllers.tradeCards);

// app.put('/user', verifyJWT, userControllers.updateUser);
// app.put('/cards/:cardID', verifyJWT, cardsControllers.toggleCardChangeable);

// app.delete('/user', verifyJWT, userControllers.removeUser);

export default app;