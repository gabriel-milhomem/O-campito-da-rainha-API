const Errors = require('../errors');
const PiecesControllers = require('../controllers/PiecesControllers');
const MatchesControllers = require('../controllers/MatchesControllers');

async function authenticatePieces(req, res, next) {
    try {
        const playerColor = req.header('Player-Color');
        const id = Number(req.params.id);

        const piece = await PiecesControllers.getPieceById(id, playerColor);
        const match = await MatchesControllers.getMatchById(piece.matchId, playerColor);

        req.piece = piece;
        req.match = match;

        next();
    } catch (err) {
        if(err instanceof Errors.NotFoundError) {
            return res.status(404).send({ error: 'pieces id parameter is not found'});
        } else if (err instanceof Errors.ForbbidenError) {
            return res.status(403).send({ error: 'playerColor not equal to status match or color piece'});
        } 

        res.sendStatus(500);
    }
}

module.exports = authenticatePieces;