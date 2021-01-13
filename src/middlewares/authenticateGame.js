const MatchesControllers = require('../controllers/MatchesControllers');
const headersSchemas = require('../schemas/headersSchemas');

async function authenticateGame(req, res, next) {
    const playerColor = req.header('Player-Color');
    const secretKey = req.header('Secret-Key');
    console.log('COLOR', playerColor);
    console.log('SECRETKEY', secretKey);

    const { error } = headersSchemas.schema.validate({playerColor, secretKey});
    if(error) { 
        return res.status(422).send({error: error.details[0].message});
    }

    const authorized = await MatchesControllers.getMatchBySecretKey(secretKey);

    if(!authorized) {
        return res.status(401).send({error: 'not a valid Secret-Key'});
    }

    next();
}

module.exports = authenticateGame;