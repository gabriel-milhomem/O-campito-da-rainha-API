const express = require('express');
const MatchesControllers = require('../controllers/MatchesControllers');
const PiecesControllers = require('../controllers/PiecesControllers');
const authenticateGame = require('../middlewares/authenticateGame');
const Errors = require('../errors');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const match = await MatchesControllers.createMatch();
        await PiecesControllers.createPieces(match.id);
        const allMatchData = await MatchesControllers.getMatchById(match.id);

        res.status(201).send(allMatchData);
    } catch (err) {
        console.error(err);
        res.sendStatus(500)
    }
});

router.get('/:id', authenticateGame, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const allMatchData = await MatchesControllers.getMatchById(id);

        res.status(200).send(allMatchData);
        
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