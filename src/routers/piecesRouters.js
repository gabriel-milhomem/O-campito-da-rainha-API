const express = require('express');
const authenticateMatch = require('../middlewares/authenticateMatch');
const authenticatePieces = require('../middlewares/authenticatePieces');
const Errors = require('../errors');
const Schemas = require('../schemas');
const PiecesControllers = require('../controllers/PiecesControllers');

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
        
        res.sendStatus(200);
    } catch (err) {
        if(err instanceof Errors.InvalidDataError) {
            return res.status(422).send({error: 'Body input is in incorrect format'});
        }
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;