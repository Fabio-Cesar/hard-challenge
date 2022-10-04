import express from 'express';
import cookieParser from 'cookie-parser';
import routes from '../router/router.js';
import { fileURLToPath } from 'url';

const path = fileURLToPath(new URL('../../public/static', import.meta.url));

export const app = express();

app.use(express.static(path));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);