// funções auxiliares

import { router } from './index.js';

export function navigateTo(url) {
    history.pushState(null, null, url);
    router();
};