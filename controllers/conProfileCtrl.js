const { Consumer } = require('../models');
const bcrypt = require('bcryptjs');

// view consuumer profile
exports.viewConProfile = async (req, res) => {
    try {
        const consumerId = req.params.id;
        const consumer = await Consumer.findByPk(consumerId);
        if (!consumer) {
            return res.status(404).json({error: "Consumer not found"});
        }
        res.status(200).json(consumer);
    } catch (error) {
        console.error("Error fetching consumer profile:", error);
        res.status(500).json({error: error.message});
    }
};

// update consumer profile
exports.updateConProfile = async (req, res) => {
    console.log("Received request to update consumer profile:", req.session.consumerId);
    if (!req.session.consumerId) {
        return res.status(401).json({error: "Unauthorized"});
    }

    try {
        const { name, email, password, state, country } = req.body;
        const consumer = await Consumer.findByPk(req.session.consumerId);
        if (!consumer) {
            return res.status(404).json({error: "Consumer not found"});
        }
        consumer.name = name;
        consumer.email = email;
        consumer.password = bcrypt.hashSync(req.body.password, 10);
        consumer.state = state;
        consumer.country = country;
        await consumer.save();
        req.session.Consumer = { ...req.session.Consumer, name, email, password, state, country };
        res.status(200).json(consumer);
    } catch (error) {
        console.error("Error updating consumer profile:", error);
        res.status(500).json({error: error.message});
    }
};