import { Router } from 'express';
import { createURLRecode } from '../controllers/urlRecordControllers.js';

const urlRecordRoute = new Router();

urlRecordRoute.route('/urlRecord').post(createURLRecode);

export default urlRecordRoute;
