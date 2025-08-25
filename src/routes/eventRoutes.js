const express = require('express');
const router = express.Router();
const { createEvent, getEventByCode } = require('../controllers/eventController');

// Futuramente, protegeremos a rota de criação com um middleware de autenticação
// Ex: router.post('/', authMiddleware, createEvent);

router.post('/', createEvent);
router.get('/:eventCode', getEventByCode);

module.exports = router;
