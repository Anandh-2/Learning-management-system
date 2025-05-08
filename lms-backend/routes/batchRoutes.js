const express = require('express');
const { createBatch, getAllBatches, deleteBatch } = require('../controllers/batchController');
const router = express.Router();

router.post('/batches',createBatch);
router.get('/batches',getAllBatches);
router.delete('/batches/:batchId',deleteBatch);

module.exports=router;