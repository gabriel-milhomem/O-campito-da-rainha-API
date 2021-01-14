const Piece = require('../models/Piece');
const Errors = require('../errors');
const Directions = require('./Directions');

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

    getAllMoves(piece, board) {
        let moves;
        switch(piece.type) {
            case 'rook':
                moves = this.getRookMoves(piece, board);
                break
            case 'bishop':
                moves = this.getBishopMoves(piece, board);
                break
            case 'queen':
                moves = this.getQueenMoves(piece, board);
                break
            case 'knight':
                moves = this.getKnightMoves(piece, board);
                break
            case 'king':
                moves = this.getKingMoves(piece, board);
                break
            case 'pawn':
                moves = this.getPawnMoves(piece, board);
                break
        }

        return moves;
    }

    getKnightMoves(piece, board) {
        let moves;
        const {row: currentRow, col: currentCol, color} = piece;

        moves = Directions.allKnightSpots(currentRow, currentCol);

        moves = moves.filter(move => ( 
            Directions.onTheBoard(move.row, move.col)
        ));

        moves = moves.filter(spot => ( 
            !Directions.verifyColor(board, color, spot.col, spot.row)
        ));

        return moves;
    }

    getKingMoves(piece, board) {
        let moves;
        const {row: currentRow, col: currentCol, color} = piece;

        moves = Directions.allKingSpots(currentRow, currentCol);

        moves = moves.filter(move => ( 
            Directions.onTheBoard(move.row, move.col)
        ));

        moves = moves.filter(spot => ( 
            !Directions.verifyColor(board, color, spot.col, spot.row)
        ));

        return moves;
    }

    getPawnMoves(piece, board) {

    }

    getBishopMoves(piece, board) {
        const moves = [];
        const {row: currentRow, col: currentCol, color} = piece;

        Directions.northeast(currentRow - 1, currentCol + 1, moves, board, color);
        Directions.southeast(currentRow + 1, currentCol + 1, moves, board, color);
        Directions.southwest(currentRow + 1, currentCol - 1, moves, board, color);
        Directions.northwest(currentRow - 1 , currentCol - 1, moves, board, color);

        return moves;
    }

    getQueenMoves(piece, board) {
        const movesRook = this.getRookMoves(piece, board);
        const movesBishop = this.getBishopMoves(piece, board);

        const moves = [...movesRook, ...movesBishop];
        return moves;
    }

    getRookMoves(piece, board) {
        const moves = [];
        const {row: currentRow, col: currentCol, color} = piece;

        Directions.north(currentRow - 1, currentCol, moves, board, color);
        Directions.east(currentRow, currentCol + 1, moves, board, color);
        Directions.south(currentRow + 1, currentCol, moves, board, color);
        Directions.west(currentRow, currentCol - 1, moves, board, color);

        return moves;
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