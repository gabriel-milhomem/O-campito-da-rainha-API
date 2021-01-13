const express = require('express');
const authenticateGame = require('../middlewares/authenticateGame');
const Errors = require('../errors');

const router = express.Router();

router.get('/:id/moves', authenticateGame, async (req, res) => {
    try {
        
    } catch (err) {
        console.error(err);
        if(err instanceof Erros.NotFoundError) {
            res.status(404).send({ error: 'id param not found'});
        } else {
            res.sendStatus(500);
        }
    }
});


router.post('/:id/moves', authenticateGame, async (req, res) => {
    try {

    } catch (err) {
        console.error(err);
        if(err instanceof Errors.NotFoundError) {
            res.status(404).send({ error: 'id param not found'});
        } else {
            res.sendStatus(500);
        }
    }
});

module.exports = router;