const uuid = require('uuid');
const Match = require('../models/Match');
const Piece = require('../models/Piece');

class MatchesControllers {
    async createMatch() {
        const secretKey = uuid.v4();
        const status = 'whitePlay';
        
        const match = await Match.create({ secretKey, status });

        return match;
    }

    getMatchById(id) {
        return Match.findByPk(id, {
            include: Piece
        });
    }
}

module.exports = new MatchesControllers();