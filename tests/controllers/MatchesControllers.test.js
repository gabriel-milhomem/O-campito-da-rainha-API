const MatchesControllers = require('../../src/controllers/MatchesControllers');
const Match = require('../../src/models/Match');
const Errors = require('../../src/errors');

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
        Match.findByPk.mockResolvedValue(null);

        const error = () => MatchesControllers.getMatchById(1);

        expect(error).rejects.toThrow(Errors.NotFoundError);
    });

    it('should throw a forbbiden error ', () => {
        Match.findByPk.mockResolvedValue({status: 'whitePlay'});

        const error = () => MatchesControllers.getMatchById(1, 'blue');

        expect(error).rejects.toThrow(Errors.ForbbidenError);
    });
});

describe('function getMatchBySecretKey', () => {
    it('should throw a unauthorized error ', () => {
        Match.findOne.mockResolvedValue(null);

        const error = () => MatchesControllers.getMatchBySecretKey(1);

        expect(error).rejects.toThrow(Errors.UnauthorizedError);
    });
});