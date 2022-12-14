import { Router } from 'express';
import * as authControllers from '../controllers/authenticate.js';
import * as brandControllers from '../controllers/brand.js';
import * as changeRequestControllers from '../controllers/changerequest.js';
import * as characterControllers from '../controllers/character.js';
import * as packageControllers from '../controllers/package.js';
import * as userControllers from '../controllers/user.js';
import * as cardsControllers from '../controllers/card.js';
import verifyJWT from '../middlewares/verify.js';
import upload from '../config/multer.js';
import uploadtwo from '../config/multertwo.js';
import uploadthree from '../config/multerthree.js';

const app = Router();

app.get('/user', verifyJWT, authControllers.verified);
app.get('/admin', verifyJWT, authControllers.authorized);
app.get('/packages', verifyJWT, packageControllers.getPackages);
app.get('/packages/:filter', verifyJWT, packageControllers.getPackagesFilter);
app.get('/cards', verifyJWT, cardsControllers.getCardsByUserID);
app.get('/cards/:filter', verifyJWT, cardsControllers.getCardsByUserIDFilter)
app.get('/brands', verifyJWT, brandControllers.getBrands);
app.get('/changeable-cards', verifyJWT, cardsControllers.getChangeableCards);
app.get('/changeable-cards/:filter', verifyJWT, cardsControllers.getChangeableCardsFilter);
app.get('/user-changeable-cards', verifyJWT, cardsControllers.getChangeableCardsByUserID);
app.get('/user-changeable-cards/:filter', verifyJWT, cardsControllers.getChangeableCardsByUserIDFilter);
app.get('/change-requests/:cardID', verifyJWT, changeRequestControllers.getChangeRequestByCardID);
app.get('/change-requests/:cardID/filter/:filter', verifyJWT, changeRequestControllers.getChangeRequestByCardIDFilter);

app.post('/login', authControllers.authenticateUser);
app.post('/logout', authControllers.logout);
app.post('/signup', userControllers.createUser);
app.post('/packages/:packageID', verifyJWT, packageControllers.buyNewCard);
app.post('/packages', verifyJWT, uploadtwo.none(), packageControllers.createNewPackage);
app.post('/packageimage/:packageID', verifyJWT, uploadtwo.single('package-image'), packageControllers.createNewPackageImage);
app.post('/character', verifyJWT, uploadthree.none(), characterControllers.createNewCharacter);
app.post('/characterimage/:characterID', verifyJWT, uploadthree.single('character-image'), characterControllers.createNewCharacterImage);
app.post('/brands', verifyJWT, brandControllers.createNewBrand);
app.post('/change-requests/:offeredcardID/for/:requestcardID', verifyJWT, changeRequestControllers.createChangeRequest);
app.post('/trade', verifyJWT, changeRequestControllers.tradeCards);

app.put('/cards', verifyJWT, cardsControllers.toggleCardChangeable);
app.put('/user', verifyJWT, upload.single('profile-image'), userControllers.updateUser);

export default app;