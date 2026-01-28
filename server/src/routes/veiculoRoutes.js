const router = require('express').Router();
const c = require('../controllers/veiculoController');

router.post('/veiculos', c.create);
router.get('/veiculos', c.findAll);
router.get('/veiculos/:id', c.findById);
router.put('/veiculos/:id', c.update);
router.delete('/veiculos/:id', c.delete);

module.exports = router;