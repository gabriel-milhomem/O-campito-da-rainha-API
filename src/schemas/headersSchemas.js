const Joi = require('joi');

const headers = Joi.object({
    playerColor: Joi.string().valid('black', 'white').required(),
    secretKey: Joi.string().guid({version: 'uuidv4'}).required()
});

module.exports = headers;
