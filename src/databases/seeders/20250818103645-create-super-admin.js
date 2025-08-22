'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    const hashedPassword = await bcrypt.hash("Admin@123",10);
    await queryInterface.bulkInsert("users",[
      {
      name: "Super Admin",
      email: "admin@eduhub.com",
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users',{email:"admin@eduhub.com"},{});
  }
};
