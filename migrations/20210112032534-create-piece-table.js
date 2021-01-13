'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pieces', {
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
      row: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      col: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      matchId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'matches',
            key: 'id'
          }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pieces');
  }
};
