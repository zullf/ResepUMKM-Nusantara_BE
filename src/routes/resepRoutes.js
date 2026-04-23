const express = require('express');
const router = express.Router();

const controller = require('../controllers/resepController');
const validate = require('../middlewares/validateResep');

router.get('/resepUMKM', controller.getAllResep);
router.post('/resepUMKM', validate, controller.createResep);
router.delete('/resepUMKM/:id', controller.deleteResep);

module.exports = router;