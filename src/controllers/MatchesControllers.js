const uuid = require('uuid');
const Errors = require('../errors');
const Match = require('../models/Match');
const Piece = require('../models/Piece');
const Schemas = require('../schemas');

class MatchesControllers {
    async createMatch() {
        const secretKey = uuid.v4();
        const status = 'whitePlay';
        
        const match = await Match.create({ secretKey, status });
        return match;
    }

    async getMatchById(id, playerColor= null) {
        const match = await Match.findByPk(id, {
            include: Piece,
        });
        if(!match) throw new Errors.NotFoundError();

        if(playerColor && !match.status.includes(playerColor)) {
            throw new Errors.ForbbidenError();
        }

        return match;
    }

    async getMatchBySecretKey(secretKey) {
        const match = await Match.findOne({ 
            where: {secretKey},
            include: Piece
        });
        if(!match) throw new Errors.UnauthorizedError();

        return match;
    }

    validateHeaders(playerColor, secretKey) {
        const { error } = Schemas.headers.validate({playerColor, secretKey});

        if(error) throw new Errors.InvalidDataError();
    }
}

module.exports = new MatchesControllers();