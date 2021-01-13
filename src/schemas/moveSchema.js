const Joi = require('joi');

const move = Joi.object({
    row: Joi.number().integer().min(0).max(7).required(),
    col: Joi.number().integer().min(0).max(7).required()
});

module.exports = move;