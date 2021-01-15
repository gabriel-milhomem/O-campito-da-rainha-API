const express = require('express');
const authenticateMatch = require('../middlewares/authenticateMatch');
const authenticatePieces = require('../middlewares/authenticatePieces');
const Errors = require('../errors');
const PiecesControllers = require('../controllers/PiecesControllers');
const MatchesControllers = require('../controllers/MatchesControllers');

const router = express.Router();

router.get('/:id/moves', authenticateMatch, authenticatePieces, (req, res) => {
    try {
        const allMoves = PiecesControllers.getAllMoves(req.piece, req.match.pieces);
        res.status(200).send(allMoves);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});


router.post('/:id/moves', authenticateMatch, authenticatePieces, async (req, res) => {
    try {
        const { row, col } = req.body;
        PiecesControllers.validateMovesInput(row, col);

        await PiecesControllers.postMove(req.piece, req.match, req.body);

        const allMatchData = await MatchesControllers.getMatchById(req.match.id);
        res.status(201).send(allMatchData);
    } catch (err) {
        console.error(err);
        if(err instanceof Errors.InvalidDataError) {
            res.status(422).send({error: 'Body input is in incorrect format'});
        } else if (err instanceof Errors.ForbbidenError) {
            res.status(403).send({erro: 'this movement request is not allowed'});
        } else {
            res.sendStatus(500);
        }
    }
});

module.exports = router;