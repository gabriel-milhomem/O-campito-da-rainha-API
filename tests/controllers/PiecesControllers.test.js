const PiecesControllers = require('../../src/controllers/PiecesControllers');
const Piece = require('../../src/models/Piece');
const allPieces = require('../helpers/piecesObject');
const Moves = require('../helpers/movesTest');
const Boards = require('../helpers/boardsTest');
const Errors = require('../../src/errors');
const Schemas = require('../../src/schemas');

jest.mock('../../src/schemas/moveSchema');
jest.mock('../../src/models/Piece');

describe('function createPieces', () => {
    it('should create all the pieces of chess when initial a game', async () => {
        const expected = allPieces;

        Piece.bulkCreate.mockImplementation(data => data);
        const result = await PiecesControllers.createPieces(0);

        expect(result).toMatchObject(expected);
    });
});

describe('function getPieceById', () => {
    it('should search a piece with correct id and returned the object', async () => {
        const expected = {id: 1, ...allPieces[0]};

        Piece.findByPk.mockResolvedValueOnce(expected);

        const result = await PiecesControllers.getPieceById(1, 'black');
        
        expect(result).toMatchObject(expected);
    });

    it('should throw an not found error ', () => {
        Piece.findByPk.mockResolvedValueOnce(null);
        
        const error = () => PiecesControllers.getPieceById(1, 'black');
        
        expect(error).rejects.toThrow(Errors.NotFoundError);
    });

    it('should throw an forbidden error ', () => {
        Piece.findByPk.mockResolvedValueOnce({id: 1, ...allPieces[0]});
        
        const error = () => PiecesControllers.getPieceById(1, 'white');
        
        expect(error).rejects.toThrow(Errors.ForbbidenError);
    });
});

describe('function validateMovesInput', () => {
    it('should throw a invalid data error', () => {
        Schemas.move.validate.mockReturnValueOnce({
            error: true
        });

        const error = () => PiecesControllers.validateMovesInput('whitePlay', 'secret-key');

        expect(error).toThrow(Errors.InvalidDataError);
    });

    it('should return undefined', () => {
        Schemas.move.validate.mockReturnValueOnce({
            error: false
        });

        const result = PiecesControllers.validateMovesInput('whitePlay', 'secret-key');

        expect(result).toBeUndefined();
    });
});

describe('function getRookMoves', () => {
    it('should return possible rook moves in a clean board', () => {
        const piece = {row: 3, col: 3, color: 'white'};
        const board = [];
        const expected = Moves.rookCleanTable;

        const result = PiecesControllers.getRookMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible rook moves in all restriction ally piece', () => {
        const piece = {row: 3, col: 3, color: 'white'};
        const board = Boards.rookAllyPieces;
        const expected = Moves.rookAllyPieces;

        const result = PiecesControllers.getRookMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible rook moves in all restriction enemy piece', () => {
        const piece = {row: 3, col: 3, color: 'white'};
        const board = Boards.rookEnemyPieces;
        const expected = Moves.rookEnemyPieces;

        const result = PiecesControllers.getRookMoves(piece, board);

        expect(result).toEqual(expected);
    });
});

describe('function getBishopMoves', () => {
    it('should return possible bishop moves in a clean board', () => {
        const piece = {row: 3, col: 3, color: 'white'};
        const board = [];
        const expected = Moves.bishopCleanTable;

        const result = PiecesControllers.getBishopMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible bishop moves in all restriction ally piece', () => {
        const piece = {row: 3, col: 3, color: 'white'};
        const board = Boards.bishopAllyPieces;
        const expected = Moves.bishopAllyPieces;

        const result = PiecesControllers.getBishopMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible bishop moves in all restriction enemy piece', () => {
        const piece = {row: 3, col: 3, color: 'white'};
        const board = Boards.bishopEnemyPieces;
        const expected = Moves.bishopEnemyPieces

        const result = PiecesControllers.getBishopMoves(piece, board);

        expect(result).toEqual(expected);
    });
});

describe('function getQueenMoves', () => {
    it('should return possible queen moves in a clean board', () => {
        const piece = {row: 3, col: 3, color: 'white'};
        const board = [];
        const expected = Moves.queenCleanTable;

        const result = PiecesControllers.getQueenMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible queen moves in all restriction ally piece', () => {
        const piece = {row: 3, col: 3, color: 'white'};
        const board = Boards.queenAllyPieces;
        const expected = Moves.queenAllyPieces;

        const result = PiecesControllers.getQueenMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible queen moves in all restriction enemy piece', () => {
        const piece = {row: 3, col: 3, color: 'white'};
        const board = Boards.queenEnemyPieces;
        const expected = Moves.queenEnemyPieces;

        const result = PiecesControllers.getQueenMoves(piece, board);

        expect(result).toEqual(expected);
    });
});

describe('function getKnightMoves', () => {
    it('should return possible knight moves in the corner', () => {
        const piece = {row: 0, col: 0, color: 'white'};
        const board = [];
        const expected = Moves.knightCorner;

        const result = PiecesControllers.getKnightMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible knight moves in a \'clean table\' and jumps pieces', () => {
        const piece = {row: 3, col: 3, color: 'white'};
        const board = Boards.knightCleanTable;
        const expected = Moves.knightCleanTable;

        const result = PiecesControllers.getKnightMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible knight moves in all restriction ally piece', () => {
        const piece = {row: 3, col: 3, color: 'white'};
        const board = Boards.knightAllyPieces;
        const expected = [];

        const result = PiecesControllers.getKnightMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible knight moves in all restriction enemy piece', () => {
        const piece = {row: 3, col: 3, color: 'white'};
        const board = Boards.knightEnemyPieces;
        const expected = Moves.knightEnemyPieces;

        const result = PiecesControllers.getKnightMoves(piece, board);

        expect(result).toEqual(expected);
    });
});

describe('function getKingMoves', () => {
    it('should return possible king moves in the corner', () => {
        const piece = {row: 0, col: 0, color: 'white'};
        const board = [];
        const expected = Moves.kingCorner;

        const result = PiecesControllers.getKingMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible king moves in a clean table', () => {
        const piece = {row: 3, col: 3, color: 'white'};
        const board = [];
        const expected = Moves.kingCleanTable;

        const result = PiecesControllers.getKingMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible king moves in all restriction ally piece', () => {
        const piece = {row: 3, col: 3, color: 'white'};
        const board = Boards.kingAllyPieces;
        const expected = [];

        const result = PiecesControllers.getKingMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible king moves in all restriction enemy piece', () => {
        const piece = {row: 3, col: 3, color: 'white'};
        const board = Boards.kingEnemyPieces;
        const expected = Moves.kingEnemyPieces;

        const result = PiecesControllers.getKingMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible king moves in all enemy attack (prevent king check)', () => {
        const piece = {row: 3, col: 3, color: 'white'};
        const board = Boards.kingBlackEnemyAttack;
        const expected = Moves.kingEnemyAttack;

        const result = PiecesControllers.getKingMoves(piece, board);

        console.log(result, 'RESULTADO');
        expect(result).toEqual(expected);
    });

    it('should return possible king moves in all enemy attack (prevent king check)', () => {
        const piece = {row: 3, col: 3, color: 'black'};
        const board = Boards.kingWhiteEnemyAttack;
        const expected = Moves.kingEnemyAttack;

        const result = PiecesControllers.getKingMoves(piece, board);

        expect(result).toEqual(expected);
    });
});

describe('function getPawnMoves', () => {
    it('should return possible white pawn moves in the initial spot', () => {
        const piece = {row: 6, col: 0, color: 'white'};
        const board = [];
        const expected = Moves.pawnWhiteInitialSpot;

        const result = PiecesControllers.getPawnMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible black pawn moves in the initial spot', () => {
        const piece = {row: 1, col: 0, color: 'black'};
        const board = [];
        const expected = Moves.pawnBlackInitialSpot;

        const result = PiecesControllers.getPawnMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible white pawn moves in a clean table', () => {
        const piece = {row: 3, col: 3, color: 'white'};
        const board = Boards.pawnWhiteCleanTable;
        const expected = Moves.pawnWhiteCleanTable;

        const result = PiecesControllers.getPawnMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible black pawn moves in a clean table', () => {
        const piece = {row: 3, col: 3, color: 'black'};
        const board = Boards.pawnBlackCleanTable;
        const expected = Moves.pawnBlackCleanTable;

        const result = PiecesControllers.getPawnMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible white pawn moves in block spot enemy piece', () => {
        const piece = {row: 3, col: 3, color: 'white'};
        const board = Boards.pawnWhiteBlockedByEnemy;
        const expected = [];

        const result = PiecesControllers.getPawnMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible black pawn moves in block spot enemy piece', () => {
        const piece = {row: 3, col: 3, color: 'black'};
        const board = Boards.pawnBlackBlockedByEnemy;
        const expected = [];

        const result = PiecesControllers.getPawnMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible white pawn moves in all restriction ally piece', () => {
        const piece = {row: 3, col: 3, color: 'white'};
        const board = Boards.pawnWhiteAllyPieces;
        const expected = [];

        const result = PiecesControllers.getPawnMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible black pawn moves in all restriction ally piece', () => {
        const piece = {row: 3, col: 3, color: 'black'};
        const board = Boards.pawnBlackAllyPieces;
        const expected = [];

        const result = PiecesControllers.getPawnMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible white pawn moves in all restriction enemy piece', () => {
        const piece = {row: 3, col: 3, color: 'white'};
        const board = Boards.pawnWhiteEnemyPieces;
        const expected = Moves.pawnWhiteEnemyPieces;

        const result = PiecesControllers.getPawnMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible black pawn moves in all restriction enemy piece', () => {
        const piece = {row: 3, col: 3, color: 'black'};
        const board = Boards.pawnBlackEnemyPieces;
        const expected = Moves.pawnBlackEnemyPieces;

        const result = PiecesControllers.getPawnMoves(piece, board);

        expect(result).toEqual(expected);
    });
});