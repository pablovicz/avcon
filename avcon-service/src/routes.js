import { Router } from 'express';

import ConvertController from './controllers/ConvertController.js';

const routes = Router();

routes.get('/test', ConvertController.test)


export default routes;
