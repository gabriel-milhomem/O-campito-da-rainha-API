const Piece = require('../models/Piece');
const Errors = require('../errors');
const Directions = require('./Directions');
const Schemas = require('../schemas');

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

    async postMove(piece, match, request) {
        const {row, col} = request;
        const moves = this.getAllMoves(piece, match.pieces);
        const isPossibleMove = moves.find(move => (
            move.row === row && move.col === col)
        );
        
        if(!isPossibleMove) throw new Errors.ForbbidenError();
        
        const notEnemy = Directions.verifyColor(match.pieces, piece.color, row, col);
        if(notEnemy === false) {
            await Piece.destroy({where: {matchId: piece.matchId, row, col}});
        }

        match.status = (match.status === 'whitePlay') ? 'blackPlay': 'whitePlay';
        piece.row = row;
        piece.col = col;

        await piece.save();
        await match.save();
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
            !Directions.verifyColor(board, color, spot.row, spot.col)
        ));

        return moves;
    }

    validateMovesInput(row, col) {
        const { error } = Schemas.move.validate({row, col});

        if(error) throw new Errors.InvalidDataError();
    }

    getKingMoves(piece, board) {
        let moves;
        const {row: currentRow, col: currentCol, color} = piece;

        moves = Directions.allKingSpots(currentRow, currentCol);

        moves = moves.filter(move => ( 
            Directions.onTheBoard(move.row, move.col)
        ));

        moves = moves.filter(spot => ( 
            !Directions.verifyColor(board, color, spot.row, spot.col)
        ));

        return moves;
    }

    getPawnMoves(piece, board) {
        let moves;
        const {row: currentRow, col: currentCol, color} = piece;

        moves = Directions.allPawnSpots(currentRow, currentCol, color);

        moves = moves.filter(spot => {
            const state = Directions.verifyColor(board, color, spot.row, spot.col);

            const moveMiddle = (state === null && spot.pos === 'middle');
            const killEnemy = (state === false && (spot.pos === 'left' || spot.pos === 'right'));
            return moveMiddle || killEnemy;
        });

        moves = moves.map(spot => ({row: spot.row, col: spot.col}));

        return moves;
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