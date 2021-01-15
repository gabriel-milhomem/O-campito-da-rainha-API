const MatchesControllers = require('../controllers/MatchesControllers');
const Errors = require('../errors');

async function authenticateMatch(req, res, next) {
    try {
        const playerColor = req.header('Player-Color');
        const secretKey = req.header('Secret-Key');
    
        MatchesControllers.validateHeaders(playerColor, secretKey);
    
        await MatchesControllers.getMatchBySecretKey(secretKey);

        next();
    } catch(err) {
        console.error(err);
        if(err instanceof Errors.UnauthorizedError) {
            return res.status(401).send({error: 'Secret-Key is not registered'});
        } else if(err instanceof Errors.InvalidDataError) {
            return res.status(422).send({error: 'Body input is in incorrect format'});
        } else {
            throw err;
        }
    }
}

module.exports = authenticateMatch;