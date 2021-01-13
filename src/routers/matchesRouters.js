const express = require('express');
const MatchesControllers = require('../controllers/MatchesControllers');
const PiecesControllers = require('../controllers/PiecesControllers');

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

router.get('/:id', async (req, res) => {
    try {
        
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;