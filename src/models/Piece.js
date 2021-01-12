const { Sequelize } = require("sequelize");
const sequelize = require('../utils/database');

class Piece extends Sequelize.Model {

}

Piece.init(
{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    rol: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    col: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    matchId: {
        type: Sequelize.STRING,
        allowNull: false,
    }
},   
    {
        sequelize,
        timestamps: false,
        modelName: 'piece'
    }
);

module.exports = Piece;