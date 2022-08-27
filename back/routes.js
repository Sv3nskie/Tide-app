import express from 'express';
import {changeFor, tokenInfo, getTrades, listInfo, chartTime} from './controllers/bsc.js';


const router = express.Router();

router.get('/change', changeFor);
router.get('/token', tokenInfo);
router.get('/trades', getTrades);
router.get('/chart', chartTime);
router.post('/tokenlistdata', listInfo);

export default router;