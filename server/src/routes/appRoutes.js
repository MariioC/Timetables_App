const express = require('express');
const router = express.Router();

const appController = require('../controllers/appController')

router.get('/', appController.getHours);
router.get('/turns', appController.getTurns);
router.post('/', appController.createUser);
router.post('/take', appController.verifyToken, appController.takeTurn);
router.delete('/turn', appController.verifyToken, appController.deleteTurn);

module.exports = router;