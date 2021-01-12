'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
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
          references: {
            model: 'match',
            key: 'id'
          }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pieces');
  }
};
