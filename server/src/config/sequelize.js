const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

// Create the database instance
const sequelize = new Sequelize('financialsystem', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// Read the filenames on the paste models
const filenames = fs.readdirSync(path.join('.', 'src', 'models'));

// Every model should be placed here!
filenames.forEach((model) => {
    require(path.join('..', 'models', model))(sequelize);
});

// Sync the database.
sequelize.sync();

module.exports = sequelize;