const PiecesControllers = require('../../src/controllers/PiecesControllers');
const Piece = require('../../src/models/Piece');
const allPieces = require('../helpers/piecesObject');
const Errors = require('../../src/errors');

jest.mock('../../src/models/Piece');

/*describe('function createPieces', () => {
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
});*/

/*describe('function getRookMoves', () => {
    it('should return possible rook moves in a clean board', () => {
        const expected = [
            {row: 2, col:3},
            {row: 1, col:3},
            {row: 0, col:3},
            {row: 3, col:4},
            {row: 3, col:5},
            {row: 3, col:6},
            {row: 3, col:7},
            {row: 4, col:3},
            {row: 5, col:3},
            {row: 6, col:3},
            {row: 7, col:3},
            {row: 3, col:2},
            {row: 3, col:1},
            {row: 3, col:0},
        ]

        const result = PiecesControllers.getRookMoves({row: 3, col: 3}, {});

        expect(result).toEqual(expected);
    });
});*/

/*describe('function getBishopMoves', () => {
    it('should return possible bishop moves in a clean board', () => {
        const expected = [
            {row: 2, col:4},
            {row: 1, col:5},
            {row: 0, col:6},
            {row: 4, col:4},
            {row: 5, col:5},
            {row: 6, col:6},
            {row: 7, col:7},
            {row: 4, col:2},
            {row: 5, col:1},
            {row: 6, col:0},
            {row: 2, col:2},
            {row: 1, col:1},
            {row: 0, col:0},
        ]

        const result = PiecesControllers.getBishopMoves({row: 3, col: 3}, {});

        console.log(result, 'result');
        expect(result).toEqual(expected);
    });
});*/

describe('function getQueenMoves', () => {
    it('should return possible queen moves in a clean board', () => {
        const expected = [
            {row: 2, col:3},
            {row: 1, col:3},
            {row: 0, col:3},
            {row: 3, col:4},
            {row: 3, col:5},
            {row: 3, col:6},
            {row: 3, col:7},
            {row: 4, col:3},
            {row: 5, col:3},
            {row: 6, col:3},
            {row: 7, col:3},
            {row: 3, col:2},
            {row: 3, col:1},
            {row: 3, col:0},
            {row: 2, col:4},
            {row: 1, col:5},
            {row: 0, col:6},
            {row: 4, col:4},
            {row: 5, col:5},
            {row: 6, col:6},
            {row: 7, col:7},
            {row: 4, col:2},
            {row: 5, col:1},
            {row: 6, col:0},
            {row: 2, col:2},
            {row: 1, col:1},
            {row: 0, col:0},
        ]

        const result = PiecesControllers.getQueenMoves({row: 3, col: 3}, {});

        console.log(result);
        expect(result).toEqual(expected);
    });
});