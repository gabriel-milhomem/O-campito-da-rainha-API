const MatchesControllers = require('../../src/controllers/MatchesControllers');
const Match = require('../../src/models/Match');
const Schemas = require('../../src/schemas');
const Errors = require('../../src/errors');

jest.mock('../../src/schemas/headersSchemas');
jest.mock('../../src/models/Match');
jest.mock('uuid', () => {
    return {
        v4: () => 'secret-key'
    }
});

describe('function createMatch', () => {
    it('should create a match object with primary infos', async () => {
        const expected = { secretKey: 'secret-key', status: 'whitePlay' };

        Match.create.mockImplementation(data => data);

        const result = await MatchesControllers.createMatch();

        expect(result).toMatchObject(expected);
    });
});

describe('function getMatchById', () => {
    it('should throw a not found error', () => {
        Match.findByPk.mockResolvedValueOnce(null);

        const error = () => MatchesControllers.getMatchById(1);

        expect(error).rejects.toThrow(Errors.NotFoundError);
    });

    it('should throw a forbbiden error ', () => {
        Match.findByPk.mockResolvedValueOnce({status: 'whitePlay'});

        const error = () => MatchesControllers.getMatchById(1, 'blue');

        expect(error).rejects.toThrow(Errors.ForbbidenError);
    });
});

describe('function getMatchBySecretKey', () => {
    it('should throw a unauthorized error ', () => {
        Match.findOne.mockResolvedValueOnce(null);

        const error = () => MatchesControllers.getMatchBySecretKey(1);

        expect(error).rejects.toThrow(Errors.UnauthorizedError);
    });
});

describe('function validateHeaders', () => {
    it('should throw a invalid data error', () => {
        Schemas.headers.validate.mockReturnValueOnce({
            error: true
        });

        const error = () => MatchesControllers.validateHeaders('whitePlay', 'secret-key');

        expect(error).toThrow(Errors.InvalidDataError);
    });

    it('should return undefined', () => {
        Schemas.headers.validate.mockReturnValueOnce({
            error: false
        });

        const result = MatchesControllers.validateHeaders('whitePlay', 'secret-key');

        expect(result).toBeUndefined();
    });
});