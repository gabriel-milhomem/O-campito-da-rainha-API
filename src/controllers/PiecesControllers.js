const Piece = require('../models/Piece');
const Errors = require('../errors');
const Directions = require('../utils/Directions');

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

    getAllMoves(piece, match) {
        let moves;
        switch(piece.type) {
            case 'rook':
                moves = this.getRookMoves(piece, match.pieces);
                break
            case 'bishop':
                //moves = this.getBishopMoves(piece, match);
                break
            case 'queen':
                //moves = this.getQueenMoves(piece, match);
                break
            case 'knight':
                //moves = this.getKnightMoves(piece, match);
                break
            case 'king':
                //moves = this.getKingMoves(piece, match);
                break
            case 'pawn':
                //moves = this.getPawnMoves(piece, match);
                break
        }

        return moves;
    }



    getRookMoves(piece, board) {
        const possibleMoves = [];
        const {row: actualRow, col: actualCol} = piece;
        Directions.north(actualRow - 1, actualCol, possibleMoves, board);
        Directions.east(actualRow, actualCol + 1, possibleMoves, board);
        Directions.south(actualRow + 1, actualCol, possibleMoves, board);
        Directions.west(actualRow, actualCol - 1, possibleMoves, board);
        return possibleMoves;
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