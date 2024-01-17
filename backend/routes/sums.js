import express from 'express';
import { chartSum, filterArea, filterDate, tabelSum } from '../controllers/sum.js';


const router = express.Router();

router.get('/get-chart', chartSum);
router.get('/get-tabel', tabelSum);
router.post('/filter-area/', filterArea);
router.post('/filter-date/', filterDate);

export default router;