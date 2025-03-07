const { Consumer } = require('../models');

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
    try {
        const consumerId = req.params.id;
        const { name, email, password, state, country } = req.body;
        const consumer = await Consumer.findByPk(consumerId);
        if (!consumer) {
            return res.status(404).json({error: "Consumer not found"});
        }
        consumer.name = name;
        consumer.email = email;
        consumer.password = password;
        consumer.state = state;
        consumer.country = country;
        await consumer.save();
        res.status(200).json(consumer);
    } catch (error) {
        console.error("Error updating consumer profile:", error);
        res.status(500).json({error: error.message});
    }
};