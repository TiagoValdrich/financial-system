const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.controller');

router.get('/api/expense', expenseController.getExpenses);
router.get('/api/expense/:id', expenseController.getExpense);
router.put('/api/expense', expenseController.save);
router.delete('/api/expense/:id', expenseController.delete);

module.exports = router;