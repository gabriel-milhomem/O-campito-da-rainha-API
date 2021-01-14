const Piece = require('../models/Piece');
const Errors = require('../errors');

class PiecesControllers {
    async createPieces(matchId) {
        const pieces = [];
        const piecesInRow = ['rook', 'knight', 'bishop', 'king', 'queen', 'bishop', 'knight', 'rook'];
        const rows = [0, 1, 6, 7];

        rows.forEach((row, i) => {
            let color = i <= 1 ? 'black': 'white';
            piecesInRow.forEach((piece, col) => {
                if (i === 1 || i === 2) {
                    pieces.push({type: 'pawn', color, row, col, matchId});
                } else {
                    pieces.push({type: piece, color, row, col, matchId});
                }
            });
        });

        const allPieces = await Piece.bulkCreate(pieces);
        return allPieces;
    }

    async getPieceById(id, playerColor) {
        const piece = await Piece.findByPk(id);
        if(!piece) throw new Errors.NotFoundError();

        if(piece.color !== playerColor) {
            throw new Errors.ForbbidenError();
        }
        
        return piece;
    }
}

module.exports = new PiecesControllers();