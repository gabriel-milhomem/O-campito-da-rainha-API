const PiecesControllers = require('../../src/controllers/PiecesControllers');
const Piece = require('../../src/models/Piece');
const allPieces = require('../helpers/piecesObject');
const Moves = require('../helpers/movesTest');
const Boards = require('../helpers/boardsTest');
const Errors = require('../../src/errors');

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

        Piece.findByPk.mockResolvedValue(expected);

        const result = await PiecesControllers.getPieceById(1, 'black');
        
        expect(result).toMatchObject(expected);
    });

    it('should throw an not found error ', () => {
        Piece.findByPk.mockResolvedValue(null);
        
        const error = () => PiecesControllers.getPieceById(1, 'black');
        
        expect(error).rejects.toThrow(Errors.NotFoundError);
    });

    it('should throw an forbidden error ', () => {
        Piece.findByPk.mockResolvedValue({id: 1, ...allPieces[0]});
        
        const error = () => PiecesControllers.getPieceById(1, 'white');
        
        expect(error).rejects.toThrow(Errors.ForbbidenError);
    });
});

describe('function getRookMoves', () => {
    it('should return possible rook moves in a clean board', () => {
        const board = [];
        const piece = {row: 3, col: 3, type: 'rook', color: 'white'};
        const expected = Moves.rookCleanTable;

        const result = PiecesControllers.getAllMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible rook moves in all restriction ally piece', () => {
        const piece = {row: 3, col: 3, type: 'rook', color: 'white'};
        const board = Boards.rookAllyPieces;
        const expected = Moves.rookAllyPieces;

        const result = PiecesControllers.getAllMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible rook moves in all restriction enemy piece', () => {
        const piece = {row: 3, col: 3, type: 'rook', color: 'white'};
        const board = Boards.rookEnemyPieces;
        const expected = Moves.rookEnemyPieces;

        const result = PiecesControllers.getAllMoves(piece, board);

        expect(result).toEqual(expected);
    });
});

describe('function getBishopMoves', () => {
    it('should return possible bishop moves in a clean board', () => {
        const board = [];
        const piece = {row: 3, col: 3, type: 'bishop', color: 'white'};
        const expected = Moves.bishopCleanTable;

        const result = PiecesControllers.getAllMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible bishop moves in all restriction ally piece', () => {
        const piece = {row: 3, col: 3, type: 'bishop', color: 'white'};
        const board = Boards.bishopAllyPieces;
        const expected = Moves.bishopAllyPieces;

        const result = PiecesControllers.getAllMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible bishop moves in all restriction enemy piece', () => {
        const piece = {row: 3, col: 3, type: 'bishop', color: 'white'};
        const board = Boards.bishopEnemyPieces;
        const expected = Moves.bishopEnemyPieces

        const result = PiecesControllers.getAllMoves(piece, board);

        expect(result).toEqual(expected);
    });
});

describe('function getQueenMoves', () => {
    it('should return possible queen moves in a clean board', () => {
        const board = [];
        const piece = {row: 3, col: 3, type: 'queen', color: 'white'};
        const expected = Moves.queenCleanTable;

        const result = PiecesControllers.getAllMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible queen moves in all restriction ally piece', () => {
        const piece = {row: 3, col: 3, type: 'queen', color: 'white'};
        const board = Boards.queenAllyPieces;
        const expected = Moves.queenAllyPieces;

        const result = PiecesControllers.getAllMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible queen moves in all restriction enemy piece', () => {
        const piece = {row: 3, col: 3, type: 'queen', color: 'white'};
        const board = Boards.queenEnemyPieces;
        const expected = Moves.queenEnemyPieces;

        const result = PiecesControllers.getAllMoves(piece, board);

        expect(result).toEqual(expected);
    });
});

describe('function getKnightMoves', () => {
    it('should return possible knight moves in the corner', () => {
        const board = [];
        const piece = {row: 0, col: 0, type: 'knight', color: 'white'};
        const expected = Moves.knightCorner;

        const result = PiecesControllers.getAllMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible knight moves in a \'clean table\' and jumps pieces', () => {
        const piece = {row: 3, col: 3, type: 'knight', color: 'white'};
        const board = Boards.knightCleanTable;
        const expected = Moves.knightCleanTable;

        const result = PiecesControllers.getAllMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible knight moves in all restriction ally piece', () => {
        const piece = {row: 3, col: 3, type: 'knight', color: 'white'};
        const board = Boards.knightAllyPieces;
        const expected = [];

        const result = PiecesControllers.getAllMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible knight moves in all restriction enemy piece', () => {
        const piece = {row: 3, col: 3, type: 'knight', color: 'white'};
        const board = Boards.knightEnemyPieces;
        const expected = Moves.knightEnemyPieces;

        const result = PiecesControllers.getAllMoves(piece, board);

        expect(result).toEqual(expected);
    });
});

describe('function getKingMoves', () => {
    it('should return possible king moves in the corner', () => {
        const board = [];
        const piece = {row: 0, col: 0, type: 'king', color: 'white'};
        const expected = Moves.kingCorner;

        const result = PiecesControllers.getAllMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible king moves in a clean table', () => {
        const piece = {row: 3, col: 3, type: 'king', color: 'white'};
        const board = [];
        const expected = Moves.kingCleanTable;

        const result = PiecesControllers.getAllMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible king moves in all restriction ally piece', () => {
        const piece = {row: 3, col: 3, type: 'king', color: 'white'};
        const board = Boards.kingAllyPieces;
        const expected = [];

        const result = PiecesControllers.getAllMoves(piece, board);

        expect(result).toEqual(expected);
    });

    it('should return possible king moves in all restriction enemy piece', () => {
        const piece = {row: 3, col: 3, type: 'king', color: 'white'};
        const board = Boards.kingEnemyPieces;
        const expected = Moves.kingEnemyPieces;

        const result = PiecesControllers.getAllMoves(piece, board);

        expect(result).toEqual(expected);
    });
});