const bcrypt = require('bcryptjs');
// const Consumer = require('../models/consumer');
const { Consumer } = require('../models');


// Consumer signup
exports.consumerSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const consumer = await Consumer.create({
            name,
            email,
            password,
        });
        res.status(201).json(consumer);
    } catch (error) {
        console.error("Error creating consumer:", error);
        res.status(500).json({error: error.message});
    }
};

// Consumer login
exports.consumerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const consumer = await Consumer.findOne({ where: { email } });
        if (consumer && bcrypt.compareSync(password, consumer.password)) {
            req.session.consumerId = consumer.id;
            res.status(200).json(consumer);
        }

    } catch (error) {
        console.error("Error logging in consumer:", error);
        res.status(500).json({error: error.message});
    }
};

// Consumer logout
exports.consumerLogout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({error: "Error logging out"});
        }
        res.status(200).json({message: "Logged out successfully"});
    });
};