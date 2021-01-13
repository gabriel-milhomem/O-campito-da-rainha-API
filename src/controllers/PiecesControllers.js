const Piece = require('../models/Piece');
const Errors = require('../errors');

class PiecesControllers {
    async createPieces(matchId) {
        let pieces = [];
        const piecesInRow = ['rook', 'knight', 'bishop', 'king', 'queen', 'bishop', 'knight', 'rook'];
        const rows = [0, 1, 6, 7];

        for(let i = 0; i < 4; i++) {
            let color = i <= 1 ? 'black': 'white';
            for(let col = 0; col < 8; col++) {
                if (i === 1 || i === 2) {
                    pieces.push({type: 'pawn', color, row: rows[i], col, matchId});
                } else {
                    pieces.push({type: piecesInRow[col], color, row: rows[i], col, matchId});
                }
            }
        }
        const allPieces = await Piece.bulkCreate(pieces);
        return allPieces;
    }

    async getPieceById(id) {
        const piece = await Piece.findByPk(id);
        if(!piece) throw new Errors.NotFoundError();

        return piece;
    }
}

module.exports = new PiecesControllers();