const Joi = require('joi');

const schema = Joi.object({
    playerColor: Joi.string().valid('black', 'white').required(),
    secretKey: Joi.string().guid({version: 'uuidv4'}).required()
});

module.exports = {
    schema
};