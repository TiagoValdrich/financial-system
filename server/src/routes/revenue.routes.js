const express = require('express');
const router = express.Router();
const revenueController = require('../controllers/revenue.controller');

router.get('/api/revenue', revenueController.getRevenues);
router.get('/api/revenue/:id', revenueController.getRevenue);
router.put('/api/revenue', revenueController.save);
router.delete('/api/revenue/:id', revenueController.delete);

module.exports = router;