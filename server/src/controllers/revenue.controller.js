const database = require('../config/sequelize');

exports.getRevenues = async (req, res) => {
    try {
        const revenues = await database.models.Revenue.findAll();
        return res.status(200).send(revenues);
    } catch (error) {
        console.error('ERROR', error);
        return res.sendStatus(500);
    }
};

exports.getRevenue = async (req, res) => {
    try {
        if (!req.params.hasOwnProperty('id')) {
            return res.sendStatus(400);
        }

        const revenue = await database.models.Revenue.findByPk(req.params.id);
        return res.status(200).send(revenue);
    } catch (error) {
        console.error('ERROR', error);
        return res.sendStatus(500);
    }
};

exports.save = async (req, res) => {
    try {
        await database.models.Revenue.upsert(req.body);
        return res.sendStatus(200);
    } catch (error) {
        console.error('ERROR', error);
        return res.sendStatus(500);
    }
};

exports.delete = async (req, res) => {
    try {
        if (!req.params.hasOwnProperty('id')) {
            return res.sendStatus(400);
        }

        const rowsDeleted = await database.models.Revenue.destroy({
            where: {
                id: req.params.id
            }
        });

        if (rowsDeleted > 0) {
            return res.sendStatus(200);
        }

        return res.sendStatus(500);
    } catch (error) {
        console.error('ERROR', error);
        return res.sendStatus(500);
    }
};