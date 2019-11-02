// Creating a new model, that consequently will
// create a table on database with the fields and configs below
module.exports = (sequelize) => {
    const Expense = sequelize.define('Expense', {
        title: {
            type: sequelize.Sequelize.STRING,
            allowNull: false
        },
        value: {
            type: sequelize.Sequelize.DECIMAL(12, 6),
            allowNull: false
        },
        date: {
            type: sequelize.Sequelize.DATE,
            allowNull: false
        }
    }, {
        tableName: 'expense',
        timestamps: true,
        paranoid: false
    });

    return Expense;
};