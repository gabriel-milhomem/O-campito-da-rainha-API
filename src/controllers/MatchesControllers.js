const uuid = require('uuid');
const Errors = require('../errors');
const Match = require('../models/Match');
const Piece = require('../models/Piece');

class MatchesControllers {
    async createMatch() {
        const secretKey = uuid.v4();
        const status = 'whitePlay';
        
        const match = await Match.create({ secretKey, status });
        return match;
    }

    async getMatchById(id) {
        const match = await Match.findByPk(id, {
            include: Piece,
        });
        if(!match) throw new Errors.NotFoundError();

        return match;
    }

    getMatchBySecretKey(secretKey) {
        return Match.findOne({ 
            where: {secretKey},
            include: Piece
        });
    }
}

module.exports = new MatchesControllers();