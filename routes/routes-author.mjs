import express from 'express';

const routes = new express.Router();

import {
    getAll
} from './controllers/authorController.js';

routes.get('/', getAll);


export default routes;

