const { Sequelize } = require("sequelize");
const sequelize = require('../utils/database');
const Piece = require('./Piece');

class Match extends Sequelize.Model {

}

Match.init(
{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    secretKey: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
    }
},   
    {
        sequelize,
        timestamps: false,
        modelName: 'match'
    }
);

Match.hasMany(Piece);

module.exports = Match;