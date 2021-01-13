const MatchesControllers = require('../controllers/MatchesControllers');
const Schemas = require('../schemas');
const Errors = require('../errors');

async function authenticateMatch(req, res, next) {
    try {
        const playerColor = req.header('Player-Color');
        const secretKey = req.header('Secret-Key');
    
        const { error } = Schemas.headers.validate({playerColor, secretKey});
        if(error) { 
            return res.status(422).send({error: error.details[0].message});
        }
    
        await MatchesControllers.getMatchBySecretKey(secretKey);

        next();
    } catch(err) {
        console.error(err);
        if(err instanceof Errors.UnauthorizedError) {
            return res.status(401).send({error: 'Secret-Key is not registered'});
        }

        res.sendStatus(500);
    }
}

module.exports = authenticateMatch;