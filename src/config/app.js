import express from 'express';
import cookieParser from 'cookie-parser';
import routes from '../router/router.js';

export const app = express();

app.use('/', express.static('./public/static'));
app.use('/images', express.static('./images'));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', routes);

app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: './public/static/' });
});