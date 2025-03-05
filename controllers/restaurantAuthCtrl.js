//const Restaurant = require('../models/restaurant');
const bcrypt = require('bcryptjs');
const { Restaurant } = require('../models');  

// Restaurant signup
exports.restaurantSignup = async (req, res) => {
    try {
        const { name, email, password, location } = req.body;
        const restaurant = await Restaurant.create({
            name,
            email,
            password,
            location
        });
        res.status(201).json(restaurant);
    } catch (error) {
        console.error("Error creating restaurant:", error);
        res.status(500).json({error: error.message});
    }
};

// Restaurant login
exports.restaurantLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const restaurant = await Restaurant.findOne({ where: { email } });
        if (restaurant && bcrypt.compareSync(password, restaurant.password)) {
            req.session.restaurant = restaurant;
            res.status(200).json(restaurant);
        }
    } catch (error) {
        console.error("Error logging in restaurant:", error);
        res.status(500).json({error: error.message});
    }
};

// Restaurant logout
exports.restaurantLogout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({error: "Error logging out"});
        }
        res.status(200).json({message: "Logged out successfully"});
    });
};